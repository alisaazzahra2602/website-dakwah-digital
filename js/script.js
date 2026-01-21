/**
 * DAKWAH DIGITAL SYSTEM - CORE JAVASCRIPT
 * Fitur: Smooth Scroll, ScrollSpy, Sticky Header, & Scroll Animation
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SELEKTOR ---
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-menu li a");
  const sections = document.querySelectorAll("section[id]");

  // --- 2. FUNGSI STICKY NAVBAR ---
  // Membuat navbar berubah ukuran dan warna saat di-scroll
  const handleNavbarScroll = () => {
    if (window.scrollY > 80) {
      navbar.style.padding = "10px 10%";
      navbar.style.background = "rgba(6, 47, 40, 0.95)"; // Emerald gelap transparan
      navbar.style.backdropFilter = "blur(8px)"; // Efek blur kaca
    } else {
      navbar.style.padding = "20px 10%";
      navbar.style.background = "#0b5e4f"; // Warna emerald asli
      navbar.style.backdropFilter = "none";
    }
  };

  // --- 3. FUNGSI SCROLL SPY ---
  // Mengubah menu aktif secara otomatis saat men-scroll halaman
  const handleScrollSpy = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Memeriksa apakah posisi scroll berada di area section
      if (window.pageYOffset >= sectionTop - 150) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  };

  // --- 4. ANIMASI MUNCUL SAAT SCROLL (REVEAL) ---
  // Membuat konten artikel muncul perlahan saat di-scroll
  const revealElements = () => {
    const cards = document.querySelectorAll(".artikel-card, .section-title");
    cards.forEach((card) => {
      const windowHeight = window.innerHeight;
      const elementTop = card.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.transition = "all 0.8s ease-out";
      }
    });
  };

  // Set style awal untuk animasi reveal
  document.querySelectorAll(".artikel-card").forEach((c) => {
    c.style.opacity = "0";
    c.style.transform = "translateY(30px)";
  });

  // --- 5. BACK TO TOP BUTTON (LOGIC) ---
  const createBackToTop = () => {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.id = "backToTop";
    btn.style.cssText = `
      position: fixed; bottom: 30px; right: 30px;
      display: none; background: #22f345; color: #062f28;
      border: none; width: 45px; height: 45px; border-radius: 50%;
      cursor: pointer; font-weight: bold; font-size: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000;
      transition: 0.3s;
    `;
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 500 ? "block" : "none";
    });
  };

  // --- 6. EVENT LISTENER ---
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleScrollSpy();
    revealElements();
  });

  // Inisialisasi Back to Top
  createBackToTop();

  // Logika Klik Smooth Scroll untuk Browser Lama
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  console.log("Dakwah Digital System: JS Loaded Successfully!");
});
