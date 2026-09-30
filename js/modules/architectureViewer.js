// Architecture explorer pane and DDL renderer

(function() {
  let activeTab = 'subsystems';
  let activeSubsystemId = 'local-library';

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('[data-arch-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-arch-tab') === tabId);
    });

    const subsystemsPane = document.getElementById('arch-subsystems-pane');
    const databasePane = document.getElementById('arch-database-pane');
    const ipcPane = document.getElementById('arch-ipc-pane');

    if (subsystemsPane) subsystemsPane.style.display = (tabId === 'subsystems') ? 'grid' : 'none';
    if (databasePane) databasePane.style.display = (tabId === 'database') ? 'block' : 'none';
    if (ipcPane) ipcPane.style.display = (tabId === 'ipc') ? 'block' : 'none';
  }

  function selectSubsystem(subsystemId) {
    activeSubsystemId = subsystemId;
    document.querySelectorAll('.arch-nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-subsystem-id') === subsystemId);
    });

    const data = window.YOMU_ARCH_DATA?.subsystems.find(s => s.id === subsystemId);
    if (!data) return;

    const detailPane = document.getElementById('arch-detail-content');
    if (!detailPane) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    const tag = isEs ? data.tag_es : data.tag_en;
    const name = isEs ? data.name_es : data.name_en;
    const purpose = isEs ? data.purpose_es : data.purpose_en;
    const responsibilities = isEs ? data.responsibilities_es : data.responsibilities_en;
    const security = isEs ? data.security_es : data.security_en;
    const performance = isEs ? data.performance_es : data.performance_en;

    const labelResp = isEs ? 'RESPONSABILIDADES & INVARIANTES' : 'RESPONSIBILITIES & INVARIANTS';
    const labelFiles = isEs ? 'ARCHIVOS CLAVE DEL SISTEMA' : 'CORE SYSTEM FILES';
    const labelSec = isEs ? 'SEGURIDAD & SANDBOXING' : 'SECURITY & SANDBOXING';
    const labelPerf = isEs ? 'RENDIMIENTO & MEMORIA' : 'PERFORMANCE & MEMORY';

    detailPane.innerHTML = `
      <div class="arch-detail-header">
        <span class="arch-detail-tag">${tag}</span>
        <h3 class="arch-detail-title">${name}</h3>
        <p class="arch-detail-purpose">${purpose}</p>
      </div>

      <div class="arch-fields-grid">
        <div class="arch-field-card full-width">
          <div class="arch-field-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-primary)">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            ${labelResp}
          </div>
          <ul class="arch-field-list">
            ${responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="arch-field-card full-width">
          <div class="arch-field-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-cyan)">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            ${labelFiles}
          </div>
          <div>
            ${data.keyFiles.map(f => `<span class="arch-file-badge">${f}</span>`).join('')}
          </div>
        </div>

        <div class="arch-field-card" style="border-left: 3px solid var(--accent-primary);">
          <div class="arch-field-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-primary)">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            ${labelSec}
          </div>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">${security}</p>
        </div>

        <div class="arch-field-card" style="border-left: 3px solid var(--accent-cyan);">
          <div class="arch-field-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-cyan)">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            ${labelPerf}
          </div>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">${performance}</p>
        </div>
      </div>
    `;
  }

  function renderSubsystemsList() {
    const nav = document.getElementById('arch-subsystem-nav');
    if (!nav || !window.YOMU_ARCH_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    nav.innerHTML = window.YOMU_ARCH_DATA.subsystems.map(s => {
      const tag = isEs ? s.tag_es : s.tag_en;
      const name = isEs ? s.name_es : s.name_en;
      return `
        <button class="arch-nav-item ${s.id === activeSubsystemId ? 'active' : ''}" data-subsystem-id="${s.id}">
          <span class="arch-nav-tag">${tag}</span>
          <span class="arch-nav-title">${name}</span>
        </button>
      `;
    }).join('');

    nav.querySelectorAll('.arch-nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectSubsystem(e.currentTarget.getAttribute('data-subsystem-id'));
      });
    });

    selectSubsystem(activeSubsystemId);
  }

  function renderDatabasePane() {
    const pane = document.getElementById('arch-database-pane');
    if (!pane || !window.YOMU_ARCH_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    pane.innerHTML = `
      <div class="ddl-pane">
        ${window.YOMU_ARCH_DATA.sqliteSchemas.map(db => {
          const dbName = isEs ? db.dbName_es : db.dbName_en;
          return `
            <div class="ddl-group">
              <h4 class="ddl-group-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-primary)">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
                ${dbName}
              </h4>
              ${db.tables.map(t => `
                <div style="margin-bottom:12px;">
                  <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-secondary); margin-bottom:4px; font-weight:700;">
                    ${isEs ? 'Tabla' : 'Table'}: ${t.name}
                  </div>
                  <pre class="ddl-code-block"><code>${t.ddl}</code></pre>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderIpcPane() {
    const pane = document.getElementById('arch-ipc-pane');
    if (!pane || !window.YOMU_ARCH_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    pane.innerHTML = `
      <div class="ipc-pane">
        <table class="ipc-table">
          <thead>
            <tr>
              <th>${isEs ? 'Canal Preload (ALLOWED_INVOKE)' : 'Preload Channel (ALLOWED_INVOKE)'}</th>
              <th>${isEs ? 'Manejador Modular' : 'Modular Handler'}</th>
              <th>${isEs ? 'Argumentos' : 'Arguments'}</th>
              <th>${isEs ? 'Tipo de Retorno' : 'Return Type'}</th>
              <th>${isEs ? 'Descripción Técnica' : 'Technical Description'}</th>
            </tr>
          </thead>
          <tbody>
            ${window.YOMU_ARCH_DATA.ipcChannels.map(c => `
              <tr>
                <td class="ipc-channel-name">${c.channel}</td>
                <td class="ipc-handler-tag">${c.handler}</td>
                <td><code>${c.args}</code></td>
                <td><code>${c.returns}</code></td>
                <td>${isEs ? c.desc_es : c.desc_en}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function init() {
    document.querySelectorAll('[data-arch-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        switchTab(e.currentTarget.getAttribute('data-arch-tab'));
      });
    });

    renderSubsystemsList();
    renderDatabasePane();
    renderIpcPane();
    switchTab('subsystems');

    window.addEventListener('yomu-lang-changed', () => {
      renderSubsystemsList();
      renderDatabasePane();
      renderIpcPane();
    });
  }

  window.YOMU_ARCH_VIEWER = {
    init,
    switchTab,
    selectSubsystem,
    renderSubsystemsList
  };
})();
