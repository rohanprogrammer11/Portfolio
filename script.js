const contactBtn = document.getElementById("contact-btn");
const contactOptions = document.getElementById("contact-options");


contactBtn.addEventListener("click", () => {
contactOptions.classList.toggle("hidden");
});


const themeToggle = document.getElementById("theme-toggle");
const body = document.body;


let darkMode = true;

// Fade-in animation on scroll
const boxes = document.querySelectorAll('.about-box, .skill-card, .project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

boxes.forEach(box => {
  box.classList.add('fade-in-up'); // apply hidden state
  observer.observe(box);
});



themeToggle.addEventListener("click", () => {
darkMode = !darkMode;
if (darkMode) {
body.style.background = "linear-gradient(to bottom right, #1e1b4b, #4c1d95)";
body.style.color = "white";
themeToggle.textContent = "🌙";
} else {
body.style.background = "#f3f4f6";
body.style.color = "black";
themeToggle.textContent = "☀️";
}
});