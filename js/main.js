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

  const viewport = shell.querySelector('[data-map-viewport]');
  const stage = shell.querySelector('[data-map-stage]');
  const modal = document.querySelector('[data-experience-modal]');
  const overlay = document.querySelector('[data-experience-overlay]');
  const title = document.querySelector('[data-experience-title]');
  const subtitle = document.querySelector('[data-experience-subtitle]');
  const body = document.querySelector('[data-experience-body]');
  const image = document.querySelector('[data-experience-image]');
  const imageCaption = document.querySelector('[data-experience-image-caption]');
  const prevImageButton = document.querySelector('[data-experience-image-prev]');
  const nextImageButton = document.querySelector('[data-experience-image-next]');
  const closeButtons = document.querySelectorAll('[data-experience-close]');
  let zoomLevel = 1;
  let galleryImages = [];
  let galleryIndex = 0;

  function applyZoom(nextZoom, preserveCenter) {
    if (!stage) return;

    const clampedZoom = Math.max(1, Math.min(2.4, nextZoom));
    const previousZoom = zoomLevel;
    zoomLevel = clampedZoom;
    stage.style.setProperty('--map-zoom', String(clampedZoom));

    if (viewport && preserveCenter && previousZoom !== clampedZoom) {
      const widthRatio = clampedZoom / previousZoom;
      const viewportCenterX = viewport.scrollLeft + viewport.clientWidth / 2;
      const viewportCenterY = viewport.scrollTop + viewport.clientHeight / 2;

      viewport.scrollLeft = viewportCenterX * widthRatio - viewport.clientWidth / 2;
      viewport.scrollTop = viewportCenterY * widthRatio - viewport.clientHeight / 2;
    }
  }

  function updateGallery() {
    if (!image || !imageCaption) return;

    const currentImage = galleryImages[galleryIndex];
    if (!currentImage) {
      image.removeAttribute('src');
      image.alt = '';
      imageCaption.textContent = '';
      if (prevImageButton) prevImageButton.hidden = true;
      if (nextImageButton) nextImageButton.hidden = true;
      return;
    }

    image.src = currentImage;
    image.alt = title ? (title.textContent || 'Experience image') : 'Experience image';
    imageCaption.textContent = galleryImages.length > 1
      ? 'Photo ' + (galleryIndex + 1) + ' of ' + galleryImages.length
      : '';

    const showNav = galleryImages.length > 1;
    if (prevImageButton) prevImageButton.hidden = !showNav;
    if (nextImageButton) nextImageButton.hidden = !showNav;
  }

  function openModal(button) {
    if (!modal || !overlay || !title || !subtitle || !body || !image || !imageCaption) return;

    title.textContent = button.dataset.title || '';
    subtitle.textContent = button.dataset.subtitle || '';
    body.textContent = button.dataset.body || '';
    galleryImages = (button.dataset.images || button.dataset.image || '')
      .split('|')
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
    galleryIndex = 0;
    updateGallery();

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
    galleryImages = [];
    galleryIndex = 0;
    image.removeAttribute('src');
    image.alt = '';
    imageCaption.textContent = '';
    if (prevImageButton) prevImageButton.hidden = true;
    if (nextImageButton) nextImageButton.hidden = true;
    document.body.classList.remove('experience-modal-open');
  }

  shell.querySelectorAll('[data-experience-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      openModal(button);
    });
  });

  if (viewport && stage) {
    viewport.addEventListener('wheel', function (e) {
      if (e.ctrlKey) return;
      e.preventDefault();

      const rect = viewport.getBoundingClientRect();
      const cursorX = e.clientX - rect.left + viewport.scrollLeft;
      const cursorY = e.clientY - rect.top + viewport.scrollTop;
      const nextZoom = e.deltaY < 0 ? zoomLevel + 0.12 : zoomLevel - 0.12;
      const clampedZoom = Math.max(1, Math.min(2.4, nextZoom));

      if (clampedZoom === zoomLevel) return;

      const zoomRatio = clampedZoom / zoomLevel;
      applyZoom(clampedZoom, false);

      viewport.scrollLeft = cursorX * zoomRatio - (e.clientX - rect.left);
      viewport.scrollTop = cursorY * zoomRatio - (e.clientY - rect.top);
    }, { passive: false });

    viewport.addEventListener('dblclick', function () {
      applyZoom(1, false);
      viewport.scrollLeft = 0;
      viewport.scrollTop = 0;
    });
  }

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

  if (prevImageButton) {
    prevImageButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (galleryImages.length < 2) return;
      galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery();
    });
  }

  if (nextImageButton) {
    nextImageButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (galleryImages.length < 2) return;
      galleryIndex = (galleryIndex + 1) % galleryImages.length;
      updateGallery();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  applyZoom(1, false);
}());
