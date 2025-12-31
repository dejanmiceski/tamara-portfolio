// ===== CART COUNT (ALL PAGES) =====
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countEl = document.getElementById('cart-count');

  if (!countEl) return;

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
  countEl.textContent = totalQuantity;
  countEl.style.display = cart.length ? 'inline-flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCartCount);

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
});

// ===== MERCH SCROLL (only on homepage) =====
document.addEventListener("DOMContentLoaded", () => {
  const merchLink = document.querySelector('.merch-link');
  const merchSection = document.getElementById("merch");

  if (merchLink && merchSection) {
    merchLink.addEventListener("click", (e) => {
      e.preventDefault();
      merchSection.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// ===== AUDIO PLAYER (HOMEPAGE) =====
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audioPlayer");
  if (!audio) return;

  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const timeRemaining = document.getElementById("timeRemaining");

  audio.volume = 1.0;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

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

  audio.addEventListener("timeupdate", () => {
    const remaining = audio.duration - audio.currentTime;
    timeRemaining.textContent = formatTime(remaining);
  });

  audio.addEventListener("loadedmetadata", () => {
    timeRemaining.textContent = formatTime(audio.duration);
  });

  // Autoplay attempt (works on desktop and some mobile after user interaction)
  const tryAutoplay = () => {
    audio.play().then(() => {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    }).catch(err => {
      console.log("Autoplay prevented by browser");
    });
  };

  // Try autoplay immediately
  tryAutoplay();

  // For mobile: try again on first user interaction
  const enableAutoplayOnInteraction = () => {
    tryAutoplay();
    document.removeEventListener("touchstart", enableAutoplayOnInteraction);
    document.removeEventListener("click", enableAutoplayOnInteraction);
  };

  document.addEventListener("touchstart", enableAutoplayOnInteraction, { once: true });
  document.addEventListener("click", enableAutoplayOnInteraction, { once: true });
});
