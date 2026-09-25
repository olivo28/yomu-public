// ==========================================================================
// YOMU (ヨム) — Architectural Glossary Viewer Module (Bilingual ES/EN)
// Full-Page 29-Term Search, Category Filtering & Card Renderer
// ==========================================================================

(function() {
  let activeCategory = 'all';
  let searchQuery = '';

  function getLangState() {
    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    return { lang, isEs: lang === 'es' };
  }

  function renderCategories() {
    const container = document.getElementById('glossary-categories');
    if (!container || !window.YOMU_GLOSSARY_DATA) return;

    const { isEs } = getLangState();
    const categoriesSet = new Set();
    window.YOMU_GLOSSARY_DATA.forEach(item => {
      categoriesSet.add(isEs ? item.category_es : item.category_en);
    });

    const categories = Array.from(categoriesSet);
    const allLabel = window.YOMU_I18N ? window.YOMU_I18N.t('glossary.filterAll') : (isEs ? 'Todos los Términos (29)' : 'All Terms (29)');

    container.innerHTML = `
      <button class="glossary-cat-pill ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
        ${allLabel}
      </button>
      ${categories.map(cat => `
        <button class="glossary-cat-pill ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
          ${cat}
        </button>
      `).join('')}
    `;

    container.querySelectorAll('.glossary-cat-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.currentTarget.getAttribute('data-cat') || 'all';
        container.querySelectorAll('.glossary-cat-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderTerms();
      });
    });
  }

  function renderTerms() {
    const grid = document.getElementById('glossary-grid');
    const counterEl = document.getElementById('glossary-counter');
    if (!grid || !window.YOMU_GLOSSARY_DATA) return;

    const { isEs } = getLangState();
    const q = (searchQuery || '').toLowerCase().trim();

    const filtered = window.YOMU_GLOSSARY_DATA.filter(item => {
      const cat = isEs ? item.category_es : item.category_en;
      const def = (isEs ? item.definition_es : item.definition_en).toLowerCase();
      const term = item.term.toLowerCase();

      // Category filter
      if (activeCategory !== 'all' && cat !== activeCategory) {
        return false;
      }

      // Search query filter
      if (q) {
        return term.includes(q) || cat.toLowerCase().includes(q) || def.includes(q);
      }

      return true;
    });

    // Update Counter
    if (counterEl) {
      const template = window.YOMU_I18N ? window.YOMU_I18N.t('glossary.counter') : (isEs ? 'Mostrando {count} de 29 términos' : 'Showing {count} of 29 terms');
      counterEl.textContent = template.replace('{count}', filtered.length);
    }

    // Empty state
    if (filtered.length === 0) {
      const noResultsMsg = window.YOMU_I18N ? window.YOMU_I18N.t('glossary.noResults') : (isEs ? 'No se encontraron términos que coincidan con la búsqueda.' : 'No terms matched your search query.');
      grid.innerHTML = `
        <div class="glossary-empty-state" style="grid-column: 1 / -1;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p style="font-size:1rem; margin-top:8px;">${noResultsMsg}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const category = isEs ? item.category_es : item.category_en;
      const definition = isEs ? item.definition_es : item.definition_en;

      return `
        <div class="glossary-card">
          <div class="glossary-card-header">
            <span class="glossary-card-term">${item.term}</span>
            <span class="glossary-card-category">${category}</span>
          </div>
          <p class="glossary-card-def">${definition}</p>
        </div>
      `;
    }).join('');
  }

  function init() {
    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderTerms();
      });
    }

    renderCategories();
    renderTerms();

    window.addEventListener('yomu-lang-changed', () => {
      renderCategories();
      renderTerms();
    });
  }

  window.YOMU_GLOSSARY_VIEWER = {
    init,
    renderCategories,
    renderTerms
  };

  // Backwards compatibility alias
  window.YOMU_GLOSSARY_MODAL = window.YOMU_GLOSSARY_VIEWER;
})();
