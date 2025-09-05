// ============== Sludgers UI ==============

// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeBtn');
const icon = darkModeBtn?.querySelector('i');
const savedTheme = localStorage.getItem('sludgers_theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  icon?.classList.remove('fa-moon');
  icon?.classList.add('fa-sun');
}
darkModeBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  if (icon) {
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
  }
  localStorage.setItem('sludgers_theme', isDark ? 'dark' : 'light');
});

// Mobile Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if (navMenu.hasAttribute('hidden')) navMenu.removeAttribute('hidden');
  else navMenu.setAttribute('hidden','');
});
// Close menu when a link is clicked (mobile)
document.querySelectorAll('#nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900 && !navMenu.hasAttribute('hidden')) {
      navToggle.setAttribute('aria-expanded','false');
      navMenu.setAttribute('hidden','');
    }
  });
});
// Close on Escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && navMenu && !navMenu.hasAttribute('hidden')){
    navToggle.setAttribute('aria-expanded','false');
    navMenu.setAttribute('hidden','');
  }
});

// Scroll Reveal
function revealOnScroll(){
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < windowHeight - 100) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll, { passive:true });
window.addEventListener('load', revealOnScroll);

// Simple Slider (on projects page)
(function slider(){
  let index = 0;
  const slides = document.querySelectorAll('.mySlides');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  if(!slides.length) return;

  function show(i){
    slides.forEach(s => s.style.display = 'none');
    slides[i].style.display = 'block';
  }
  function goNext(){
    index = (index + 1) % slides.length;
    show(index);
  }
  function goPrev(){
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  }

  show(index);
  let timer = setInterval(goNext, 4500);

  prev?.addEventListener('click', ()=>{ clearInterval(timer); goPrev(); timer = setInterval(goNext, 4500); });
  next?.addEventListener('click', ()=>{ clearInterval(timer); goNext(); timer = setInterval(goNext, 4500); });

  slides.forEach(s=>{
    s.addEventListener('mouseenter', ()=> clearInterval(timer));
    s.addEventListener('mouseleave', ()=> timer = setInterval(goNext, 4500));
  });
})();
