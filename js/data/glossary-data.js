// ==========================================================================
// YOMU (ヨム) — Architectural Glossary Data (Bilingual ES/EN)
// 29 Canonical Technical Terms & System Invariants (Master Description Sec. 44)
// ==========================================================================

window.YOMU_GLOSSARY_DATA = [
  {
    term: ".yomu",
    category_es: "Empaquetado & Módulos",
    category_en: "Packaging & Modules",
    definition_es: "Formato de paquete ZIP independiente que encapsula el manifest.json y el bytecode V8 precompilado (index.jsc) para la distribución segura de extensiones de scraping.",
    definition_en: "Standalone ZIP package format encapsulating manifest.json and precompiled V8 bytecode (index.jsc) for scraper extension distribution."
  },
  {
    term: "AbortController",
    category_es: "DOM & Ciclo de Vida",
    category_en: "DOM & Lifecycle",
    definition_es: "Primitiva estándar del navegador empleada en Yomu para cancelar atómicamente escuchadores de eventos y peticiones asíncronas al cambiar de pestaña o destruir vistas, evitando fugas de memoria.",
    definition_en: "Standard web API used by Yomu components to atomically isolate and abort event listeners and asynchronous fetch calls upon tab switching, chapter navigation, or view destruction, preventing memory leaks."
  },
  {
    term: "ADM-ZIP",
    category_es: "Sistema de Archivos",
    category_en: "File System",
    definition_es: "Librería nativa en memoria para Node.js utilizada en el desempaquetado de archivos .cbz y la extracción de paquetes .yomu sin generar archivos temporales en disco.",
    definition_en: "Native in-memory Node.js ZIP archive parser and streamer used for .cbz unpacking and .yomu package extraction without temporary disk writes."
  },
  {
    term: "Bytenode",
    category_es: "Seguridad & Compilación",
    category_en: "Security & Compilation",
    definition_es: "Compilador a nivel de bytecode de V8 que traduce el código JavaScript de los módulos .yomu a binarios .jsc, ofreciendo velocidad nativa y protegiendo la lógica interna contra manipulaciones.",
    definition_en: "V8 bytecode compiler tool used to compile .yomu scraper modules from JavaScript into index.jsc binaries, providing code obfuscation and native-speed execution without exposing raw source logic."
  },
  {
    term: "Obra Canónica (Canonical Work)",
    category_es: "Normalización & Catálogo",
    category_en: "Normalization & Catalog",
    definition_es: "Registro maestro autoritativo en MangaBaka (yomu_mangabaka.db) que unifica títulos de escaneos, alias romanizados, autores y portadas canónicas de múltiples fuentes.",
    definition_en: "Authoritative master series identity in MangaBaka (yomu_mangabaka.db) unifying scan titles, aliases, creators, and canonical covers across platforms."
  },
  {
    term: "CBZ / CBR",
    category_es: "Formatos de Archivo Local",
    category_en: "Local Archive Format",
    definition_es: "Contenedores estándares de la industria del cómic basados en ZIP y RAR. Yomu los descomprime directamente en flujos de memoria mediante Sharp sin tocar el almacenamiento secundario.",
    definition_en: "Standard comic book archives based on ZIP and RAR formats. Yomu decompresses entries directly in memory via Sharp zero-copy streaming without creating temporary uncompressed files on disk."
  },
  {
    term: "ContextBridge",
    category_es: "Seguridad Electron",
    category_en: "Electron Security",
    definition_es: "Frontera de aislamiento estricto en preload.js que expone canales seguros en window.api hacia el renderizador sin dar acceso a primitivas nativas de Node.js (fs, child_process, crypto, better-sqlite3).",
    definition_en: "Hardened isolation layer in preload.js exposing window.api to the renderer without granting direct access to Node.js native primitives (fs, child_process, crypto, better-sqlite3)."
  },
  {
    term: "DoH (DNS-over-HTTPS)",
    category_es: "Red & Privacidad",
    category_en: "Networking & Privacy",
    definition_es: "Consultas DNS cifradas despachadas sobre HTTPS hacia Cloudflare (1.1.1.1) y Google (8.8.8.8) para eludir el bloqueo o envenenamiento de DNS por parte de los proveedores de internet.",
    definition_en: "Encrypted DNS queries dispatched over HTTPS to Cloudflare (1.1.1.1) and Google (8.8.8.8) to bypass ISP DNS censorship and resolve image CDN hostnames without eavesdropping."
  },
  {
    term: "Ghost Window (BrowserWorker)",
    category_es: "Infraestructura de Scrapers",
    category_en: "Scraper Infrastructure",
    definition_es: "Instancia de BrowserWindow de Chromium ejecutada en segundo plano o fuera de pantalla que emula huellas de navegación auténticas para resolver desafíos Cloudflare Turnstile y capturar cookies.",
    definition_en: "Headless or off-screen Chromium BrowserWindow instance mimicking authentic desktop browser fingerprints to solve Cloudflare Turnstile barriers, execute client-side SPAs, and capture session cookies."
  },
  {
    term: "HubAnalyzerWorker",
    category_es: "Multithreading & Sincronización",
    category_en: "Multithreading & Sync",
    definition_es: "Hilo worker_threads en segundo plano dedicado a contrastar los progresos de lectura entre SQLite local y los trackers remotos (AniList, MAL, MangaBaka) sin congelar la interfaz.",
    definition_en: "Dedicated Node.js worker_thread running in the background to calculate reading progress differences across local SQLite and remote cloud trackers (AniList, MAL, MangaBaka) without blocking the UI."
  },
  {
    term: "IntersectionObserver",
    category_es: "Motor de Lectura",
    category_en: "Reading Engine",
    definition_es: "API asíncrona del navegador configurada con un umbral de ±1,200px para montar imágenes en el DOM únicamente cuando se aproximan al viewport y desmontar las páginas lejanas.",
    definition_en: "Browser API configured with a 1,200px progressive margin to mount images into the DOM only when approaching the viewport and unmount off-screen pages, preventing GPU VRAM exhaustion on 100+ page webtoons."
  },
  {
    term: "MangaBaka (MB)",
    category_es: "Normalización & Catálogo",
    category_en: "Normalization & Catalog",
    definition_es: "Catálogo maestro integrado con más de 80,000 obras almacenado en yomu_mangabaka.db (abierto en modo solo lectura) que provee metadatos oficiales y resolución unificada de identidades.",
    definition_en: "Embedded master catalog of >80,000 manga and webtoon titles stored in yomu_mangabaka.db (opened in readonly mode) providing canonical titles, genres, and cross-source identity resolution."
  },
  {
    term: "Mapping Engine",
    category_es: "Normalización & Catálogo",
    category_en: "Normalization & Catalog",
    definition_es: "Subsistema que vincula URLs externas, slugs e identificadores de fuentes (MangaDex, MangaNato) con un identificador único mb_id, permitiendo asociar capítulos de distintos grupos de traducción.",
    definition_en: "Subsystem that resolves external URLs, slugs, and source-specific identifiers (MangaDex, MangaNato) to a single canonical MangaBaka ID, unifying chapter reads across different scanlation releases."
  },
  {
    term: "Mapping Vault",
    category_es: "Almacenamiento & Caché",
    category_en: "Storage & Caching",
    definition_es: "Caché de memoria ultrarrápida y adaptador SQLite que administra los diccionarios bidireccionales entre obras canónicas y los IDs de AniList y MyAnimeList.",
    definition_en: "High-speed in-memory cache and SQLite adapter managing bi-directional mappings between canonical manga records and third-party tracker IDs (AniList ID, MAL ID)."
  },
  {
    term: "Colación Natural (Natural Collation)",
    category_es: "Sistema de Archivos",
    category_en: "File System",
    definition_es: "Algoritmo de ordenación alfanumérica consciente de Unicode con Intl.Collator({ numeric: true }) que garantiza que 'Capítulo 2' preceda a 'Capítulo 10' en carpetas de imágenes sueltas.",
    definition_en: "Alphanumeric string comparison via Intl.Collator({ numeric: true, sensitivity: 'base' }) used to correctly order chapter filenames (e.g. Ch 2.jpg before Ch 10.jpg) without padding errors."
  },
  {
    term: "Arquitectura No-Bundler",
    category_es: "Ingeniería de Renderizado",
    category_en: "Renderer Engineering",
    definition_es: "Estándar de diseño donde los scripts ES6 de Vanilla JS se cargan directamente mediante etiquetas <script> en index.html en estricto orden de dependencias, eliminando sobrecostes de empaquetado.",
    definition_en: "Renderer design standard where Vanilla ES6 scripts are loaded directly via HTML <script> tags in strict dependency order, eliminating Webpack/Vite runtime overhead and bundle bloat."
  },
  {
    term: "Desplazamiento de Paridad (Panel Offset Parity)",
    category_es: "Motor de Lectura",
    category_en: "Reading Engine",
    definition_es: "Mecanismo del visor de lectura activado con la tecla 'P' que inserta un desplazamiento de una página en blanco para alinear los pliegos dobles japoneses desfasados por la portada.",
    definition_en: "Japanese manga reading mode feature triggered by the 'P' hotkey that inserts a blank offset page to ensure two-page spreads align correctly after single cover pages in right-to-left layout."
  },
  {
    term: "PKCE (RFC 7636)",
    category_es: "Autenticación & Seguridad",
    category_en: "Authentication & Security",
    definition_es: "Extensión criptográfica S256 para flujos OAuth 2.0 que previene la interceptación del código de autorización en MyAnimeList sin exponer credenciales de cliente en binarios de escritorio.",
    definition_en: "Proof Key for Code Exchange with SHA-256 code challenge and verifier used for MyAnimeList OAuth 2.0 authentication, eliminating client secret exposure in desktop binaries."
  },
  {
    term: "Renderizado Progresivo de Viewport",
    category_es: "Motor de Lectura",
    category_en: "Reading Engine",
    definition_es: "Técnica de optimización de memoria que mantiene un rango activo de lectura de ±1,200px alrededor del scroll del usuario, garantizando 60+ FPS sin saturar la VRAM de la GPU.",
    definition_en: "Memory management technique that maintains an active reading window of ±1,200px around the user's current scroll position, ensuring ultra-smooth 60+ FPS scrolling regardless of chapter length."
  },
  {
    term: "RAM Watchdog (ResourceManager)",
    category_es: "Rendimiento & Recursos",
    category_en: "Performance & Hygiene",
    definition_es: "Vigilante de memoria en 3 niveles que muestrea el uso cada 10 segundos: Nivel 1 (cierre de ventanas ociosas), Nivel 2 (recorte de workers) y Nivel 3 (purga de portadas en Sharp).",
    definition_en: "Progressive 3-tier memory monitor sampling every 10 seconds: Tier 1 (reaping idle windows), Tier 2 (trimming worker process pool), and Tier 3 (evicting Sharp in-memory cover cache)."
  },
  {
    term: "Restauración Inversa (Reverse Restoration)",
    category_es: "Motor de Lectura",
    category_en: "Reading Engine",
    definition_es: "Técnica de carga que monta de inmediato las imágenes hacia abajo desde el punto guardado y prepende las anteriores hacia arriba sin causar saltos repentinos en el scroll.",
    definition_en: "Bookmark recovery technique that mounts images downwards and prepends previous pages upwards without causing sudden scroll jumps when resuming reading mid-chapter."
  },
  {
    term: "safeStorage",
    category_es: "Seguridad & Cifrado",
    category_en: "Security & Encryption",
    definition_es: "API nativa de Electron vinculada al llavero seguro del sistema operativo (Windows DPAPI, macOS Keychain, Linux Secret Service) para cifrar tokens de sesión y contraseñas de proxy.",
    definition_en: "Electron native API wrapping OS cryptographic vaults (Windows DPAPI, macOS Keychain, Linux Secret Service) to encrypt user OAuth refresh tokens and proxy credentials."
  },
  {
    term: "Cola de Tareas de Scraping (Scraper Task Queue)",
    category_es: "Infraestructura de Scrapers",
    category_en: "Scraper Infrastructure",
    definition_es: "Planificador de peticiones con 3 niveles de prioridad (Lector Interactivo > Navegación > Feeds) con límite de 2 peticiones concurrentes por dominio y reintento con backoff exponencial.",
    definition_en: "Prioritized scheduling queue with 3 tiers (Interactive Reader > Navigation > Background Feed) enforcing a strict 2-request per host limit with exponential backoff (1000ms * 2^attempt)."
  },
  {
    term: "Sharp / Libvips",
    category_es: "Canalización de Imágenes",
    category_en: "Image Pipeline",
    definition_es: "Biblioteca de procesamiento de imágenes nativa en C++ de alta velocidad empleada por el protocolo yomu:// para generación de miniaturas al vuelo y decodificación sin copias.",
    definition_en: "High-performance native C image processing pipeline used by custom protocols (yomu://) for zero-copy thumbnail generation, format transcoding, and downscaling."
  },
  {
    term: "SyncWorker",
    category_es: "Multithreading & Sincronización",
    category_en: "Multithreading & Sync",
    definition_es: "Hilo worker secundario que procesa de forma asíncrona la sincronización de lecturas con AniList, MyAnimeList y MangaBaka aislando las operaciones de red del hilo principal.",
    definition_en: "Dedicated worker thread handling cloud API communications with AniList, MyAnimeList, and MangaBaka, isolating network timeouts from the Electron main process event loop."
  },
  {
    term: "UMWR (Universal Manga & Webtoon Reader)",
    category_es: "Integración con Navegadores",
    category_en: "Browser Integration",
    definition_es: "Userscript para navegadores externos (Chrome, Firefox, Brave) que detecta capítulos leídos en portales web y los abre directamente en Yomu a través del protocolo yomu://open.",
    definition_en: "Userscript running in external desktop browsers (Chrome, Firefox, Edge) that captures active reading sessions and bridges them into Yomu via yomu://open deep links."
  },
  {
    term: "Capítulo de Carpeta Virtual",
    category_es: "Sistema de Archivos",
    category_en: "File System",
    definition_es: "Agrupación dinámica de archivos de imágenes sueltas ubicados en subcarpetas locales para formar capítulos virtuales de lectura sin modificar la estructura original del disco.",
    definition_en: "Dynamic synthesis technique that groups loose image files inside arbitrary subdirectories into virtual reading chapters without modifying the user's original directory structure."
  },
  {
    term: "Modo WAL (Write-Ahead Logging)",
    category_es: "Bases de Datos",
    category_en: "Database Storage",
    definition_es: "Modo de diario en SQLite aplicado a yomu_configs.db que permite lecturas concurrentes ilimitadas mientras ocurren escrituras, impidiendo bloqueos durante escaneos de biblioteca.",
    definition_en: "SQLite journal mode enabled on yomu_configs.db allowing concurrent readers while a write transaction is executing, preventing database locks during continuous library scanning."
  },
  {
    term: "Defensa ZipSlip (ZipSlip Guard)",
    category_es: "Seguridad & Sistema de Archivos",
    category_en: "Security & Filesystem",
    definition_es: "Rutina de validación canónica de rutas durante la extracción de paquetes .yomu y archivos .cbz que rechaza cualquier entrada con secuencias maliciosas '../' para evitar escapes de directorio.",
    definition_en: "Directory traversal defense verifying canonical extraction paths to reject archives with malicious '../' path sequences."
  }
];
