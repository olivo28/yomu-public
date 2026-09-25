// ==========================================================================
// YOMU (ヨム) — Roadmap Viewer Module (Bilingual ES/EN)
// Interactive Milestone Timeline & Phase Filtering (v3.0 to v3.4)
// ==========================================================================

(function() {
  let activeFilter = 'all';

  function filterRoadmap(filter) {
    activeFilter = filter;
    document.querySelectorAll('[data-roadmap-filter]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-roadmap-filter') === filter);
    });

    renderRoadmap();
  }

  function renderRoadmap() {
    const container = document.getElementById('roadmap-timeline-container');
    if (!container || !window.YOMU_ROADMAP_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    const filtered = window.YOMU_ROADMAP_DATA.filter(item => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'beta') return item.status === 'current';
      if (activeFilter === 'planned') return item.status === 'in-progress' || item.status === 'planned';
      return true;
    });

    container.innerHTML = filtered.map(item => {
      const statusLabel = isEs ? item.statusLabel_es : item.statusLabel_en;
      const summary = isEs ? item.summary_es : item.summary_en;
      const deliverables = isEs ? item.deliverables_es : item.deliverables_en;

      return `
        <div class="roadmap-milestone ${item.status}">
          <div class="roadmap-card">
            <div class="roadmap-card-header">
              <div class="roadmap-version-group">
                <span class="roadmap-version">${item.version}</span>
                <span class="roadmap-codename">[${item.codeName}]</span>
                <span class="badge ${item.status === 'current' ? 'badge-emerald' : (item.status === 'in-progress' ? 'badge-amber' : 'badge-indigo')}">
                  <span class="badge-dot"></span>
                  ${statusLabel}
                </span>
              </div>
              <span class="roadmap-timeframe">${item.timeframe}</span>
            </div>

            <p class="roadmap-summary">${summary}</p>

            <ul class="roadmap-deliverables">
              ${deliverables.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }).join('');
  }

  function init() {
    document.querySelectorAll('[data-roadmap-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterRoadmap(e.currentTarget.getAttribute('data-roadmap-filter'));
      });
    });

    renderRoadmap();
    window.addEventListener('yomu-lang-changed', renderRoadmap);
  }

  window.YOMU_ROADMAP_VIEWER = {
    init,
    filterRoadmap
  };
})();
