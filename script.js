const candidates = [
  { name: "Sophie", age: 31, city: "Hamburg", region: "Norddeutschland", image: 32, tags: ["Reisen", "Kultur"] },
  { name: "Laura", age: 29, city: "München", region: "Süddeutschland", image: 45, tags: ["Berge", "Kochen"] },
  { name: "Anna", age: 34, city: "Berlin", region: "Ostdeutschland", image: 47, tags: ["Kunst", "Konzerte"] },
  { name: "Julia", age: 32, city: "Köln", region: "Westdeutschland", image: 49, tags: ["Fitness", "Genuss"] },
  { name: "Katharina", age: 36, city: "Stuttgart", region: "Süddeutschland", image: 52, tags: ["Natur", "Lesen"] },
  { name: "Marie", age: 28, city: "Düsseldorf", region: "Westdeutschland", image: 55, tags: ["Mode", "Reisen"] },
  { name: "Leonie", age: 30, city: "Leipzig", region: "Ostdeutschland", image: 57, tags: ["Tanzen", "Fotografie"] },
  { name: "Nina", age: 35, city: "Bremen", region: "Norddeutschland", image: 59, tags: ["Meer", "Yoga"] },
  { name: "Johanna", age: 33, city: "Frankfurt", region: "Westdeutschland", image: 61, tags: ["Theater", "Kulinarik"] },
  { name: "Amelie", age: 27, city: "Dresden", region: "Ostdeutschland", image: 63, tags: ["Musik", "Wandern"] },
  { name: "Charlotte", age: 38, city: "Hannover", region: "Norddeutschland", image: 64, tags: ["Garten", "Reisen"] },
  { name: "Lena", age: 31, city: "Nürnberg", region: "Süddeutschland", image: 66, tags: ["Sport", "Freunde"] },
  { name: "Isabell", age: 37, city: "Essen", region: "Westdeutschland", image: 69, tags: ["Kunst", "Kochen"] },
  { name: "Miriam", age: 40, city: "Lübeck", region: "Norddeutschland", image: 70, tags: ["Segeln", "Literatur"] },
  { name: "Clara", age: 29, city: "Freiburg", region: "Süddeutschland", image: 72, tags: ["Natur", "Radfahren"] },
  { name: "Sarah", age: 34, city: "Potsdam", region: "Ostdeutschland", image: 74, tags: ["Reisen", "Design"] },
  { name: "Elena", age: 36, city: "Bonn", region: "Westdeutschland", image: 76, tags: ["Musik", "Genuss"] },
  { name: "Franziska", age: 32, city: "Kiel", region: "Norddeutschland", image: 79, tags: ["Meer", "Konzerte"] },
  { name: "Viktoria", age: 39, city: "Augsburg", region: "Süddeutschland", image: 81, tags: ["Kultur", "Wandern"] },
  { name: "Theresa", age: 30, city: "Erfurt", region: "Ostdeutschland", image: 83, tags: ["Cafés", "Fotografie"] }
];

const candidateGrid = document.getElementById("candidateGrid");
const signupModalElement = document.getElementById("signupModal");
const signupModal = new bootstrap.Modal(signupModalElement);

function renderCandidates(filter = "all") {
  const visibleCandidates = filter === "all"
    ? candidates
    : candidates.filter((candidate) => candidate.region === filter);

  candidateGrid.innerHTML = visibleCandidates.map((candidate) => `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="candidate-card" tabindex="0" role="button" data-name="${candidate.name}" aria-label="${candidate.name}, ${candidate.age}, aus ${candidate.city} kennenlernen">
        <div class="candidate-image">
          <img src="https://randomuser.me/api/portraits/women/${candidate.image}.jpg" alt="Profilbild von ${candidate.name}" loading="lazy">
          <span class="online-badge">Kürzlich aktiv</span>
        </div>
        <div class="candidate-body">
          <div class="candidate-top">
            <h3>${candidate.name}, ${candidate.age}</h3>
            <i class="fa-solid fa-circle-check verified" title="Profil geprüft"></i>
          </div>
          <p class="candidate-location"><i class="fa-solid fa-location-dot"></i>${candidate.city}, Deutschland</p>
          <div class="candidate-tags">${candidate.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          <button class="candidate-chat-btn" type="button" aria-label="Jetzt mit ${candidate.name} chatten">
            <i class="fa-regular fa-comment-dots"></i> Jetzt chatten
          </button>
        </div>
      </article>
    </div>
  `).join("");
}

function openCandidateForm(card) {
  const heading = card.querySelector(".candidate-top h3");
  const location = card.querySelector(".candidate-location");
  const image = card.querySelector(".candidate-image img");
  if (!heading || !location || !image) return;

  const profileTitle = heading.textContent.trim();
  const profileLocation = location.textContent.trim();
  const candidateName = profileTitle.split(",")[0].trim();

  document.getElementById("selectedCandidate").value = `${profileTitle}, ${profileLocation}`;
  document.getElementById("signupModalLabel").textContent = profileTitle;
  document.getElementById("selectedCandidateMeta").textContent = profileLocation;
  document.getElementById("selectedCandidateImage").src = image.src;
  document.getElementById("selectedCandidateImage").alt = `Profilbild von ${candidateName}`;
  signupModal.show();
}

candidateGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".candidate-card");
  if (card) openCandidateForm(card);
});

candidateGrid.addEventListener("keydown", (event) => {
  const card = event.target.closest(".candidate-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openCandidateForm(card);
  }
});

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
    if (form.id === "signupForm") setTimeout(() => signupModal.hide(), 1200);
  } catch (error) {
    status.className = "form-status error";
    status.textContent = error.message || "Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.";
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonText;
  }
}

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm(event.currentTarget);
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm(event.currentTarget);
});

const ageModalElement = document.getElementById("ageModal");
const ageModal = new bootstrap.Modal(ageModalElement);
if (sessionStorage.getItem("herzensbund-age-confirmed") !== "yes") ageModal.show();

document.getElementById("confirmAge").addEventListener("click", () => {
  sessionStorage.setItem("herzensbund-age-confirmed", "yes");
  ageModal.hide();
});

document.getElementById("declineAge").addEventListener("click", () => {
  document.body.innerHTML = `
    <main class="d-flex align-items-center justify-content-center min-vh-100 text-center p-4">
      <div><i class="fa-solid fa-lock fa-2x mb-3 text-secondary"></i><h1 class="h3">Zugang nicht möglich</h1><p class="text-secondary">Diese Webseite ist nur für Personen ab 18 Jahren bestimmt.</p></div>
    </main>`;
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
