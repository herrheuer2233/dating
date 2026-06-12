<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Methode nicht erlaubt.']);
    exit;
}

// Replace this address with the mailbox that should receive website enquiries.
$recipient = 'YOUR_EMAIL@example.com';
// Use an address on the domain where this website is hosted.
$sender = 'no-reply@YOUR_DOMAIN.de';

function clean_text(string $value): string
{
    return trim(strip_tags($value));
}

function post_value(string $key): string
{
    return isset($_POST[$key]) ? clean_text((string) $_POST[$key]) : '';
}

$formType = post_value('form_type');
$name = post_value('name');
$email = filter_var(post_value('email'), FILTER_VALIDATE_EMAIL);

if ($name === '' || $email === false) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Bitte prüfe deinen Namen und deine E-Mail-Adresse.']);
    exit;
}

$subject = $formType === 'Profilanfrage'
    ? 'Neue Profilanfrage bei Herzensbund'
    : 'Neue Kontaktanfrage bei Herzensbund';

$fields = [
    'Art der Anfrage' => $formType,
    'Name' => $name,
    'E-Mail' => $email,
    'Alter' => post_value('age'),
    'Telefon' => post_value('phone'),
    'Adresse' => post_value('address'),
    'Gewähltes Profil' => post_value('candidate'),
    'Betreff' => post_value('subject'),
    'Nachricht' => post_value('message'),
];

$messageLines = ["Eine neue Anfrage wurde über die Herzensbund-Webseite gesendet.", ""];
foreach ($fields as $label => $value) {
    if ($value !== '') {
        $messageLines[] = $label . ': ' . $value;
    }
}

$messageLines[] = '';
$messageLines[] = 'Gesendet am: ' . date('d.m.Y H:i');
$message = implode(PHP_EOL, $messageLines);

$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', (string) $email);
$headers = [
    'From: Herzensbund Webseite <' . $sender . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
];

if ($recipient === 'YOUR_EMAIL@example.com') {
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'message' => 'Die Empfänger-E-Mail muss zuerst in send-mail.php eingetragen werden.'
    ]);
    exit;
}

$sent = mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Die Nachricht konnte nicht versendet werden. Bitte kontaktiere uns telefonisch.'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Vielen Dank! Wir melden uns in Kürze bei dir.'
]);
