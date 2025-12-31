// Load header and footer
document.addEventListener('DOMContentLoaded', () => {
  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('header.html')
      .then(response => response.text())
      .then(html => {
        headerPlaceholder.innerHTML = html;
        // Re-initialize header-dependent scripts
        initializeHeader();
      });
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.innerHTML = html;
      });
  }
});

// Initialize header-dependent functionality
function initializeHeader() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
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

  // Update cart count
  updateCartCount();
}

// Cart count update
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countEl = document.getElementById('cart-count');

  if (!countEl) return;

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
  countEl.textContent = totalQuantity;
  countEl.style.display = cart.length ? 'inline-flex' : 'none';
}
