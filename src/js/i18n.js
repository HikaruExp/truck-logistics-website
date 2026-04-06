import en from '../translations/en.json';
import ka from '../translations/ka.json';

const translations = { en, ka };

let currentLang = localStorage.getItem('lang') || 'en';

export function getCurrentLang() {
  return currentLang;
}

export function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  return value || key;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'ka' ? 'ka' : 'en';
  applyTranslations();
  updateLangToggle();
  updateMetaTags();
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value && value !== key) {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = t(key);
    if (value && value !== key) {
      el.placeholder = value;
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    const value = t(key);
    if (value && value !== key) {
      el.alt = value;
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const value = t(key);
    if (value && value !== key) {
      el.setAttribute('aria-label', value);
    }
  });
}

function updateLangToggle() {
  const enBtn = document.getElementById('lang-en');
  const kaBtn = document.getElementById('lang-ka');
  if (enBtn && kaBtn) {
    enBtn.classList.toggle('active', currentLang === 'en');
    kaBtn.classList.toggle('active', currentLang === 'ka');
  }
}

function updateMetaTags() {
  const desc = t('hero.description');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = desc;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = desc;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = t('hero.title') + ' — ' + t('hero.tagline');
}

export function initI18n() {
  document.documentElement.lang = currentLang === 'ka' ? 'ka' : 'en';
  applyTranslations();
  updateLangToggle();
}
