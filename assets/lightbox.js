document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('img'));
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '画像拡大表示');
  overlay.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="閉じる">×</button>
    <button class="lightbox-prev" type="button" aria-label="前の画像">‹</button>
    <figure class="lightbox-content">
      <img class="lightbox-image" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
    <button class="lightbox-next" type="button" aria-label="次の画像">›</button>
  `;
  document.body.appendChild(overlay);

  const largeImage = overlay.querySelector('.lightbox-image');
  const caption = overlay.querySelector('.lightbox-caption');
  const close = overlay.querySelector('.lightbox-close');
  const prev = overlay.querySelector('.lightbox-prev');
  const next = overlay.querySelector('.lightbox-next');
  let current = 0;

  images.forEach((img, index) => {
    img.classList.add('zoomable-image');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || '画像'}を拡大`);

    const open = () => {
      current = index;
      render();
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      close.focus();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  function render() {
    const img = images[current];
    largeImage.src = img.currentSrc || img.src;
    largeImage.alt = img.alt || '';
    caption.textContent = img.alt || '';
    const multiple = images.length > 1;
    prev.hidden = !multiple;
    next.hidden = !multiple;
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
  }

  function move(step) {
    current = (current + step + images.length) % images.length;
    render();
  }

  close.addEventListener('click', closeLightbox);
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
});
