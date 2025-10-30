/* ========== MAIN JS ========== */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.6s ease";
      setTimeout(() => preloader.remove(), 600);
    }, 300);
  });

  /* ===== HEADER SCROLL EFFECT ===== */
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  /* ===== MOBILE NAV TOGGLE ===== */
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".navmenu");

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileToggle.classList.toggle("bi-x");
  });

  /* ===== TYPED TEXT ===== */
  const typed = document.querySelector(".typed");
  if (typed) {
    const items = typed.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: items,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      cursorChar: "_"
    });
  }

  /* ===== LEARN MORE BUTTON ===== */
  const detailsBtn = document.getElementById("details-btn");
  const moreContent = document.getElementById("more-content");

  if (detailsBtn && moreContent) {
    detailsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (moreContent.style.display === "none" || !moreContent.style.display) {
        moreContent.style.display = "block";
        moreContent.style.animation = "fadeInUp 0.8s ease";
        detailsBtn.textContent = "Show Less";
      } else {
        moreContent.style.display = "none";
        detailsBtn.textContent = "Learn More";
      }
    });
  }

  /* ===== SCROLL TO TOP ===== */
  const scrollTop = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollTop.classList.add("active");
    else scrollTop.classList.remove("active");
  });

  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===== NEON GLOW HOVER EFFECT ===== */
  const glowElements = document.querySelectorAll(".details-btn, .view-all-btn, .read-more-btn, .view-team-btn");
  glowElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      el.style.boxShadow = "0 0 15px #00ffff";
      el.style.textShadow = "0 0 5px #00ffff";
    });
    el.addEventListener("mouseleave", () => {
      el.style.boxShadow = "none";
      el.style.textShadow = "none";
    });
  });

  /* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
  document.querySelectorAll('.navmenu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("bi-x");
      }
    });
  });

  /* ===== 3D CARD HOVER (Tech vibe) ===== */
  const cards = document.querySelectorAll(".program-card, .project-card, .course-card, .blog-card, .team-member");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * 10;
      const rotateY = (x / rect.width - 0.5) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });
});


















/* ===== About us ===== */
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Scroll to top functionality
const scrollTop = document.getElementById('scroll-top');
if (scrollTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });
    
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Ensure hero image loads properly
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('#about-hero img');
    if (heroImage) {
        heroImage.onload = function() {
            this.style.opacity = '1';
        };
    }
});