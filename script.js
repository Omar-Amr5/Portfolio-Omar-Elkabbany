const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const typedText = document.getElementById("typedText");
const feedbackTrack = document.getElementById("feedbackTrack");
const profileWrapper = document.getElementById("profileWrapper");
const particlesContainer = document.getElementById("particles");

const headline = "Flutter Developer specialized in building modern cross-platform mobile applications using Flutter & Dart.";
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light-mode");
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  icon.className = body.classList.contains("light-mode") ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinksContainer.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((el) => sectionObserver.observe(el));
revealElements.forEach((el, index) => {
  const stagger = el.dataset.stagger || (index % 6) + 1;
  el.style.setProperty("--stagger", stagger);
});

function updateActiveLink() {
  const current = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (current >= top && current < bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

function runTypingEffect(text, speed = 24) {
  if (!typedText) return;
  let i = 0;
  function type() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i += 1;
      setTimeout(type, speed);
    }
  }
  type();
}

runTypingEffect(headline);

let carouselIndex = 0;
let autoplayId;

function setupHorizontalCarousel() {
  if (!feedbackTrack) return;
  const cards = Array.from(feedbackTrack.children);
  if (!cards.length) return;

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function moveCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(feedbackTrack).gap) || 0;
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    carouselIndex = (carouselIndex + 1) % (maxIndex + 1);
    feedbackTrack.style.transform = `translate3d(-${carouselIndex * (cardWidth + gap)}px, 0, 0)`;
  }

  function startAutoplay() {
    clearInterval(autoplayId);
    autoplayId = setInterval(moveCarousel, 2600);
  }

  startAutoplay();
  window.addEventListener("resize", () => {
    carouselIndex = 0;
    feedbackTrack.style.transform = "translateX(0)";
    startAutoplay();
  });
}

setupHorizontalCarousel();

if (profileWrapper) {
  window.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 992) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    profileWrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

function createParticles() {
  if (!particlesContainer) return;
  const count = window.innerWidth > 900 ? 24 : 12;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.bottom = `${Math.random() * 30}%`;
    dot.style.animationDelay = `${Math.random() * 8}s`;
    dot.style.animationDuration = `${6 + Math.random() * 7}s`;
    particlesContainer.appendChild(dot);
  }
}

createParticles();
