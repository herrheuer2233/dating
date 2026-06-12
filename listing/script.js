const candidateGrid = document.getElementById("candidateGrid");
if (candidateGrid) {
  candidateGrid.querySelectorAll(".candidate-card").forEach((card, index) => {
    const profileNumber = index + 1;
    const detailsUrl = `profile-details.html?profile=${profileNumber}`;
    const button = card.querySelector(".candidate-chat-btn");

    card.dataset.detailsUrl = detailsUrl;
    if (button) {
      const detailsLink = document.createElement("a");
      detailsLink.className = button.className;
      detailsLink.href = detailsUrl;
      detailsLink.innerHTML = '<i class="fa-regular fa-address-card"></i> Details ansehen';
      detailsLink.setAttribute("aria-label", "Profildetails ansehen");
      button.replaceWith(detailsLink);
    }
  });

  candidateGrid.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const card = event.target.closest(".candidate-card");
    if (card) window.location.href = card.dataset.detailsUrl;
  });

  candidateGrid.addEventListener("keydown", (event) => {
    const card = event.target.closest(".candidate-card");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      window.location.href = card.dataset.detailsUrl;
    }
  });
}

async function submitForm(form) {
  const button = form.querySelector("button[type='submit']");
  const status = form.querySelector(".form-status");
  const originalButtonText = button.innerHTML;
  status.className = "form-status";
  status.textContent = "";
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Wird gesendet...';

  try {
    const response = await fetch("send-mail.php", {
      method: "POST",
      body: new FormData(form),
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || "Senden fehlgeschlagen.");

    form.reset();
    status.className = "form-status success";
    status.textContent = result.message;
    document.querySelector("#successToast .toast-body span").textContent = result.message;
    bootstrap.Toast.getOrCreateInstance(document.getElementById("successToast")).show();
  } catch (error) {
    status.className = "form-status error";
    status.textContent = error.message || "Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.";
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonText;
  }
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm(event.currentTarget);
});

function updateNavbarBackground() {
  document.getElementById("mainNav").classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbarBackground, { passive: true });
updateNavbarBackground();

document.querySelectorAll(".navbar .nav-link, .navbar .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navbarMenu");
    bootstrap.Collapse.getInstance(menu)?.hide();
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
