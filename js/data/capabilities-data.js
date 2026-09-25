// ==========================================================================
// YOMU (ヨム) — Capabilities & System Deep Dives Data
// Scraper Matrix, Tracker Matrix, Local Containers & 10 Architectural ADRs (Bilingual ES/EN)
// ==========================================================================

window.YOMU_CAPABILITIES_DATA = {
  // Scraper Capability Matrix (docs/MODULES.md & Brief Sec. 12)
  scrapers: [
    {
      source: "MangaDex",
      type_es: "API REST v5",
      type_en: "REST API v5",
      search_es: "Nativo (Texto, Filtros, Demografía)",
      search_en: "Native (Text, Filters, Demographics)",
      details_es: "Completo (Sinopsis, Tags, Autores)",
      details_en: "Full (Synopsis, Tags, Authors)",
      chapters_es: "Filtrado por preferencias de la cuenta (idiomas en MangaDex)",
      chapters_en: "Filtered by account preferences (user language settings in MangaDex)",
      pages_es: "CDN Oficial / Data-Saver",
      pages_en: "Official CDN / Data-Saver",
      sessions_es: "OAuth / Token de sesión",
      sessions_en: "OAuth / Session Token",
      turnstile_es: "No requerido (API Pública)",
      turnstile_en: "Not required (Public API)"
    },
    {
      source: "MangaNato",
      type_es: "Extracción DOM",
      type_en: "DOM Scraping",
      search_es: "Scraping de listados HTML",
      search_en: "HTML listing scraping",
      details_es: "Extracción de metadata DOM",
      details_en: "DOM metadata extraction",
      chapters_es: "Lista completa en DOM",
      chapters_en: "Complete DOM list",
      pages_es: "Extracción con Referer específico",
      pages_en: "Extraction with specific Referer",
      sessions_es: "Cookies de sesión HTTP",
      sessions_en: "HTTP session cookies",
      turnstile_es: "Evasión automática en Chromium Worker",
      turnstile_en: "Bypass via Chromium Worker"
    }
  ],

  // Tracker Capability Matrix (docs/TRACKERS.md & Brief Sec. 20)
  trackers: [
    {
      name: "AniList",
      auth_es: "OAuth 2.0 Auth Code + GraphQL",
      auth_en: "OAuth 2.0 Auth Code + GraphQL",
      decimal_es: "Soportado nativamente (ej. 14.5)",
      decimal_en: "Natively supported (e.g. 14.5)",
      states: "CURRENT, COMPLETED, PAUSED, DROPPED, PLANNING",
      limits_es: "90 peticiones / minuto",
      limits_en: "90 requests / minute",
      autoRefresh_es: "Auto-renovación ante 401",
      autoRefresh_en: "Auto-renewal on 401",
      syncType_es: "Bidireccional asíncrono",
      syncType_en: "Asynchronous bidirectional"
    },
    {
      name: "MyAnimeList",
      auth_es: "OAuth 2.0 con PKCE (S256)",
      auth_en: "OAuth 2.0 with PKCE (S256)",
      decimal_es: "Truncamiento obligatorio Math.floor()",
      decimal_en: "Mandatory Math.floor() truncation",
      states: "reading, completed, on_hold, dropped, plan_to_read",
      limits_es: "30 peticiones / minuto (estricto)",
      limits_en: "30 requests / minute (strict)",
      autoRefresh_es: "Renovación vía refresh_token",
      autoRefresh_en: "Renewal via refresh_token",
      syncType_es: "Monotónico (local >= remoto)",
      syncType_en: "Monotonic (local >= remote)"
    },
    {
      name: "MangaBaka",
      auth_es: "OAuth 2.0 v1 REST API",
      auth_en: "OAuth 2.0 v1 REST API",
      decimal_es: "Truncamiento a enteros en endpoint v1",
      decimal_en: "Integer truncation on v1 endpoint",
      states: "Reading, Completed, On Hold, Dropped, Plan to Read",
      limits_es: "60 peticiones / minuto",
      limits_en: "60 requests / minute",
      autoRefresh_es: "Permisos: offline_access, library.read, library.write",
      autoRefresh_en: "Scopes: offline_access, library.read, library.write",
      syncType_es: "Normalización con ping de biblioteca",
      syncType_en: "Library ping normalization"
    }
  ],

  // Local Container Formats (Master Description Sec. 10)
  containers: [
    { format_es: ".cbz / .zip", format_en: ".cbz / .zip", type_es: "Archivo comprimido ZIP", type_en: "ZIP compressed archive", streaming_es: "Descompresión en RAM vía Sharp", streaming_en: "In-memory streaming via Sharp", metadata_es: "ComicInfo.xml", metadata_en: "ComicInfo.xml" },
    { format_es: ".cbr / .rar", format_en: ".cbr / .rar", type_es: "Archivo comprimido RAR", type_en: "RAR compressed archive", streaming_es: "Extracción directa sin archivos temporales", streaming_en: "Direct extraction without temp files", metadata_es: "Filenames / Tags", metadata_en: "Filenames / Tags" },
    { format_es: ".pdf", format_en: ".pdf", type_es: "Documento Portable", type_en: "Portable Document", streaming_es: "Renderizado vía worker PDF.js", streaming_en: "Rendered via PDF.js worker", metadata_es: "Metadatos PDF", metadata_en: "PDF Metadata" },
    { format_es: "Carpetas Sueltas", format_en: "Loose Image Folders", type_es: "Directorio de imágenes", type_en: "Loose image directory", streaming_es: "Síntesis virtual con Intl.Collator", streaming_en: "Virtual synthesis with Intl.Collator", metadata_es: "Ordenación alfanumérica natural", metadata_en: "Natural alphanumeric ordering" }
  ],

  // 10 Architectural Decision Records (ADRs) - Master Architecture & Core Pillars
  engineeringDecisions: [
    // --- Reading Engine Pillar (ADR 01 - 05) ---
    {
      id: "adr-01-buffer",
      adrNumber: "ADR-01",
      domain: "reader",
      category_es: "RENDIMIENTO DOM & VRAM",
      category_en: "DOM PERFORMANCE & VRAM",
      title_es: "Virtualización Acotada con Buffer Progresivo (±1,200px)",
      title_en: "Bounded Progressive Virtualization (±1,200px Buffer)",
      challenge_es: "Los webtoons continuos de más de 100 páginas en alta resolución insertan cientos de nodos <img> simultáneos, saturando la VRAM de la GPU y provocando congelamientos o cierres inesperados por OOM (Out-of-Memory).",
      challenge_en: "Long 100+ page high-resolution webtoons insert hundreds of concurrent <img> elements into the DOM, saturating GPU VRAM and triggering browser tab crashes or severe frame drops.",
      decision_es: "Implementación de desmontaje dinámico de imágenes fuera del margen de ±1,200px respecto al viewport activo, reciclando los elementos DOM mediante IntersectionObserver.",
      decision_en: "Dynamic unmounting of off-screen images outside a ±1,200px viewport margin, recycling DOM nodes via IntersectionObserver to enforce a strict memory ceiling.",
      metric_es: "Renderizado Fluido · Cero VRAM Leak · Buffer de 1,200px",
      metric_en: "Fluid Rendering · Zero VRAM Leak · 1,200px Buffer"
    },
    {
      id: "adr-02-parity",
      adrNumber: "ADR-02",
      domain: "reader",
      category_es: "MAQUETACIÓN MANGA & RTL",
      category_en: "MANGA LAYOUT & RTL",
      title_es: "Compensación de Paridad Oriental en Pliego Doble (Tecla 'P')",
      title_en: "Dynamic Oriental Parity Compensation for Dual Spreads ('P' Key)",
      challenge_es: "El manga tradicional se lee en pliegos dobles de derecha a izquierda. Si el release digital incluye una portada individual de página única, todos los pliegos subsiguientes se desfasan, partiendo ilustraciones dobles a la mitad.",
      challenge_en: "Traditional Japanese manga reads right-to-left in double spreads. When a digital release starts with an odd single cover page, all subsequent double spreads desynchronize, tearing two-page artwork apart.",
      decision_es: "Inyección de un espaciador de compensación en caliente activado con la tecla rápida 'P' o botón de HUD, realineando el flujo RTL instantáneamente sin modificar ni renombrar los archivos en disco.",
      decision_en: "Hot injection of a virtual parity spacer toggled via the 'P' hotkey or HUD button, instantly realigning the oriental RTL spread without altering or renaming user files.",
      metric_es: "Alineación 100% fiel de pliegos · Cero mutación en disco",
      metric_en: "100% Faithful Artwork Alignment · Zero File Mutation"
    },
    {
      id: "adr-03-reverse",
      adrNumber: "ADR-03",
      domain: "reader",
      category_es: "ERGONOMÍA UX & SCROLL",
      category_en: "UX ERGONOMICS & SCROLL",
      title_es: "Restauración Inversa del DOM con Anclaje Bidireccional",
      title_en: "Bi-Directional Inverse DOM Restoration with Scroll Anchoring",
      challenge_es: "Reanudar un webtoon a mitad de lectura obligando a cargar desde la página 1 genera saltos bruscos de scroll (Cumulative Layout Shift), parpadeos blancos y desorientación del usuario.",
      challenge_en: "Resuming reading mid-chapter by rendering from page 1 causes jarring scroll jumps (Cumulative Layout Shift), white flashes, and reader disorientation.",
      decision_es: "Algoritmo de anclaje de lectura que monta las páginas activas hacia abajo y antepone de forma incremental las páginas precedentes hacia arriba sin mover la posición relativa del scroll.",
      decision_en: "Scroll-anchoring layout algorithm that mounts target pages downward while prepending preceding pages upward without shifting the user's relative viewport position.",
      metric_es: "CLS = 0 (Cero saltos visuales) · Reanudación instantánea (0ms)",
      metric_en: "CLS = 0 (Zero Layout Shifts) · 0ms Instant Resume"
    },
    {
      id: "adr-04-shaders",
      adrNumber: "ADR-04",
      domain: "reader",
      category_es: "ACELERACIÓN POR HARDWARE",
      category_en: "HARDWARE ACCELERATION",
      title_es: "Pipeline de Filtros GPU en Sombreadores de Hardware",
      title_en: "GPU Shader Pipeline & Zero-Latency Hardware Compositing",
      challenge_es: "Aplicar filtros de lectura (suavizado bicúbico, crisp pixel-art, alto contraste, inversión nocturna o sepia) mediante la CPU en Canvas o Sharp bloquea el hilo principal y quintuplica el consumo de procesador.",
      challenge_en: "Applying visual reading filters (bicubic smoothing, pixel-art crisp, high contrast, night inversion, sepia) via CPU decoding freezes the main thread and spikes CPU usage.",
      decision_es: "Delegación directa a la matriz de sombreadores de la GPU mediante aceleración por hardware nativa de Chromium, conmutando perfiles en tiempo real sin recodificar bitmaps.",
      decision_en: "Direct delegation to GPU hardware shaders via Chromium compositing, switching visual filter profiles in real time without CPU bitmap re-decoding.",
      metric_es: "Latencia <1ms al alternar perfiles · 0% sobrecarga de CPU",
      metric_en: "Sub-1ms Profile Switching · 0% CPU Overhead"
    },
    {
      id: "adr-05-abort",
      adrNumber: "ADR-05",
      domain: "reader",
      category_es: "GESTIÓN DE PROCESOS & FUGAS",
      category_en: "PROCESS LIFECYCLE & HYGIENE",
      title_es: "Aislamiento Atómico de Ciclo de Vida con AbortController",
      title_en: "Atomic Lifecycle Isolation via AbortController Signals",
      challenge_es: "La navegación rápida entre capítulos o el cierre repentino del visor deja peticiones HTTP pendientes, listeners DOM globales colgantes y descargas de imágenes activas en el vacío.",
      challenge_en: "Rapid chapter hopping or abrupt view switching leaves orphan network requests, dangling global DOM listeners, and active image downloads lingering in background memory.",
      decision_es: "Cada ciclo de montaje del visor instancia un AbortController canónico. Al cambiar de vista se aborta la señal atómicamente, cancelando peticiones y limpiando listeners en un solo paso.",
      decision_en: "Every reader mount cycle binds to a dedicated AbortController signal. On view destruction, the signal aborts atomically, terminating inflight fetches and purging event listeners.",
      metric_es: "Cero llamadas fantasma · Recolección de basura determinista",
      metric_en: "Zero Ghost Network Calls · Deterministic Garbage Collection"
    },

    // --- Chromium Workers Pillar (ADR 06 - 10) ---
    {
      id: "adr-06-turnstile",
      adrNumber: "ADR-06",
      domain: "worker",
      category_es: "BYPASS DE SEGURIDAD",
      category_en: "SECURITY BYPASS",
      title_es: "Evasión Nativa de Desafíos Criptográficos Cloudflare Turnstile",
      title_en: "Autonomous Cloudflare Turnstile Challenge Resolution",
      challenge_es: "Scrapers HTTP planos (Axios, cURL o fetch) son bloqueados de inmediato por barreras Turnstile que exigen la ejecución e interacción real con scripts JavaScript en el cliente.",
      challenge_en: "Plain HTTP scrapers (Axios, cURL, fetch) are instantly blocked by Cloudflare Turnstile barriers that demand authentic client-side JavaScript execution.",
      decision_es: "Instancias de Chromium off-screen que ejecutan las pruebas interactivas en segundo plano y capturan tokens de sesión legítimos para el backend sin intervención del usuario.",
      decision_en: "Off-screen Chromium worker windows executing interactive challenges in the background, harvesting authentic session tokens for backend scrapers without user friction.",
      metric_es: "100% de tasa de extracción sin interacción manual",
      metric_en: "100% Autonomous Bypass Rate · Zero User Prompts"
    },
    {
      id: "adr-07-tls",
      adrNumber: "ADR-07",
      domain: "worker",
      category_es: "REDES SILENCIOSAS",
      category_en: "STEALTH NETWORKING",
      title_es: "Paridad de Huella TLS (JA3) y Cabeceras de Navegación",
      title_en: "Authentic TLS (JA3) Fingerprint & Navigation Header Parity",
      challenge_es: "Sistemas WAF avanzados analizan las huellas de cifrado TLS (ClientHello) de Node.js, bloqueando peticiones automatizadas por discrepancia de huella respecto a navegadores reales.",
      challenge_en: "Modern Web Application Firewalls (WAF) inspect Node.js TLS ClientHello cipher suites, blocking requests due to cryptographic fingerprint mismatches against genuine browsers.",
      decision_es: "Despacho de solicitudes mediante el stack de red nativo de Chromium con perfil mimético de usuario de escritorio y resolución DNS-over-HTTPS (DoH) integrada.",
      decision_en: "Network dispatching through Chromium's native networking stack with realistic desktop browser profiles and integrated DNS-over-HTTPS (DoH) resolution.",
      metric_es: "Huella JA3 idéntica a navegador real · Cero banderas WAF",
      metric_en: "Authentic Browser JA3 Signature · Zero WAF Flags"
    },
    {
      id: "adr-08-canvas",
      adrNumber: "ADR-08",
      domain: "worker",
      category_es: "PROCESAMIENTO DE MEDIOS",
      category_en: "MEDIA PROCESSING",
      title_es: "Desofuscación en Contexto Canvas y Runtime WebAssembly",
      title_en: "In-Browser Canvas & WebAssembly Image Unscrambling",
      challenge_es: "Ciertos distribuidores entregan páginas troceadas o cifradas mediante algoritmos en JavaScript que solo se ensamblan correctamente dentro del lienzo gráfico de un elemento <code>&lt;canvas&gt;</code>.",
      challenge_en: "Certain manga distributors serve scrambled or XOR-encrypted image slices that only assemble into coherent pages within the graphical context of an HTML <code>&lt;canvas&gt;</code> element.",
      decision_es: "El worker de Chromium ejecuta la rutina de ensamblado en su propio contexto gráfico y exporta el buffer de imagen ya reconstruido y limpio para el visor.",
      decision_en: "The off-screen Chromium worker executes the assembly script within its GPU-accelerated canvas context, exporting the reconstructed image buffer to the reader pipeline.",
      metric_es: "Soporte transparente de fuentes cifradas sin ingeniería inversa manual",
      metric_en: "Transparent Scrambled Media Decoding · Zero Manual Re-slicing"
    },
    {
      id: "adr-09-reaping",
      adrNumber: "ADR-09",
      domain: "worker",
      category_es: "HIGIENE DE MEMORIA RAM",
      category_en: "RAM HYGIENE",
      title_es: "Recolección Efímera de Memoria (Ciclo de Auto-Reaping de 20s)",
      title_en: "Ephemeral Memory Reaping (20-Second Idle Reaping Lifecycle)",
      challenge_es: "Mantener ventanas de Chromium activas permanentemente consume entre 800 MB y 1.5 GB de memoria RAM del sistema, degradando el rendimiento general del equipo.",
      challenge_en: "Keeping persistent Chromium instances idle in background memory consumes 800MB to 1.5GB of system RAM, degrading overall desktop system responsiveness.",
      decision_es: "Temporizador de inactividad estricto de 20 segundos que destruye automáticamente los workers ociosos y libera toda su memoria de vuelta al sistema operativo.",
      decision_en: "Strict 20-second idle timer that proactively purges unused worker instances, returning all allocated heap and VRAM back to the host operating system.",
      metric_es: "Ahorro de hasta 1.5 GB de RAM · 0 MB en reposo",
      metric_en: "Reclaims up to 1.5GB RAM · 0MB Resident Footprint at Idle"
    },
    {
      id: "adr-10-hydration",
      adrNumber: "ADR-10",
      domain: "worker",
      category_es: "GESTIÓN DE ESTADO SPA",
      category_en: "SPA STATE MANAGEMENT",
      title_es: "Pre-Inyección de Sesión para SPAs Dinámicas en Cliente",
      title_en: "Early Session Hydration for Client-Side SPAs",
      challenge_es: "Aplicaciones modernas (SPAs en Nuxt/Next) montan sus stores a partir de localStorage. Si la página carga sin credenciales, redirige automáticamente a la pantalla de login.",
      challenge_en: "Modern Single Page Applications (Nuxt/Next) hydrate their state stores from localStorage. Loading protected routes without credentials triggers immediate login redirects.",
      decision_es: "Inyección anticipada de tokens y cookies en el origen de destino (targetOrigin) antes de que el bundle JavaScript de la página comience su ejecución.",
      decision_en: "Pre-injection of auth tokens and localStorage state into the target origin before client JavaScript bundles initialize, ensuring authenticated mounting on the very first frame.",
      metric_es: "Cero rebotes a login · Hidratación inmediata en primer frame",
      metric_en: "Zero Login Bounces · Immediate First-Frame Hydration"
    }
  ]
};

// Aliases for compatibility
window.YOMU_CAPABILITIES_DATA.readerWhys = window.YOMU_CAPABILITIES_DATA.engineeringDecisions.filter(d => d.domain === 'reader');
window.YOMU_CAPABILITIES_DATA.workerReasons = window.YOMU_CAPABILITIES_DATA.engineeringDecisions.filter(d => d.domain === 'worker');
