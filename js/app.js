// Main application coordinator and scroll spy

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Localization immediately for text rendering
  if (window.YOMU_I18N) window.YOMU_I18N.init();

  // 2. Initialize Interactive Simulators and Viewers asynchronously to avoid UI freeze
  requestAnimationFrame(() => {
    if (window.YOMU_READER_SIM) window.YOMU_READER_SIM.init();
    if (window.YOMU_SYNC_SIM) window.YOMU_SYNC_SIM.init();

    // Secondary components initialized on next frame
    requestAnimationFrame(() => {
      if (window.YOMU_GALLERY_VIEWER) window.YOMU_GALLERY_VIEWER.init();
      if (window.YOMU_ARCH_VIEWER) window.YOMU_ARCH_VIEWER.init();
      if (window.YOMU_CAPABILITIES_VIEWER) window.YOMU_CAPABILITIES_VIEWER.init();
      if (window.YOMU_BENCHMARK_VIEWER) window.YOMU_BENCHMARK_VIEWER.init();
      if (window.YOMU_ROADMAP_VIEWER) window.YOMU_ROADMAP_VIEWER.init();
      if (window.YOMU_GLOSSARY_VIEWER) window.YOMU_GLOSSARY_VIEWER.init();
      else if (window.YOMU_GLOSSARY_MODAL) window.YOMU_GLOSSARY_MODAL.init();
      if (window.YOMU_LEGAL_MODAL) window.YOMU_LEGAL_MODAL.init();
    });
  });

  // 5. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 6. Active Section Scroll Spy (Floating Quick-Nav & Top Nav)
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"], .quick-nav-item[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          const href = item.getAttribute('href');
          item.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  console.info('%c[Yomu]%c Engineering Showcase & Architectural Web loaded. Architecture by Olivo28.', 'color:#6366f1;font-weight:bold;font-size:12px;', 'color:#a0a5b5;');
});
