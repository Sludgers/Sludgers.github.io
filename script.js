// ===== SELECT ELEMENTS =====
const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body;
const icon = darkModeBtn.querySelector("i");

// ===== DARK MODE TOGGLE =====
darkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Change icon dynamically
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

  // Save preference to local storage
  localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
});

// ===== LOAD USER PREFERENCE =====
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// ===== SCROLL REVEAL ANIMATIONS =====
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
});

// ===== IMAGE SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change slide every 4 sec
}
if (slides.length > 0) showSlides();
