// Sync Hub simulator module

(function() {
  let isRunning = false;

  function runSimulation() {
    if (isRunning) return;
    isRunning = true;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    const triggerBtn = document.getElementById('sync-trigger-btn');
    const statusBadge = document.getElementById('sync-status-badge');
    const statusText = document.getElementById('sync-status-text');

    if (triggerBtn) triggerBtn.disabled = true;
    if (statusBadge) {
      statusBadge.className = 'sync-status-badge running';
    }
    if (statusText) {
      statusText.textContent = window.YOMU_I18N.t('sync.statusRunning');
    }

    // Nodes
    const nodeLocal = document.getElementById('node-local');
    const nodeMapping = document.getElementById('node-mapping');
    const nodeAniList = document.getElementById('node-anilist');
    const nodeMAL = document.getElementById('node-mal');
    const nodeMB = document.getElementById('node-mb');

    // Reset all nodes
    [nodeLocal, nodeMapping, nodeAniList, nodeMAL, nodeMB].forEach(n => {
      if (n) {
        n.classList.remove('active', 'success');
      }
    });

    // Step 1: Local Reader
    setTimeout(() => {
      if (nodeLocal) {
        nodeLocal.classList.add('active');
        const p = nodeLocal.querySelector('.sync-node-payload');
        if (p) p.textContent = isEs ? 'Cap. 14.5 -> SQLite read_chapters' : 'Ch. 14.5 -> SQLite read_chapters';
      }
    }, 200);

    // Step 2: Mapping Engine
    setTimeout(() => {
      if (nodeLocal) nodeLocal.classList.add('success');
      if (nodeMapping) {
        nodeMapping.classList.add('active');
        const p = nodeMapping.querySelector('.sync-node-payload');
        if (p) p.textContent = isEs ? 'ID MangaBaka #999999991 emparejado' : 'MangaBaka ID #999999991 matched';
      }
    }, 700);

    // Step 3: AniList GraphQL (Accepts decimal)
    setTimeout(() => {
      if (nodeMapping) nodeMapping.classList.add('success');
      if (nodeAniList) {
        nodeAniList.classList.add('active', 'success');
        const p = nodeAniList.querySelector('.sync-node-payload');
        if (p) p.textContent = isEs ? 'Mutación: progress: 14.5 (Decimal OK)' : 'Mutation: progress: 14.5 (Decimal OK)';
      }
    }, 1200);

    // Step 4: MyAnimeList (Truncated with Math.floor)
    setTimeout(() => {
      if (nodeMAL) {
        nodeMAL.classList.add('active', 'success');
        const p = nodeMAL.querySelector('.sync-node-payload');
        if (p) p.textContent = isEs ? 'Math.floor(14.5) -> 14 (Guardado)' : 'Math.floor(14.5) -> 14 (Saved)';
      }
    }, 1700);

    // Step 5: MangaBaka (v1 REST)
    setTimeout(() => {
      if (nodeMB) {
        nodeMB.classList.add('active', 'success');
        const p = nodeMB.querySelector('.sync-node-payload');
        if (p) p.textContent = isEs ? 'REST v1: progress: 14 (Entero OK)' : 'v1 REST: progress: 14 (Integer OK)';
      }
    }, 2200);

    // Step 6: Complete
    setTimeout(() => {
      if (statusBadge) {
        statusBadge.className = 'sync-status-badge success';
      }
      if (statusText) {
        statusText.textContent = window.YOMU_I18N.t('sync.statusSuccess');
      }
      if (triggerBtn) triggerBtn.disabled = false;
      isRunning = false;
    }, 2700);
  }

  function resetNodesToLang() {
    const isEs = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() === 'es' 
      : true;
    const pLocal = document.querySelector('#node-local .sync-node-payload');
    const pMapping = document.querySelector('#node-mapping .sync-node-protocol');
    const pMB = document.querySelector('#node-mb .sync-node-payload');
    if (pLocal) pLocal.textContent = isEs ? 'Capítulo 14.5 leído' : 'Chapter 14.5 read';
    if (pMapping) pMapping.textContent = isEs ? 'Normalización MangaBaka' : 'MangaBaka Normalization';
    if (pMB) pMB.textContent = isEs ? 'progress: 14 (Entero)' : 'progress: 14 (Integer)';
  }

  function init() {
    const triggerBtn = document.getElementById('sync-trigger-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', runSimulation);
    }
    window.addEventListener('yomu-lang-changed', resetNodesToLang);
  }

  window.YOMU_SYNC_SIM = {
    init,
    runSimulation,
    resetNodesToLang
  };
})();
