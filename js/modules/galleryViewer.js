// Real application screenshot gallery

(function() {
  const categories = [
    { id: "all", label_es: "Todos (10)", label_en: "All (10)" },
    { id: "library", label_es: "📚 Biblioteca & Buscador", label_en: "📚 Library & Search" },
    { id: "activity", label_es: "🔄 Novedades & Historial", label_en: "🔄 Updates & History" },
    { id: "details", label_es: "📖 Ficha & Portadas", label_en: "📖 Series & Covers" },
    { id: "reader", label_es: "👁️ Lector Nativo", label_en: "👁️ Native Reader" },
    { id: "system", label_es: "⚙️ Motor & Ajustes", label_en: "⚙️ Engine & Settings" }
  ];

  const screenshots = [
    {
      id: "library",
      category: "library",
      src: "assets/screenshots/01-library.png",
      tab_es: "📚 Biblioteca",
      tab_en: "📚 Library",
      title_es: "Biblioteca Consolidada & Panel de Inspección",
      title_en: "Consolidated Library & Inspection Panel",
      caption_es: "Cuadrícula fluida con portadas en alta fidelidad cacheadas por Sharp, detección de tomos locales escaneados, panel lateral de previsualización rápida con barra de progreso y selector de carpetas monitorizadas.",
      caption_en: "Fluid grid with high-resolution covers cached via Sharp, scanned local volumes inspection, fast lateral preview panel with reading progress bar, and watched folder manager.",
      meta: "1600 x 960 • Better-SQLite3 • Sharp Pipeline"
    },
    {
      id: "global-catalog",
      category: "library",
      src: "assets/screenshots/02-global-catalog.png",
      tab_es: "🔍 Catálogo 278k",
      tab_en: "🔍 278k Catalog",
      title_es: "Buscador y Catálogo Maestro Desconectado",
      title_en: "Offline Search & Master Catalog (278k)",
      caption_es: "Búsqueda instantánea multi-criterio impulsada por SQLite local sin peticiones web. Filtros por título, autor, tipo (Manga, Manhwa, Manhua), demografía, estado de emisión y puntuación media.",
      caption_en: "Instant multi-criteria search powered by local SQLite without web roundtrips. Filters by title, author, type (Manga, Manhwa, Manhua), demographic, publication status, and average rating.",
      meta: "1600 x 960 • Offline SearchWorker • 278,729 Records"
    },
    {
      id: "updates",
      category: "activity",
      src: "assets/screenshots/03-updates-feed.png",
      tab_es: "🔄 Novedades",
      tab_en: "🔄 Live Updates",
      title_es: "Feed Unificado de Novedades y Marcadores",
      title_en: "Unified Feed of Live Releases & Bookmarks",
      caption_es: "Agregación reactiva de lanzamientos recientes de series seguidas, insignias de nuevos capítulos (+1, Ch. 341), favicons de la fuente de origen y apertura directa en el visor nativo.",
      caption_en: "Reactive aggregation of recent releases for followed series, new chapter counter badges (+1, Ch. 341), source provider favicons, and direct launch into the native reader.",
      meta: "1600 x 960 • Multi-Source Aggregator • Real-Time Badges"
    },
    {
      id: "history",
      category: "activity",
      src: "assets/screenshots/04-history-feed.png",
      tab_es: "📜 Historial",
      tab_en: "📜 Reading History",
      title_es: "Línea de Tiempo del Historial de Lectura",
      title_en: "Reading History Chronological Timeline",
      caption_es: "Registro cronológico de sesiones de lectura con timestamp relativo, porcentaje exacto de lectura, número de páginas completadas y botón de reanudación inmediata con un solo clic.",
      caption_en: "Chronological log of reading sessions with relative timestamps, exact reading percentage, completed pages count, and single-click instant resume action.",
      meta: "1600 x 960 • Session Persistence • Instant Resume"
    },
    {
      id: "details",
      category: "details",
      src: "assets/screenshots/05-details-canonical.png",
      tab_es: "📖 Ficha Canónica",
      tab_en: "📖 Canonical Details",
      title_es: "Ficha Canónica de Detalles y Árbol Multi-Fuente",
      title_en: "Canonical Series Details & Multi-Source Tree",
      caption_es: "Metadatos maestros con sinopsis oficial, etiquetas de géneros, títulos en kanji/romaji y conciliación multi-proveedor de capítulos (MangaDex y MangaNato) con banderas de idioma, tiempos relativos y grupos de traducción.",
      caption_en: "Master metadata featuring official synopsis, genre tags, kanji/romaji titles, and cross-provider chapter reconciliation (MangaDex & MangaNato) with language flags, relative timestamps, and scanlation groups.",
      meta: "1920 x 1032 • Canonical Resolver • Multi-Scraper Tree"
    },
    {
      id: "covers",
      category: "details",
      src: "assets/screenshots/06-details-covers.png",
      tab_es: "🖼️ Portadas",
      tab_en: "🖼️ Cover Gallery",
      title_es: "Galería de Portadas Oficiales y Volúmenes",
      title_en: "Official Volume Covers & Alternate Art Gallery",
      caption_es: "Pestaña dedicada de portadas oficiales de MangaDex con descarga selectiva, cambio de portada activa para la biblioteca personal e inspección a resolución nativa.",
      caption_en: "Dedicated tab for official MangaDex volume covers with selective caching, active custom cover assignment for personal library, and native-resolution inspection.",
      meta: "1600 x 960 • MangaDex Covers API • Dynamic Cache"
    },
    {
      id: "mapping",
      category: "system",
      src: "assets/screenshots/07-mapping-manager.png",
      tab_es: "🔗 Gestor de Mapeo",
      tab_en: "🔗 Source Mapping",
      title_es: "Gestor de Mapeo Interno de Fuentes (Mapping Manager)",
      title_en: "Internal Source Mapping & Overrides Vault",
      caption_es: "Modal de control granular para vincular identificadores canónicos de MangaBaka con fuentes externas (MangaDex UUIDs, MangaNato slugs), verificación de extracción en vivo y resolución manual de conflictos.",
      caption_en: "Granular control modal linking MangaBaka canonical IDs with external providers (MangaDex UUIDs, MangaNato slugs), live scraping test runners, and manual conflict overrides.",
      meta: "1600 x 960 • MappingVault • Zero-Collision Linking"
    },
    {
      id: "reader",
      category: "reader",
      src: "assets/screenshots/08-reader-engine.png",
      tab_es: "👁️ Lector Nativo",
      tab_en: "👁️ Native Reader",
      title_es: "Motor de Lectura de Alto Rendimiento",
      title_en: "High-Performance Native Reader Engine",
      caption_es: "Renderizado fluido continuo sin parpadeos, conmutación instantánea entre Cascada continua, Doble pliego RTL y Modo Simple, HUD flotante desacoplado y filtros de imagen por hardware (Sharp/Crisp/Sepia).",
      caption_en: "Stutter-free fluid continuous rendering, instant toggle between Webtoon cascade, Double-page RTL spread, and Single page mode, floating HUD, and GPU-accelerated image filters.",
      meta: "1600 x 960 • Sharp C++ Pipeline • Hardware Acceleration"
    },
    {
      id: "options",
      category: "system",
      src: "assets/screenshots/09-options-modules.png",
      tab_es: "🧩 Módulos .yomu",
      tab_en: "🧩 .yomu Modules",
      title_es: "Gestión de Módulos .yomu y Red Segura",
      title_en: ".yomu Modules Management & Secure Network",
      caption_es: "Administración de extensiones protegidas en bytecode V8 (.yomu), conmutadores de activación en caliente, soporte de DoH (DNS-over-HTTPS) y configuración de proxy para scraping sigiloso.",
      caption_en: "Administration of V8 bytecode-protected extensions (.yomu), hot-reload toggles, native DoH (DNS-over-HTTPS) support, and proxy routing for stealth scraping.",
      meta: "1600 x 960 • V8 Bytecode Bytenode • DoH Cloudflare/Quad9"
    },
    {
      id: "sync-hub",
      category: "system",
      src: "assets/screenshots/10-sync-hub.png",
      tab_es: "🛰️ Sync Hub",
      tab_en: "🛰️ Sync Hub",
      title_es: "Centro de Sincronización Tri-Tracker en Tiempo Real",
      title_en: "Real-Time Tri-Tracker Synchronization Hub",
      caption_es: "Orquestación y conciliación masiva entre MyAnimeList (781), AniList (1,065) y MangaBaka (1,033) con detección automática de discrepancias de capítulos (Ch. 48 → 49), adición de títulos ausentes y barra de progreso concurrente (88 / 753).",
      caption_en: "Massive cross-cloud orchestration across MyAnimeList (781), AniList (1,065), and MangaBaka (1,033) featuring automatic chapter difference detection (Ch. 48 → 49), missing entries addition, and concurrent progress tracking (88 / 753).",
      meta: "1920 x 1032 • Tri-Tracker Engine • MAL (781) / AL (1065) / MB (1033)"
    }
  ];

  let activeIndex = 0;
  let activeCategory = "all";

  function isSpanish() {
    return (window.YOMU_I18N && typeof window.YOMU_I18N.getLang === 'function') 
      ? window.YOMU_I18N.getLang() === 'es' 
      : true;
  }

  function renderCategories() {
    const isEs = isSpanish();
    const catContainer = document.getElementById('gallery-categories');
    if (!catContainer) return;

    catContainer.innerHTML = categories.map(c => `
      <button class="gallery-cat-btn ${c.id === activeCategory ? 'active' : ''}" data-gallery-cat="${c.id}">
        ${isEs ? c.label_es : c.label_en}
      </button>
    `).join('');

    catContainer.querySelectorAll('.gallery-cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.currentTarget.getAttribute('data-gallery-cat') || 'all';
        // If current active screenshot is not in category, jump to first in category
        const filtered = getFilteredScreenshots();
        if (!filtered.some(s => s.originalIndex === activeIndex)) {
          if (filtered.length > 0) {
            activeIndex = filtered[0].originalIndex;
          }
        }
        renderGallery();
      });
    });
  }

  function getFilteredScreenshots() {
    return screenshots.map((s, idx) => ({ ...s, originalIndex: idx })).filter(s => {
      if (activeCategory === 'all') return true;
      return s.category === activeCategory;
    });
  }

  function renderGallery() {
    if (!document.getElementById('gallery-viewport')) return;
    const isEs = isSpanish();
    renderCategories();

    const tabsContainer = document.getElementById('gallery-tabs');
    const imgEl = document.getElementById('gallery-active-img');
    const titleEl = document.getElementById('gallery-window-title');
    const captionEl = document.getElementById('gallery-caption-text');
    const catEl = document.getElementById('gallery-caption-cat');
    const metaEl = document.getElementById('gallery-caption-meta');
    const counterEl = document.getElementById('gallery-counter');

    const filtered = getFilteredScreenshots();

    if (tabsContainer) {
      tabsContainer.innerHTML = filtered.map(s => `
        <button class="gallery-tab-btn ${s.originalIndex === activeIndex ? 'active' : ''}" data-gallery-idx="${s.originalIndex}">
          ${isEs ? s.tab_es : s.tab_en}
        </button>
      `).join('');

      tabsContainer.querySelectorAll('.gallery-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          activeIndex = parseInt(e.currentTarget.getAttribute('data-gallery-idx'), 10) || 0;
          renderGallery();
        });
      });
    }

    const current = screenshots[activeIndex] || screenshots[0];
    if (imgEl) {
      imgEl.style.opacity = '0.4';
      imgEl.src = current.src;
      imgEl.alt = isEs ? current.title_es : current.title_en;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }
    if (titleEl) {
      titleEl.textContent = `YOMU v3.0 [RESONANCE] — ${(isEs ? current.title_es : current.title_en).toUpperCase()}`;
    }
    if (captionEl) {
      captionEl.textContent = isEs ? current.caption_es : current.caption_en;
    }
    if (catEl) {
      const catObj = categories.find(c => c.id === current.category);
      catEl.textContent = catObj ? (isEs ? catObj.label_es : catObj.label_en) : '';
    }
    if (metaEl) {
      metaEl.textContent = current.meta;
    }
    if (counterEl) {
      const currentPos = String(activeIndex + 1).padStart(2, '0');
      const totalPos = String(screenshots.length).padStart(2, '0');
      counterEl.textContent = `${currentPos} / ${totalPos}`;
    }
  }

  function step(delta) {
    const nextIdx = (activeIndex + delta + screenshots.length) % screenshots.length;
    activeIndex = nextIdx;
    // Update active category if outside current
    const current = screenshots[activeIndex];
    if (activeCategory !== 'all' && current.category !== activeCategory) {
      activeCategory = 'all';
    }
    renderGallery();
  }

  function openLightbox() {
    const isEs = isSpanish();
    const current = screenshots[activeIndex] || screenshots[0];
    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox';
      lightbox.className = 'gallery-lightbox';
      lightbox.innerHTML = `
        <div class="gallery-lightbox-backdrop" id="gallery-lb-backdrop"></div>
        <div class="gallery-lightbox-content">
          <button class="gallery-lightbox-close" id="gallery-lb-close" aria-label="Close">✕</button>
          <img id="gallery-lb-img" class="gallery-lightbox-img" src="" alt="Fullscreen Screenshot">
          <div class="gallery-lightbox-caption" id="gallery-lb-caption"></div>
        </div>
      `;
      document.body.appendChild(lightbox);

      document.getElementById('gallery-lb-close').addEventListener('click', closeLightbox);
      document.getElementById('gallery-lb-backdrop').addEventListener('click', closeLightbox);
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
      });
    }

    const lbImg = document.getElementById('gallery-lb-img');
    const lbCaption = document.getElementById('gallery-lb-caption');
    if (lbImg) lbImg.src = current.src;
    if (lbCaption) {
      lbCaption.textContent = `${isEs ? current.title_es : current.title_en} — ${current.meta}`;
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
    }
    document.body.style.overflow = '';
  }

  function init() {
    renderGallery();
    window.addEventListener('yomu-lang-changed', renderGallery);

    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const zoomBtn = document.getElementById('gallery-zoom');
    const activeImg = document.getElementById('gallery-active-img');

    if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => step(1));
    if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
    if (activeImg) activeImg.addEventListener('click', openLightbox);

    // Keyboard navigation when gallery section is in focus or viewport is hovered
    const viewport = document.getElementById('gallery-viewport');
    if (viewport) {
      viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      });
    }
  }

  window.YOMU_GALLERY_VIEWER = {
    init,
    renderGallery,
    step,
    openLightbox
  };
})();
