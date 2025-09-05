// script.js - interactivity for Sludgers

/* -------------- Theme (dark / light) -------------- */
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme){
  if(theme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Light';
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    document.body.classList.remove('dark');
    themeToggle.textContent = 'Dark';
    themeToggle.setAttribute('aria-pressed','false');
  }
}
const saved = localStorage.getItem('sludgers_theme');
applyTheme(saved === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  applyTheme(isDark ? 'dark' : 'light');
  localStorage.setItem('sludgers_theme', isDark ? 'dark' : 'light');
});

/* -------------- Responsive nav toggle -------------- */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if(navMenu.hasAttribute('hidden')){
    navMenu.removeAttribute('hidden');
  } else {
    navMenu.setAttribute('hidden','');
  }
});

/* Close mobile menu on link click */
document.querySelectorAll('#nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900 && !navMenu.hasAttribute('hidden')) {
      navToggle.setAttribute('aria-expanded','false');
      navMenu.setAttribute('hidden','');
    }
  });
});

/* Close menu on Escape */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && navMenu && !navMenu.hasAttribute('hidden')){
    navToggle.setAttribute('aria-expanded','false');
    navMenu.setAttribute('hidden','');
  }
});

/* -------------- Scroll reveal -------------- */
function revealOnScroll(){
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 100) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll, {passive:true});
window.addEventListener('load', revealOnScroll);

/* -------------- Simple slider for projects -------------- */
(function slider(){
  let slideIndex = 0;
  const slides = document.querySelectorAll('.mySlides');
  if(!slides || slides.length === 0) return;

  function show(n){
    slides.forEach(s => s.style.display = 'none');
    slides[n].style.display = 'block';
  }

  function next(){
    slideIndex = (slideIndex + 1) % slides.length;
    show(slideIndex);
  }

  // autoplay
  show(slideIndex);
  let autoplay = setInterval(next, 4500);

  // pause on hover
  slides.forEach(s => {
    s.addEventListener('mouseenter', () => clearInterval(autoplay));
    s.addEventListener('mouseleave', () => autoplay = setInterval(next, 4500));
  });

  // prev/next buttons (if present)
  document.querySelectorAll('.prev, .next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      clearInterval(autoplay);
      if(btn.classList.contains('next')) next();
      else {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        show(slideIndex);
      }
      autoplay = setInterval(next, 4500);
    });
  });
})();
