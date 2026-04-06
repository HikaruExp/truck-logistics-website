import { setLang, getCurrentLang, t } from './i18n.js';

export function renderHeader(activePage) {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-container">
      <a href="/" class="logo-link" aria-label="Truck Logistics Georgia - Home">
        <img src="/logo.jpeg" alt="Truck Logistics Georgia Logo" class="logo-img" width="220" height="72" loading="eager">
      </a>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <ul class="nav-list">
          <li><a href="/" class="nav-link ${activePage === 'home' ? 'active' : ''}" data-i18n="nav.home">Home</a></li>
          <li><a href="/about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}" data-i18n="nav.about">About Us</a></li>
          <li><a href="/services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}" data-i18n="nav.services">Services</a></li>
          <li><a href="/contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <div class="lang-toggle" role="group" aria-label="Language selector">
          <button id="lang-en" class="lang-btn ${getCurrentLang() === 'en' ? 'active' : ''}" onclick="window.__setLang('en')" aria-label="English">EN</button>
          <button id="lang-ka" class="lang-btn ${getCurrentLang() === 'ka' ? 'active' : ''}" onclick="window.__setLang('ka')" aria-label="ქართული">GE</button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
  `;

  window.__setLang = setLang;
  initHamburger();
  initHeaderScroll();
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('scrolled', currentScroll > 50);
    if (currentScroll > 300) {
      header.classList.toggle('hidden', currentScroll > lastScroll);
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/logo.jpeg" alt="Truck Logistics Georgia" class="footer-logo" width="160" height="53" loading="lazy">
          <p class="footer-tagline" data-i18n="footer.tagline">Any Route. Any Complexity. One Standard.</p>
        </div>
        <div class="footer-links">
          <h3 data-i18n="footer.quickLinks">Quick Links</h3>
          <ul>
            <li><a href="/" data-i18n="nav.home">Home</a></li>
            <li><a href="/about.html" data-i18n="nav.about">About Us</a></li>
            <li><a href="/services.html" data-i18n="nav.services">Services</a></li>
            <li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h3 data-i18n="footer.contactInfo">Contact Info</h3>
          <address>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+995551624266">+995 551 624 266</a>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:trucklogisticsgeorgia@gmail.com">trucklogisticsgeorgia@gmail.com</a>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span data-i18n="contact.addressValue">1 Viktor Nozadze Street, Tbilisi, Georgia</span>
            </div>
          </address>
        </div>
      </div>
      <div class="footer-bottom">
        <p data-i18n="footer.copyright">© 2026 Truck Logistics Georgia. All rights reserved.</p>
      </div>
    </div>
  `;
}
