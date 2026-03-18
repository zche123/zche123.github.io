/* ============================================================
   ZHILIN (CASSIEL) CHEN — PORTFOLIO
   main.js
   ============================================================ */

/* --- Active nav link --------------------------------------- */
(function markActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.site-nav__links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    // Strip leading paths so relative links work on GitHub Pages
    const hrefBase = href.split('/').pop();
    const pathBase = path.split('/').pop() || 'index.html';
    if (hrefBase === pathBase ||
        (pathBase === '' && hrefBase === 'index.html')) {
      link.classList.add('active');
    }
  });
}());

/* --- Contact form ------------------------------------------ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // In a static deployment, redirect to mailto as fallback
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body    = encodeURIComponent(
      'From: ' + name + ' <' + email + '>\n\n' + message
    );
    window.location.href = 'mailto:ccassielchen12@gmail.com?subject=' + subject + '&body=' + body;

    if (feedback) {
      feedback.style.display = 'block';
      feedback.textContent = 'Opening your mail client…';
    }
  });
}());

/* --- Smooth scroll for anchor links ----------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
