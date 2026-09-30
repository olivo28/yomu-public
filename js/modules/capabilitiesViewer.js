// Capabilities matrices and engineering ADR cards

(function() {
  function getLangState() {
    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function')
      ? window.YOMU_I18N.getLang()
      : 'es';
    return { lang, isEs: lang === 'es' };
  }

  function renderScrapers() {
    const tbody = document.getElementById('scrapers-tbody');
    if (!tbody || !window.YOMU_CAPABILITIES_DATA?.scrapers) return;
    const { isEs } = getLangState();

    tbody.innerHTML = window.YOMU_CAPABILITIES_DATA.scrapers.map(s => {
      const type = isEs ? s.type_es : s.type_en;
      const search = isEs ? s.search_es : s.search_en;
      const details = isEs ? s.details_es : s.details_en;
      const chapters = isEs ? s.chapters_es : s.chapters_en;
      const pages = isEs ? s.pages_es : s.pages_en;
      const sessions = isEs ? s.sessions_es : s.sessions_en;
      const turnstile = isEs ? s.turnstile_es : s.turnstile_en;

      return `
        <tr>
          <td>
            <div class="matrix-source-name">${s.source}</div>
            <span class="matrix-badge-type">${type}</span>
          </td>
          <td>${search}</td>
          <td>${details}</td>
          <td>${chapters}</td>
          <td>${pages}</td>
          <td>${sessions}</td>
          <td>
            <span class="matrix-status-chip success">
              <span class="chip-dot"></span>
              ${turnstile}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderTrackers() {
    const tbody = document.getElementById('trackers-tbody');
    if (!tbody || !window.YOMU_CAPABILITIES_DATA?.trackers) return;
    const { isEs } = getLangState();

    tbody.innerHTML = window.YOMU_CAPABILITIES_DATA.trackers.map(t => {
      const auth = isEs ? t.auth_es : t.auth_en;
      const decimal = isEs ? t.decimal_es : t.decimal_en;
      const limits = isEs ? t.limits_es : t.limits_en;
      const autoRefresh = isEs ? t.autoRefresh_es : t.autoRefresh_en;
      const syncType = isEs ? t.syncType_es : t.syncType_en;
      const isTruncated = t.name !== 'AniList';

      return `
        <tr>
          <td>
            <div class="matrix-source-name">${t.name}</div>
          </td>
          <td><code>${auth}</code></td>
          <td>
            <span class="matrix-status-chip ${isTruncated ? 'warning' : 'success'}">
              <span class="chip-dot"></span>
              ${decimal}
            </span>
          </td>
          <td><code>${limits}</code></td>
          <td>${autoRefresh}</td>
          <td>${syncType}</td>
        </tr>
      `;
    }).join('');
  }

  function renderContainers() {
    const container = document.getElementById('containers-grid');
    if (!container || !window.YOMU_CAPABILITIES_DATA?.containers) return;
    const { isEs } = getLangState();

    container.innerHTML = window.YOMU_CAPABILITIES_DATA.containers.map(c => {
      const format = isEs ? c.format_es : c.format_en;
      const type = isEs ? c.type_es : c.type_en;
      const streaming = isEs ? c.streaming_es : c.streaming_en;
      const metadata = isEs ? c.metadata_es : c.metadata_en;

      return `
        <div class="container-format-card">
          <div class="container-format-top">
            <span class="container-format-badge">${format}</span>
            <span class="container-format-type">${type}</span>
          </div>
          <div class="container-format-streaming">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--status-emerald)">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ${streaming}
          </div>
          <div class="container-format-meta">${metadata}</div>
        </div>
      `;
    }).join('');
  }

  let activeAdrFilter = 'all';

  function renderEngineeringDecisions() {
    const container = document.getElementById('adr-grid') || document.getElementById('whys-grid');
    if (!container || !window.YOMU_CAPABILITIES_DATA?.engineeringDecisions) return;
    const { isEs } = getLangState();

    const labelChallenge = isEs ? 'El Desafío Técnico' : 'Technical Challenge';
    const labelDecision = isEs ? 'Decisión de Arquitectura' : 'Architectural Decision';

    const filtered = window.YOMU_CAPABILITIES_DATA.engineeringDecisions.filter(d => {
      if (activeAdrFilter === 'all') return true;
      return d.domain === activeAdrFilter;
    });

    container.innerHTML = filtered.map(d => {
      const category = isEs ? d.category_es : d.category_en;
      const title = isEs ? d.title_es : d.title_en;
      const challenge = isEs ? d.challenge_es : d.challenge_en;
      const decision = isEs ? d.decision_es : d.decision_en;
      const metric = isEs ? d.metric_es : d.metric_en;

      return `
        <div class="adr-card" data-domain="${d.domain}">
          <div class="adr-card-top">
            <div class="adr-badge-group">
              <span class="adr-id-badge">${d.adrNumber}</span>
              <span class="adr-category-tag">${category}</span>
            </div>
            <div class="adr-metric-pill">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--status-emerald);"></span>
              <span>${metric}</span>
            </div>
          </div>
          <h3 class="adr-title">${title}</h3>
          
          <div class="adr-panels">
            <div class="adr-panel challenge-panel">
              <div class="adr-panel-label">
                <span>⚠️</span>
                <span>${labelChallenge}</span>
              </div>
              <p class="adr-panel-text">${challenge}</p>
            </div>
            <div class="adr-panel decision-panel">
              <div class="adr-panel-label">
                <span>⚙️</span>
                <span>${labelDecision}</span>
              </div>
              <p class="adr-panel-text">${decision}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderAll() {
    renderScrapers();
    renderTrackers();
    renderContainers();
    renderEngineeringDecisions();
  }

  function init() {
    renderAll();
    window.addEventListener('yomu-lang-changed', renderAll);

    document.querySelectorAll('.adr-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeAdrFilter = e.currentTarget.getAttribute('data-adr-filter') || 'all';
        document.querySelectorAll('.adr-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderEngineeringDecisions();
      });
    });
  }

  window.YOMU_CAPABILITIES_VIEWER = {
    init,
    renderAll,
    renderWhys: renderEngineeringDecisions
  };
})();
