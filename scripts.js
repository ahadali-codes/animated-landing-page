// Progress Bar
const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollPosition = window.scrollY;
  const progress = (scrollPosition / documentHeight) * 100;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgressBar);

// Sticky Header
const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll(".reveal");
const staggerRevealElements = document.querySelectorAll(".stagger-reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // For stagger reveal elements, add delay to children
        if (entry.target.classList.contains("stagger-reveal")) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
          });
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

staggerRevealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Parallax Effect
const parallaxElement = document.getElementById("parallaxElement");

function updateParallax() {
  if (!parallaxElement) return;

  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;

  parallaxElement.style.transform = `translateY(${rate}px)`;
}

window.addEventListener("scroll", updateParallax);

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateProgressBar();
  updateHeader();

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--transition", "none");
  }
});
