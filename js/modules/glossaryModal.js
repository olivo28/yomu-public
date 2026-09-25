// ==========================================================================
// YOMU (ヨム) — Architectural Glossary Modal Module (Bilingual ES/EN)
// Interactive 29-Term Search & Dialog Inspector
// ==========================================================================

(function() {
  const modal = document.getElementById('glossary-modal');
  const searchInput = document.getElementById('glossary-search-input');
  const listContainer = document.getElementById('glossary-list-container');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderGlossaryTerms('');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderGlossaryTerms(filterText) {
    if (!listContainer || !window.YOMU_GLOSSARY_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    const query = (filterText || '').toLowerCase().trim();
    const filtered = window.YOMU_GLOSSARY_DATA.filter(item => {
      const cat = (isEs ? item.category_es : item.category_en).toLowerCase();
      const def = (isEs ? item.definition_es : item.definition_en).toLowerCase();
      const term = item.term.toLowerCase();

      if (!query) return true;
      return term.includes(query) || cat.includes(query) || def.includes(query);
    });

    if (filtered.length === 0) {
      const noResultsMsg = isEs 
        ? `No se encontraron términos para "<strong>${filterText}</strong>".`
        : `No terms found matching "<strong>${filterText}</strong>".`;

      listContainer.innerHTML = `
        <div class="glossary-no-results">
          ${noResultsMsg}
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered.map(item => {
      const category = isEs ? item.category_es : item.category_en;
      const definition = isEs ? item.definition_es : item.definition_en;

      return `
        <div class="glossary-item">
          <div class="glossary-item-top">
            <span class="glossary-term">${item.term}</span>
            <span class="glossary-cat-tag">${category}</span>
          </div>
          <p class="glossary-def">${definition}</p>
        </div>
      `;
    }).join('');
  }

  function init() {
    // Open trigger buttons
    document.querySelectorAll('[data-open-glossary]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Close buttons
    const closeBtn = document.getElementById('glossary-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Keyboard Escape listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Real-time search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderGlossaryTerms(e.target.value);
      });
    }

    window.addEventListener('yomu-lang-changed', () => {
      renderGlossaryTerms(searchInput ? searchInput.value : '');
    });
  }

  window.YOMU_GLOSSARY_MODAL = {
    init,
    openModal,
    closeModal,
    renderGlossaryTerms
  };
})();
