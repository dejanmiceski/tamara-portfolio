// ===== MERCH SCROLL (only on homepage) =====
const merchLink = document.getElementById("merchLink");
const merchSection = document.getElementById("merch");

if (merchLink && merchSection) {
  merchLink.addEventListener("click", (e) => {
    e.preventDefault();
    merchSection.scrollIntoView({ behavior: "smooth" });
  });
}

// ===== CART COUNT (ALL PAGES) =====
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");

  if (!countEl) return;

  countEl.textContent = cart.reduce(
    (sum, item) => sum + (item.quantity || item.qty || 1),
    0
  );

  // Optional: hide badge if empty
  countEl.style.display = cart.length ? "inline-flex" : "none";
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

// ===== AUDIO PLAYER (HOMEPAGE) =====
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const timeRemaining = document.getElementById("timeRemaining");

  if (!audio) return;

  // Set volume to max
  audio.volume = 1.0;

  // Format time helper
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Play/Pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    } else {
      audio.pause();
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  });

  // Update remaining time
  audio.addEventListener("timeupdate", () => {
    const remaining = audio.duration - audio.currentTime;
    timeRemaining.textContent = formatTime(remaining);
  });

  // Set initial remaining time when metadata loads
  audio.addEventListener("loadedmetadata", () => {
    timeRemaining.textContent = formatTime(audio.duration);
  });

  // Autoplay on page load
  audio.play().then(() => {
    // Successfully started playback
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }).catch(err => {
    // Autoplay was blocked - user will need to click play
    console.log("Autoplay prevented - user interaction required");
  });
});

// ===== MOBILE MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    // Close menu when clicking a link
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }
});
