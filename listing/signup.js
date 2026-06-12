const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = registrationForm.querySelector("button[type='submit']");
  const status = registrationForm.querySelector(".signup-status");
  const originalText = button.innerHTML;
  status.className = "signup-status";
  status.textContent = "";
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Wird gesendet...';

  try {
    const response = await fetch("send-mail.php", {
      method: "POST",
      body: new FormData(registrationForm),
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Die Registrierung konnte nicht gesendet werden.");
    }

    registrationForm.reset();
    status.className = "signup-status success";
    status.textContent = "Vielen Dank! Deine Registrierung wurde erfolgreich gesendet.";
  } catch (error) {
    status.className = "signup-status error";
    status.textContent = error.message || "Bitte versuche es später erneut.";
  } finally {
    button.disabled = false;
    button.innerHTML = originalText;
  }
});
