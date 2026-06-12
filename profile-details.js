const profiles = [
  { name: "Sophie", age: 25, city: "Hamburg", image: "images/01.jpg", tags: ["Reisen", "Kultur"], region: "Norddeutschland", description: "Ich bin eine offene und lebensfrohe Frau, die gern neue Orte entdeckt und besondere Momente mit vertrauten Menschen teilt. Ehrlichkeit, Humor und gegenseitiger Respekt sind mir besonders wichtig." },
  { name: "Laura", age: 29, city: "M\u00fcnchen", image: "images/02.jpg", tags: ["Berge", "Kochen"], region: "S\u00fcddeutschland", description: "Ich genie\u00dfe Wochenenden in den Bergen, gemeinsames Kochen und lange Gespr\u00e4che. Ich w\u00fcnsche mir einen zuverl\u00e4ssigen Mann, der mit beiden Beinen im Leben steht." },
  { name: "Anna", age: 38, city: "Berlin", image: "images/03.jpg", tags: ["Kunst", "Konzerte"], region: "Ostdeutschland", description: "Kunst, Musik und ein abwechslungsreiches Stadtleben geh\u00f6ren zu mir. Gleichzeitig sch\u00e4tze ich ruhige Abende und suche eine ehrliche, langfristige Verbindung." },
  { name: "Julia", age: 32, city: "K\u00f6ln", image: "images/04.jpg", tags: ["Fitness", "Genuss"], region: "Westdeutschland", description: "Ich bin aktiv, positiv und genie\u00dfe die sch\u00f6nen Dinge des Lebens. Ein liebevoller Umgang, gemeinsames Lachen und echte Verbindlichkeit bedeuten mir viel." },
  { name: "Katharina", age: 36, city: "Stuttgart", image: "images/05.jpg", tags: ["Natur", "Lesen"], region: "S\u00fcddeutschland", description: "In meiner Freizeit bin ich gern drau\u00dfen oder vertiefe mich in ein gutes Buch. Ich suche einen warmherzigen Partner f\u00fcr eine vertrauensvolle Beziehung." },
  { name: "Marie", age: 28, city: "D\u00fcsseldorf", image: "images/06.jpg", tags: ["Mode", "Reisen"], region: "Westdeutschland", description: "Ich interessiere mich f\u00fcr Mode, Reisen und neue Kulturen. Mein Wunsch ist eine Partnerschaft, in der man sich gegenseitig inspiriert und unterst\u00fctzt." },
  { name: "Leonie", age: 37, city: "Leipzig", image: "images/07.jpg", tags: ["Tanzen", "Fotografie"], region: "Ostdeutschland", description: "Tanzen und Fotografie geben meinem Alltag Kreativit\u00e4t. Ich mag humorvolle, aufmerksame Menschen und suche eine Beziehung mit N\u00e4he und gegenseitigem Vertrauen." },
  { name: "Nina", age: 32, city: "Bremen", image: "images/08.jpg", tags: ["Meer", "Yoga"], region: "Norddeutschland", description: "Am Meer kann ich am besten abschalten, Yoga sorgt f\u00fcr meine innere Balance. Ich w\u00fcnsche mir einen entspannten, ehrlichen Mann mit ernsthaften Absichten." },
  { name: "Johanna", age: 33, city: "Frankfurt", image: "images/09.jpg", tags: ["Theater", "Kulinarik"], region: "Westdeutschland", description: "Ich liebe Theaterabende, gutes Essen und anregende Gespr\u00e4che. Eine Partnerschaft sollte f\u00fcr mich von Respekt, Neugier und gemeinsamen Pl\u00e4nen gepr\u00e4gt sein." },
  { name: "Amelie", age: 27, city: "Dresden", image: "images/10.jpg", tags: ["Musik", "Wandern"], region: "Ostdeutschland", description: "Musik begleitet mich jeden Tag, und beim Wandern tanke ich neue Energie. Ich suche jemanden, mit dem aus sch\u00f6nen Augenblicken eine gemeinsame Zukunft entstehen kann." },
  { name: "Charlotte", age: 38, city: "Hannover", image: "images/11.jpg", tags: ["Garten", "Reisen"], region: "Norddeutschland", description: "Ich verbringe gern Zeit im Garten und entdecke auf Reisen neue Lieblingsorte. Bodenst\u00e4ndigkeit, Herzlichkeit und Verl\u00e4sslichkeit sind mir wichtig." },
  { name: "Lena", age: 31, city: "N\u00fcrnberg", image: "images/12.jpg", tags: ["Sport", "Freunde"], region: "S\u00fcddeutschland", description: "Sport und Freunde geh\u00f6ren fest zu meinem Leben. Ich bin unkompliziert, loyal und bereit f\u00fcr eine Beziehung, in der beide gemeinsam wachsen." },
  { name: "Isabell", age: 37, city: "Essen", image: "images/13.jpg", tags: ["Kunst", "Kochen"], region: "Westdeutschland", description: "Kreativit\u00e4t und gutes Essen machen mich gl\u00fccklich. Ich suche einen humorvollen Mann, der Offenheit sch\u00e4tzt und eine verbindliche Partnerschaft m\u00f6chte." },
  { name: "Miriam", age: 40, city: "L\u00fcbeck", image: "images/14.jpg", tags: ["Segeln", "Literatur"], region: "Norddeutschland", description: "Segeln gibt mir Freiheit, Literatur neue Perspektiven. Ich w\u00fcnsche mir eine reife, liebevolle Beziehung mit einem Mann, der wei\u00df, was er m\u00f6chte." },
  { name: "Clara", age: 29, city: "Freiburg", image: "images/15.jpg", tags: ["Natur", "Radfahren"], region: "S\u00fcddeutschland", description: "Ich liebe die Natur und bin oft mit dem Fahrrad unterwegs. Gesucht wird ein positiver Partner f\u00fcr gemeinsame Abenteuer und einen harmonischen Alltag." },
  { name: "Sarah", age: 34, city: "Potsdam", image: "images/16.jpg", tags: ["Reisen", "Design"], region: "Ostdeutschland", description: "Design und Reisen inspirieren mich. In einer Beziehung z\u00e4hlen f\u00fcr mich Aufmerksamkeit, Ehrlichkeit und die Freude daran, Neues gemeinsam zu erleben." },
  { name: "Elena", age: 36, city: "Bonn", image: "images/17.jpg", tags: ["Musik", "Genuss"], region: "Westdeutschland", description: "Ich mag Musik, gutes Essen und Menschen mit einer positiven Haltung. Ich suche eine best\u00e4ndige Partnerschaft mit N\u00e4he, Leichtigkeit und gegenseitiger Achtung." },
  { name: "Franziska", age: 32, city: "Kiel", image: "images/18.jpg", tags: ["Meer", "Konzerte"], region: "Norddeutschland", description: "Das Meer ist mein Lieblingsort, Konzerte meine liebste Auszeit. Ich w\u00fcnsche mir einen offenen Mann, der bereit f\u00fcr eine echte Verbindung ist." },
  { name: "Viktoria", age: 39, city: "Augsburg", image: "images/19.jpg", tags: ["Kultur", "Wandern"], region: "S\u00fcddeutschland", description: "Kultur und Bewegung in der Natur bringen Abwechslung in mein Leben. Ich suche einen respektvollen Partner mit Humor, Tiefgang und klaren Absichten." },
  { name: "Theresa", age: 30, city: "Erfurt", image: "images/20.jpg", tags: ["Caf\u00e9s", "Fotografie"], region: "Ostdeutschland", description: "Ich entdecke gern besondere Caf\u00e9s und halte sch\u00f6ne Momente mit der Kamera fest. Ich freue mich auf einen warmherzigen Mann f\u00fcr eine ehrliche Beziehung." }
];

const requestedProfile = Number.parseInt(new URLSearchParams(window.location.search).get("profile"), 10);
const profileIndex = Number.isInteger(requestedProfile) && requestedProfile >= 1 && requestedProfile <= profiles.length
  ? requestedProfile - 1
  : 0;
const profile = profiles[profileIndex];

document.title = `${profile.name}, ${profile.age} | Herzensbund`;
document.getElementById("profileImage").src = profile.image;
document.getElementById("profileImage").alt = `Profilbild von ${profile.name}`;
document.getElementById("profileName").textContent = `${profile.name}, ${profile.age}`;
document.getElementById("profileLocation").append(`${profile.city}, Deutschland`);
document.getElementById("profileDescription").textContent = profile.description;
document.getElementById("profileRegion").textContent = profile.region;
document.getElementById("profileTags").innerHTML = profile.tags.map((tag) => `<span>${tag}</span>`).join("");
document.getElementById("confirmProfileAge").href = `signup.html?profile=${encodeURIComponent(profile.name)}`;
