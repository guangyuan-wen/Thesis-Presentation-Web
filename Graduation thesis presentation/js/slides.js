/* ========================================
   FROM PREFERENCES TO PLACES — Slides JS
   Mouse-driven slideshow navigation
   ======================================== */

const slides = Array.from(document.querySelectorAll('.slide'));
const totalSlides = slides.length;
let currentSlide = 0;
let isAnimating = false;

const currentNumEl = document.getElementById('current-num');
const totalNumEl = document.getElementById('total-num');
const progressFill = document.getElementById('progress-fill');
const dotNav = document.getElementById('dot-nav');
const zoneLeft = document.getElementById('zone-left');
const zoneRight = document.getElementById('zone-right');

// Initialize
totalNumEl.textContent = totalSlides;
buildDotNav();
updateUI();

// Build dot navigation
function buildDotNav() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotNav.appendChild(dot);
  }
}

// Update progress, counter, dots
function updateUI() {
  currentNumEl.textContent = currentSlide + 1;
  progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

  const dots = dotNav.querySelectorAll('.dot');
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

// Navigate to a slide
function goTo(index) {
  if (isAnimating) return;
  if (index < 0 || index >= totalSlides) return;
  if (index === currentSlide) return;

  isAnimating = true;

  const direction = index > currentSlide ? 1 : -1;
  const outgoing = slides[currentSlide];
  const incoming = slides[index];

  // Set up incoming position
  incoming.style.transition = 'none';
  incoming.style.transform = `translateX(${direction * 60}px)`;
  incoming.style.opacity = '0';
  incoming.classList.add('active');

  // Force reflow
  incoming.offsetHeight;

  // Animate outgoing
  outgoing.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  outgoing.style.transform = `translateX(${direction * -60}px)`;
  outgoing.style.opacity = '0';

  // Animate incoming
  incoming.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  incoming.style.transform = 'translateX(0)';
  incoming.style.opacity = '1';

  setTimeout(() => {
    outgoing.classList.remove('active');
    outgoing.style.transform = '';
    outgoing.style.opacity = '';
    outgoing.style.transition = '';
    incoming.style.transform = '';
    incoming.style.opacity = '';
    incoming.style.transition = '';
    currentSlide = index;
    updateUI();
    isAnimating = false;
  }, 520);
}

function next() { goTo(currentSlide + 1); }
function prev() { goTo(currentSlide - 1); }

// Mouse zone navigation — track position globally
// Nav zones are visual-only (pointer-events: none), clicks handled at document level
document.addEventListener('mousemove', (e) => {
  const w = window.innerWidth;
  const x = e.clientX;
  const ratio = x / w;

  if (ratio < 0.15) {
    zoneLeft.classList.add('show');
    zoneRight.classList.remove('show');
    document.body.style.cursor = currentSlide > 0 ? 'w-resize' : 'default';
  } else if (ratio > 0.85) {
    zoneRight.classList.add('show');
    zoneLeft.classList.remove('show');
    document.body.style.cursor = currentSlide < totalSlides - 1 ? 'e-resize' : 'default';
  } else {
    zoneLeft.classList.remove('show');
    zoneRight.classList.remove('show');
    document.body.style.cursor = 'default';
  }
});

document.addEventListener('click', (e) => {
  // Don't navigate if clicking interactive elements
  if (e.target.closest('a, button, input, select, .dot')) return;

  const w = window.innerWidth;
  const ratio = e.clientX / w;

  if (ratio < 0.15) {
    prev();
  } else if (ratio > 0.85) {
    next();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
      e.preventDefault();
      next();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      prev();
      break;
    case 'Escape':
      window.location.href = 'index.html';
      break;
    case 'Home':
      e.preventDefault();
      goTo(0);
      break;
    case 'End':
      e.preventDefault();
      goTo(totalSlides - 1);
      break;
  }
});

// Touch / swipe support
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx < 0) next();
    else prev();
  }
}, { passive: true });

// Mouse wheel navigation (debounced)
let wheelTimeout = null;
document.addEventListener('wheel', (e) => {
  if (wheelTimeout) return;
  if (e.deltaY > 30) {
    next();
  } else if (e.deltaY < -30) {
    prev();
  }
  wheelTimeout = setTimeout(() => {
    wheelTimeout = null;
  }, 600);
}, { passive: true });

