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

/* --- Experience map modal -------------------------------- */
(function initExperienceMap() {
  const shell = document.querySelector('[data-experience-map]');
  if (!shell) return;

  const modal = document.querySelector('[data-experience-modal]');
  const overlay = document.querySelector('[data-experience-overlay]');
  const title = document.querySelector('[data-experience-title]');
  const subtitle = document.querySelector('[data-experience-subtitle]');
  const body = document.querySelector('[data-experience-body]');
  const image = document.querySelector('[data-experience-image]');
  const imageCaption = document.querySelector('[data-experience-image-caption]');
  const closeButtons = document.querySelectorAll('[data-experience-close]');

  function openModal(button) {
    if (!modal || !overlay || !title || !subtitle || !body || !image || !imageCaption) return;

    title.textContent = button.dataset.title || '';
    subtitle.textContent = button.dataset.subtitle || '';
    body.textContent = button.dataset.body || '';
    image.src = button.dataset.image || '';
    image.alt = button.dataset.title || 'Experience image placeholder';
    imageCaption.textContent = button.dataset.caption || '';

    modal.hidden = false;
    overlay.hidden = false;
    modal.style.display = 'grid';
    overlay.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('experience-modal-open');
  }

  function closeModal() {
    if (!modal || !overlay) return;
    modal.hidden = true;
    overlay.hidden = true;
    modal.style.display = 'none';
    overlay.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    title.textContent = '';
    subtitle.textContent = '';
    body.textContent = '';
    image.removeAttribute('src');
    image.alt = '';
    imageCaption.textContent = '';
    document.body.classList.remove('experience-modal-open');
  }

  shell.querySelectorAll('[data-experience-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      openModal(button);
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}());
