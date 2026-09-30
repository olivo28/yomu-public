// Benchmark comparison table renderer

(function() {
  function renderBenchmarkTable() {
    const tbody = document.getElementById('benchmark-tbody');
    if (!tbody || !window.YOMU_BENCHMARK_DATA) return;

    const lang = (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() 
      : 'es';
    const isEs = lang === 'es';

    tbody.innerHTML = window.YOMU_BENCHMARK_DATA.map(item => {
      const criterion = isEs ? item.criterion_es : item.criterion_en;
      const impact = isEs ? item.impact_es : item.impact_en;
      const yomu = isEs ? item.yomu_es : item.yomu_en;
      const mihon = isEs ? item.mihon_es : item.mihon_en;
      const kavita = isEs ? item.kavita_es : item.kavita_en;
      const web = isEs ? item.web_es : item.web_en;

      const isMihonNeg = mihon.includes('No ') || mihon.includes('Not ') || mihon.includes('Parcial');
      const isKavitaNeg = kavita.includes('No ') || kavita.includes('Not ') || kavita.includes('Solo ');
      const isWebNeg = web.includes('No ') || web.includes('Not ') || web.includes('Invasivos') || web.includes('Heavy');

      return `
        <tr>
          <td>
            <span class="benchmark-criterion-name">${criterion}</span>
            <span class="benchmark-impact-note">${impact}</span>
          </td>
          <td class="col-yomu">
            <span class="benchmark-badge-positive">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              ${yomu}
            </span>
          </td>
          <td>
            <span class="${isMihonNeg ? 'benchmark-badge-negative' : ''}">
              ${mihon}
            </span>
          </td>
          <td>
            <span class="${isKavitaNeg ? 'benchmark-badge-negative' : ''}">
              ${kavita}
            </span>
          </td>
          <td>
            <span class="${isWebNeg ? 'benchmark-badge-negative' : ''}">
              ${web}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  function init() {
    renderBenchmarkTable();
    window.addEventListener('yomu-lang-changed', renderBenchmarkTable);
  }

  window.YOMU_BENCHMARK_VIEWER = {
    init,
    renderBenchmarkTable
  };
})();
