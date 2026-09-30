// Reader simulator replicating Yomu reader layout

(function() {
  const SAMPLE_PAGES = [
    './assets/sample-pages/page-0.jpg', // Cover
    './assets/sample-pages/page-1.jpg',
    './assets/sample-pages/page-2.jpg',
    './assets/sample-pages/page-3.jpg',
    './assets/sample-pages/page-4.jpg',
    './assets/sample-pages/page-5.jpg'
  ];

  let currentMode = 'webtoon';
  let parityOffset = false;
  let cascadeMargin = 0;
  let activeFilter = 'none';
  let pagedIndex = 0; // Current page index for single/double
  let currentPagesShown = 1;
  let pageHistory = [];

  // Known metadata for sample pages (page 3 is a double spread: 2714 x 1920, ratio 1.41)
  const PAGE_RATIOS = [0.71, 0.71, 0.71, 1.41, 0.71, 0.71];

  const workspace = document.getElementById('reader-workspace');
  const pageIndicator = document.getElementById('reader-page-indicator');
  const optionsPanel = document.getElementById('reader-options-panel');
  const marginSlider = document.getElementById('reader-cascade-margin');
  const marginValDisplay = document.getElementById('val-reader-cascade-margin');
  const parityBtn = document.getElementById('reader-parity-btn');
  const hudTop = document.getElementById('reader-hud-top');

  function isSpanish() {
    return !window.YOMU_I18N || window.YOMU_I18N.getLang() === 'es';
  }

  function isWidePage(idx) {
    if (idx < 0 || idx >= SAMPLE_PAGES.length) return false;
    return (PAGE_RATIOS[idx] || 0.71) > 1.2;
  }

  function setMode(mode) {
    currentMode = mode;
    pagedIndex = 0;
    pageHistory = [];

    document.querySelectorAll('[data-reader-mode]').forEach(btn => {
      btn.classList.toggle('btn-active', btn.getAttribute('data-reader-mode') === mode);
    });

    if (parityBtn) {
      parityBtn.style.display = (mode === 'double') ? 'inline-flex' : 'none';
    }

    renderContent();
  }

  function toggleParity() {
    parityOffset = !parityOffset;
    if (parityBtn) {
      parityBtn.classList.toggle('active', parityOffset);
    }
    if (currentMode === 'double') {
      pageHistory = [];
      pagedIndex = 0;
      renderContent();
    }
  }

  function setCascadeMargin(margin) {
    cascadeMargin = parseInt(margin, 10) || 0;
    if (marginValDisplay) {
      marginValDisplay.textContent = `${cascadeMargin}px`;
    }
    const flow = document.querySelector('.reader-webtoon');
    if (flow) {
      flow.style.gap = `${cascadeMargin}px`;
    }
  }

  function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.side-menu-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-action') === `filter-${filter}`);
    });

    document.querySelectorAll('.reader-image').forEach(img => {
      img.className = img.classList.contains('reader-image-wide') ? 'reader-image reader-image-wide' : 'reader-image';
      if (filter !== 'none') {
        img.classList.add(`filter-${filter}`);
      }
    });
  }

  function toggleOptionsPanel() {
    if (!optionsPanel) return;
    optionsPanel.classList.toggle('open');
  }

  function getFilterClass() {
    return activeFilter === 'none' ? '' : `filter-${activeFilter}`;
  }

  function nextPage() {
    if (currentMode === 'single') {
      if (pagedIndex < SAMPLE_PAGES.length - 1) {
        pageHistory.push(pagedIndex);
        pagedIndex++;
        renderContent();
      }
    } else if (currentMode === 'double') {
      const increment = currentPagesShown || 1;
      if (pagedIndex + increment < SAMPLE_PAGES.length) {
        pageHistory.push(pagedIndex);
        pagedIndex += increment;
        renderContent();
      }
    }
  }

  function prevPage() {
    if (pagedIndex === 0) return;
    if (pageHistory.length > 0) {
      pagedIndex = pageHistory.pop();
    } else {
      pagedIndex = 0;
    }
    renderContent();
  }

  function renderContent() {
    if (!workspace) return;
    workspace.innerHTML = '';
    const isEs = isSpanish();

    if (currentMode === 'webtoon') {
      workspace.className = 'reader-workspace reader-webtoon';
      workspace.style.gap = `${cascadeMargin}px`;

      workspace.innerHTML = SAMPLE_PAGES.map((src, idx) => `
        <img src="${src}" alt="Page ${idx + 1}" class="reader-image ${getFilterClass()}" loading="lazy" data-page-index="${idx + 1}">
      `).join('');

      updatePageIndicator(1, SAMPLE_PAGES.length);

      // Single shared scroll observer for Webtoon mode
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const pageNum = parseInt(e.target.getAttribute('data-page-index'), 10) || 1;
            updatePageIndicator(pageNum, SAMPLE_PAGES.length);
          }
        });
      }, { root: workspace, threshold: 0.35 });

      workspace.querySelectorAll('img').forEach(img => obs.observe(img));

    } else if (currentMode === 'double') {
      workspace.className = 'reader-workspace reader-paged';

      const isWideCurrent = isWidePage(pagedIndex);

      // Smart double logic mirroring Yomu native ReaderLayout.js
      if (isWideCurrent) {
        // Wide panoramic splash page: rendered alone in center
        currentPagesShown = 1;
        workspace.innerHTML = `
          <img src="${SAMPLE_PAGES[pagedIndex]}" alt="Page ${pagedIndex + 1}" class="reader-image reader-image-wide ${getFilterClass()}">
        `;
        updatePageIndicator(`${pagedIndex + 1}`, SAMPLE_PAGES.length);
      } else if (pagedIndex === 0) {
        // Cover page (page 0)
        if (parityOffset) {
          // Parity offset (P): shifts the cover so pages 1-2 spread together
          currentPagesShown = 1;
          const parityTitle = isEs ? 'COMPENSACIÓN DE PARIDAD (P)' : 'SPREAD PARITY (P)';
          const paritySub = isEs ? 'Alineación de pliegos RTL' : 'RTL Spread Alignment';
          workspace.innerHTML = `
            <div class="reader-parity-blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:6px">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <strong style="font-size:0.8rem; color:#fff;">${parityTitle}</strong>
              <p style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">${paritySub}</p>
            </div>
            <img src="${SAMPLE_PAGES[0]}" alt="Cover" class="reader-image ${getFilterClass()}">
          `;
          updatePageIndicator('1', SAMPLE_PAGES.length);
        } else {
          // Standard cover alone centered (authentic ReaderLayout.js line 160)
          currentPagesShown = 1;
          workspace.innerHTML = `
            <img src="${SAMPLE_PAGES[0]}" alt="Cover" class="reader-image ${getFilterClass()}">
          `;
          updatePageIndicator('1', SAMPLE_PAGES.length);
        }
      } else {
        // Regular pages spread
        const rightIdx = pagedIndex;
        const leftIdx = pagedIndex + 1;

        if (leftIdx < SAMPLE_PAGES.length && !isWidePage(leftIdx)) {
          // Pair two normal pages in RTL order: right page on right, left page on left
          currentPagesShown = 2;
          workspace.innerHTML = `
            <img src="${SAMPLE_PAGES[leftIdx]}" alt="Page ${leftIdx + 1}" class="reader-image ${getFilterClass()}">
            <img src="${SAMPLE_PAGES[rightIdx]}" alt="Page ${rightIdx + 1}" class="reader-image ${getFilterClass()}">
          `;
          updatePageIndicator(`${rightIdx + 1}-${leftIdx + 1}`, SAMPLE_PAGES.length);
        } else {
          // Single remaining or next page is wide: show current rightIdx alone
          currentPagesShown = 1;
          workspace.innerHTML = `
            <img src="${SAMPLE_PAGES[rightIdx]}" alt="Page ${rightIdx + 1}" class="reader-image ${getFilterClass()}">
          `;
          updatePageIndicator(`${rightIdx + 1}`, SAMPLE_PAGES.length);
        }
      }

      // Paged click navigation (left 35% next, right 35% prev, center toggle HUD)
      workspace.onclick = (e) => {
        const rect = workspace.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (clickX < width * 0.35) {
          nextPage(); // RTL: left advances
        } else if (clickX > width * 0.65) {
          prevPage(); // RTL: right goes back
        } else {
          if (hudTop) hudTop.classList.toggle('active');
        }
      };

    } else {
      // Single Page Mode
      currentPagesShown = 1;
      workspace.className = 'reader-workspace reader-paged single';

      const isWide = isWidePage(pagedIndex);
      workspace.innerHTML = `
        <img src="${SAMPLE_PAGES[pagedIndex]}" alt="Page ${pagedIndex + 1}" class="reader-image ${isWide ? 'reader-image-wide' : ''} ${getFilterClass()}">
      `;
      updatePageIndicator(pagedIndex + 1, SAMPLE_PAGES.length);

      workspace.onclick = (e) => {
        const rect = workspace.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) {
          nextPage();
        } else {
          prevPage();
        }
      };
    }
  }

  function updatePageIndicator(current, total) {
    if (!pageIndicator) return;
    pageIndicator.textContent = `${current} / ${total}`;
  }

  function init() {
    if (!workspace) return;
    // Mode switcher buttons
    document.querySelectorAll('[data-reader-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setMode(e.currentTarget.getAttribute('data-reader-mode'));
      });
    });

    // Parity toggle
    if (parityBtn) {
      parityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleParity();
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.key === 'p' || e.key === 'P') && currentMode === 'double') {
        toggleParity();
      }
      if (currentMode !== 'webtoon') {
        if (e.key === 'ArrowLeft') nextPage();
        if (e.key === 'ArrowRight') prevPage();
      }
    });

    // Settings button & Options Panel
    const settingsBtn = document.getElementById('reader-hud-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleOptionsPanel();
      });
    }

    // Cascade margin slider
    if (marginSlider) {
      marginSlider.addEventListener('input', (e) => {
        setCascadeMargin(e.target.value);
      });
    }

    // Filter items
    document.querySelectorAll('.side-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = e.currentTarget.getAttribute('data-action');
        const filter = action ? action.replace('filter-', '') : 'none';
        setFilter(filter);
      });
    });

    // Chapter select simulated change
    const chapterSelect = document.getElementById('reader-chapter-select');
    if (chapterSelect) {
      chapterSelect.addEventListener('change', () => {
        if (workspace) workspace.scrollTop = 0;
        pagedIndex = 0;
        renderContent();
      });
    }

    // Back button
    const backBtn = document.getElementById('reader-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (workspace) workspace.scrollTop = 0;
        pagedIndex = 0;
        renderContent();
      });
    }

    window.addEventListener('yomu-lang-changed', renderContent);

    // Initial load: Webtoon mode
    setMode('webtoon');
  }

  window.YOMU_READER_SIM = {
    init,
    setMode,
    toggleParity,
    setCascadeMargin,
    setFilter,
    nextPage,
    prevPage
  };
})();
