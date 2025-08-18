// Mobile Burger Menu Logic
document.addEventListener("DOMContentLoaded", () => {
  // 1. Create burger icon and container if not present
  let menuBurger = document.querySelector(".menu_burger_container");
  if (!menuBurger) {
    menuBurger = document.createElement("div");
    menuBurger.className = "menu_burger_container md:hidden flex items-center ml-auto cursor-pointer";
    menuBurger.innerHTML = `
      <span class="sr-only">Menu</span>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="7" x2="21" y2="7"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="17" x2="21" y2="17"/>
      </svg>
    `;
    document.querySelector("header nav").appendChild(menuBurger);
  }

  // 2. Create mobile nav menu
  const mobileNav = document.createElement("nav");
  mobileNav.className = "navbar_mobile fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center transition-transform duration-300 transform -translate-x-full";
  mobileNav.innerHTML = `
    <button class="menu_close absolute top-6 right-6 p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition">
      <span class="sr-only">Fermer</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <ul class="flex flex-col space-y-8 text-xl font-bold mt-12 text-white">
      <li><a href="#home" class="hover:text-amber-600 transition-colors">Accueil</a></li>
      <li><a href="#about" class="hover:text-amber-600 transition-colors">À propos</a></li>
      <li><a href="#projets" class="hover:text-amber-600 transition-colors">Projets</a></li>
      <li><a href="#services" class="hover:text-amber-600 transition-colors">Services</a></li>
      <li><a href="#contact" class="hover:text-amber-600 transition-colors">Contact</a></li>
    </ul>
  `;
  document.body.appendChild(mobileNav);

  // 3. Open menu
  menuBurger.addEventListener("click", () => {
    mobileNav.classList.remove("-translate-x-full");
    mobileNav.classList.add("translate-x-0");

    // Highlight current section link in mobile menu
    const sections = Array.from(document.querySelectorAll('section[id]'));
    let scrollPos = window.scrollY + window.innerHeight / 2;
    let currentSection = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentSection = section;
      }
    }
    mobileNav.querySelectorAll("a").forEach(link => {
      link.classList.toggle(
        "text-amber-600",
        link.getAttribute("href") === `#${currentSection.id}`
      );
    });
  });

  // 4. Close menu
  mobileNav.querySelector(".menu_close").addEventListener("click", () => {
    mobileNav.classList.add("-translate-x-full");
    mobileNav.classList.remove("translate-x-0");
  });

  // 5. Close menu on link click
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("-translate-x-full");
      mobileNav.classList.remove("translate-x-0");
    });
  });
});

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
  intervalId = setInterval(nextSlide, 3000);
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