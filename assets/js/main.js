// Portfolio slider logic with auto-slide, pause on hover, and amber active dot

const slider = document.getElementById('portfolio-slider');
const slides = slider ? slider.children : [];
const dots = document.querySelectorAll('.portfolio-dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let current = 0;
let intervalId = null;

function showSlide(index) {
  if (!slider || slides.length === 0) return;
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('bg-amber-600', i === index);
    dot.classList.toggle('bg-white/40', i !== index);
    dot.classList.toggle('scale-125', i === index);
  });
  current = index;
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

function startAutoSlide() {
  stopAutoSlide();
  intervalId = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  if (intervalId) clearInterval(intervalId);
}

if (prevBtn) prevBtn.onclick = () => {
  prevSlide();
  startAutoSlide();
};
if (nextBtn) nextBtn.onclick = () => {
  nextSlide();
  startAutoSlide();
};
dots.forEach((dot, i) => {
  dot.onclick = () => {
    showSlide(i);
    startAutoSlide();
  };
});

// Pause on hover
if (slider) {
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
}

// Initialize
showSlide(0);
startAutoSlide();

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll('header nav > div > a[href^="#"]');
const sections = Array.from(document.querySelectorAll('section[id]'));

function updateActiveNav() {
  let scrollPos = window.scrollY + window.innerHeight / 2;
  let currentSection = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  }
  navLinks.forEach(link => {
    link.classList.toggle(
      'active-link',
      link.getAttribute('href') === `#${currentSection.id}`
    );
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);
document.addEventListener('DOMContentLoaded', updateActiveNav);