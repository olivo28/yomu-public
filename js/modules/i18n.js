// ==========================================================================
// YOMU (ヨム) — i18n Localization Engine Module
// Instant DOM and Dynamic Content Translation (Spanish / English)
// ==========================================================================

(function() {
  let currentLang = localStorage.getItem('yomu_lang') || 'es';

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem('yomu_lang', lang);
    document.documentElement.lang = lang;
    updateStaticDOM();
    updateSwitcherButtons();
    window.dispatchEvent(new CustomEvent('yomu-lang-changed', { detail: { lang } }));
  }

  function t(key, fallback = '') {
    const dict = window.YOMU_LOCALES ? window.YOMU_LOCALES[currentLang] : null;
    if (dict && dict[key]) {
      return dict[key];
    }
    return fallback || key;
  }

  function updateStaticDOM() {
    // Translate textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // Translate Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Translate Titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = t(key);
      if (translation) {
        el.setAttribute('title', translation);
      }
    });
  }

  function updateSwitcherButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetLang = e.currentTarget.getAttribute('data-lang');
        setLang(targetLang);
      });
    });

    setLang(currentLang);
  }

  window.YOMU_I18N = {
    init,
    getLang,
    setLang,
    t
  };
})();
