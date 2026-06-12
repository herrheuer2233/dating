<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request."
    ]);
    exit;
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';

if (empty($email)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email is required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

$to = "Herr.heuer2233@gmail.com";
$subject = "New Email Submission";
$message = "
You received a new email submission.

Email: " . $email . "

Submitted on: " . date("d M Y, h:i A") . "
";

$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode([
        "status" => "success",
        "message" => "Thank you! Your email has been submitted successfully."
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Email could not be sent. Please try again later."
    ]);
}
?>