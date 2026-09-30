// Legal modal coordinator (Terms & Privacy)

(function() {
  const modal = document.getElementById('legal-modal');
  const closeBtn = document.getElementById('legal-close-btn');
  const tabBtns = document.querySelectorAll('.legal-tab-btn');
  const panes = document.querySelectorAll('.legal-pane');

  function switchTab(tabName) {
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    panes.forEach(pane => {
      pane.classList.toggle('active', pane.dataset.pane === tabName);
    });
  }

  function openModal(defaultTab = 'terms') {
    if (!modal) return;
    switchTab(defaultTab);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    // Triggers in footers or elsewhere
    document.querySelectorAll('[data-open-legal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-open-legal') || 'terms';
        openModal(tab);
      });
    });

    // Tab buttons inside modal
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchTab(tab);
      });
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

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
  }

  window.YOMU_LEGAL_MODAL = {
    init,
    open: openModal,
    close: closeModal,
    switchTab
  };
})();
