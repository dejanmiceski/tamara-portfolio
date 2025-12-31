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
    (sum, item) => sum + (item.qty || 1),
    0
  );

  // Optional: hide badge if empty
  countEl.style.display = cart.length ? "flex" : "none";
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

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
