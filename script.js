document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const pagePanels = document.querySelectorAll(".page-panel");
  const navLinks = document.querySelectorAll(".nav-link");
  const jumpers = document.querySelectorAll(".panel-jump");
  const vaultOverlay = document.querySelector(".vault-overlay");
  const venueBlocks = document.querySelectorAll(".venue-block");
  const spotlightImage = document.getElementById("spotlight-image");
  const spotlightCopy = document.getElementById("spotlight-copy");
  const spotlightDiscord = document.getElementById("spotlight-discord");
  const spotlightCarrd = document.getElementById("spotlight-carrd");
  const body = document.body;

  // Modal scaffolding for venue focus
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "venue-modal-overlay";
  modalOverlay.innerHTML = `
    <div class="venue-modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close details">&times;</button>
      <div class="modal-content"></div>
    </div>
  `;
  const modalContent = modalOverlay.querySelector(".modal-content");
  const modalClose = modalOverlay.querySelector(".modal-close");
  document.body.appendChild(modalOverlay);

  const closeModal = () => {
    modalOverlay.classList.remove("open");
    body.classList.remove("modal-open");
    modalContent.innerHTML = "";
  };

  const openModal = (block) => {
    if (!block) return;
    const clone = block.cloneNode(true);
    clone.classList.remove("popped");
    modalContent.innerHTML = "";
    modalContent.appendChild(clone);
    modalOverlay.classList.add("open");
    body.classList.add("modal-open");
  };

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  const setHeaderState = () => {
    if (!header) return;
    const scrolled = window.scrollY > 12;
    header.classList.toggle("scrolled", scrolled);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  const revealables = document.querySelectorAll(".section, .feature-card, .card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealables.forEach((el) => observer.observe(el));

  const setPanel = (id) => {
    pagePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.getAttribute("data-panel") === id);
    });
    navLinks.forEach((link) => {
      const target = link.getAttribute("data-panel-target");
      link.classList.toggle("active", target === id);
    });
    nav?.classList.remove("open");
  };

  [...navLinks, ...jumpers].forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-panel-target");
      if (target) {
        e.preventDefault();
        setPanel(target);
      }
    });
  });

  // Default to overview on load to keep other panels (like Contact) off the front page
  setPanel("venues");

  if (vaultOverlay) {
    vaultOverlay.addEventListener("animationend", () => {
      vaultOverlay.classList.add("done");
    });

    // Fallback for browsers that skip animations or if animationend doesn't fire
    const overlayTimeout = setTimeout(() => vaultOverlay.classList.add("done"), 2800);
    vaultOverlay.addEventListener("animationend", () => clearTimeout(overlayTimeout));

    // Honor reduced motion by skipping the overlay immediately
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduce.matches) {
      vaultOverlay.classList.add("done");
    }
  }

  if (venueBlocks.length) {
    venueBlocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        // allow normal link clicks inside without toggling
        if (e.target.closest("a")) return;
        openModal(block);
      });
    });
  }

  const spotlightData = [
  {
    day: 0, // Sunday
    name: "The Worlds End",
    image: "images/Worlds_End_White.png",
    copy: "The Worlds End — Sundays 8PM-12AM PST · Dynamis · Rafflesia · Mist · Ward 5 · Plot 2",
    discord: "https://discord.gg/8PhuEU6C8K",
    carrd: "https://theworldsend.carrd.co/",
  },
  {
    day: 1, // Monday
    name: "Maneki Neko",
    image: "images/ManekiNeko.png",
    copy: "Maneki Neko — Mon & Tue 9PM-2AM EST · Dynamis · Rafflesia · Goblet · Ward 2 · Plot 30",
    discord: "https://discord.gg/qe4kDRtp8d",
    carrd: "https://maneki-neko.crd.co/",
  },
  {
    day: 2, // Tuesday
    name: "Maneki Neko",
    image: "images/ManekiNeko.png",
    copy: "Maneki Neko — Mon & Tue 9PM-2AM EST · Dynamis · Rafflesia · Goblet · Ward 2 · Plot 30",
    discord: "https://discord.gg/qe4kDRtp8d",
    carrd: "https://maneki-neko.crd.co/",
  },
  {
    day: 4, // Thursday
    name: "Pandora",
    image: "images/Morningstar.png",
    copy: "Pandora — Thursdays 10PM EST · Dynamis · Kraken · Mist · Ward 11 · Plot 15",
    discord: "https://discord.gg/eXvAefPP8G",
    carrd: "https://pandoraffxiv.carrd.co/",
  },
  {
    day: 5, // Friday
    name: "Pulse",
    image: "images/PulseLogo.png",
    copy: "Pulse — Fridays 9PM-1AM EST · Dynamis · Rafflesia · Goblet · Ward 17 · Plot 60",
    discord: "https://discord.gg/SYrZ3sAsad",
    carrd: "https://pulsexiv.carrd.co/",
  },
  {
    day: 6, // Saturday
    name: "Club Shadowsong",
    image: "images/ShadowSong-Glow.png",
    copy: "Club Shadowsong — Saturdays 12AM-5AM EST · Dynamis · Kraken · Mist · Ward 2 · Plot 45",
    discord: "https://discord.gg/JNz8WucgmN",
    carrd: "https://club-shadowsong.carrd.co/",
  },
];

  const setSpotlightForToday = () => {
    if (!spotlightImage || !spotlightCopy || !spotlightDiscord || !spotlightCarrd) return;
    const today = new Date().getDay(); // 0 Sunday ... 6 Saturday
    const match = spotlightData.find((v) => v.day === today) || spotlightData.find((v) => v.day === 5) || spotlightData[0];
    spotlightImage.src = match.image;
    spotlightImage.alt = `${match.name} spotlight logo`;
    spotlightCopy.textContent = match.copy;
    spotlightDiscord.href = match.discord;
    spotlightCarrd.href = match.carrd;
  };

  setSpotlightForToday();

  // 3D deck carousel for Family (desktop, motion allowed)
  const setupCarousel = () => {
    const container = document.querySelector(".family-showcase");
    if (!container) return;
    const cards = [...container.querySelectorAll(".venue-block")];
    if (cards.length < 2) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px)").matches;
    if (prefersReduce || compact) return;

    container.classList.add("carousel");
    cards.forEach((c) => c.classList.remove("popped"));

    const step = 360 / cards.length;
    const radius = 420;
    let active = 0;
    let auto;

    const render = () => {
      cards.forEach((card, idx) => {
        const angle = active * -step + idx * step;
        const rad = (angle * Math.PI) / 180;
        const scale = idx === active ? 1 : 0.92;
        const depth = Math.cos(rad);
        card.style.zIndex = idx === active ? 200 : Math.round(100 + depth * 50);
        card.style.opacity = depth < -0.75 ? 0.2 : 1;
        card.style.transform = `translate(-50%, 0) rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle}deg) scale(${scale})`;
        card.classList.toggle("popped", idx === active);
      });
    };

    const focusCard = (idx) => {
      active = ((idx % cards.length) + cards.length) % cards.length;
      render();
    };

    cards.forEach((card, idx) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        focusCard(idx);
        pauseAuto();
      });
    });

    const startAuto = () => {
      if (auto) return;
      auto = setInterval(() => focusCard(active + 1), 5200);
    };

    const pauseAuto = () => {
      if (auto) {
        clearInterval(auto);
        auto = null;
      }
      setTimeout(startAuto, 9000);
    };

    render();
    startAuto();
  };

  setupCarousel();
});






