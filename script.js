/* ── Portfolio Script ─────────────────────────────────────── */

// ── Year
document.getElementById('year').textContent = new Date().getFullYear();

// ── Theme toggle
const html         = document.documentElement;
const themeToggle  = document.getElementById('theme-toggle');
const STORAGE_KEY  = 'ferza-theme';

// Load saved preference, else default to 'light'
const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY, next);
});

// ── Mobile nav toggle
const menuBtn  = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Close nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 70;
  revealObserver.observe(el);
});

// ── Active nav link on scroll
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-38% 0px -57% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Sticky header shadow
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Project Modals
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.project-modal-overlay.open').forEach(el => {
      el.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── Confusion Matrix Tabs (Steganografi Modal)
function showMatrix(arch) {
  // Hide all panels and deactivate all tabs
  document.querySelectorAll('.modal-matrix-panel:not(.otonom-matrix-panel):not(.nlp-matrix-panel)').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.matrix-tab:not(.otonom-matrix-tab):not(.nlp-matrix-tab)').forEach(t => t.classList.remove('active'));

  // Show selected
  const panel = document.getElementById('matrix-' + arch);
  if (panel) panel.classList.add('active');

  // Activate matching tab
  document.querySelectorAll('.matrix-tab:not(.otonom-matrix-tab):not(.nlp-matrix-tab)').forEach(t => {
    if (t.getAttribute('onclick') === `showMatrix('${arch}')`) {
      t.classList.add('active');
    }
  });
}

function showOtonomMatrix(kind) {
  document.querySelectorAll('.otonom-matrix-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.otonom-matrix-tab').forEach(t => t.classList.remove('active'));

  const panel = document.getElementById('otonom-matrix-' + kind);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('.otonom-matrix-tab').forEach(t => {
    if (t.getAttribute('onclick') === `showOtonomMatrix('${kind}')`) {
      t.classList.add('active');
    }
  });
}

function showNlpMatrix(kind) {
  document.querySelectorAll('.nlp-matrix-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nlp-matrix-tab').forEach(t => t.classList.remove('active'));

  const panel = document.getElementById('nlp-matrix-' + kind);
  if (panel) panel.classList.add('active');

  document.querySelectorAll('.nlp-matrix-tab').forEach(t => {
    if (t.getAttribute('onclick') === `showNlpMatrix('${kind}')`) {
      t.classList.add('active');
    }
  });
}
