// ==========================================================================
// YOMU (ヨム) — Architecture Data Layer (Bilingual ES/EN)
// The 16 Core User-Facing Subsystems (Brief Sec. 9), SQLite DDLs & IPC Contract
// ==========================================================================

window.YOMU_ARCH_DATA = {
  // 15 Core User-Facing Subsystems
  subsystems: [
    {
      id: "local-library",
      tag_es: "ALMACENAMIENTO",
      tag_en: "STORAGE",
      name_es: "1. Biblioteca Local de Archivos",
      name_en: "1. Local Archive Library",
      purpose_es: "Gestiona tu colección local de mangas y cómics (.cbz, .zip, .cbr, .pdf y carpetas) con síntesis de capítulos virtuales.",
      purpose_en: "Manages your local manga and comic collection (.cbz, .zip, .cbr, .pdf and folders) with virtual chapter synthesis.",
      responsibilities_es: [
        "Escaneo multihilo y registro no destructivo en SQLite (mangas y chapters)",
        "Generación y caché de portadas en alta resolución mediante Sharp/Libvips",
        "Ordenación alfanumérica natural con Intl.Collator para carpetas de imágenes sueltas",
        "Detección y eliminación automática de registros huérfanos al desenlazar carpetas"
      ],
      responsibilities_en: [
        "Multi-threaded scanning and non-destructive SQLite storage (mangas and chapters)",
        "High-resolution cover generation and caching via Sharp/Libvips",
        "Natural alphanumeric sorting via Intl.Collator for loose image folders",
        "Automatic detection and purging of orphaned entries when unlinking folders"
      ],
      keyFiles: ["src/main/ipc/handlers/libraryHandler.js", "src/main/utils/libraryManager.js"],
      security_es: "Validación de rutas canónicas contra saltos de directorio (Path Traversal).",
      security_en: "Canonical path validation preventing directory traversal attacks.",
      performance_es: "Escaneo de más de 100 carpetas en menos de 200ms sin bloquear el hilo principal.",
      performance_en: "Scans over 100 folders in under 200ms without blocking the main event loop."
    },
    {
      id: "reader-engine",
      tag_es: "VISOR",
      tag_en: "VIEWER",
      name_es: "2. Motor de Lectura Híbrido",
      name_en: "2. Hybrid Reading Engine",
      purpose_es: "Motor visual de 60+ FPS para cascada vertical continua (webtoons), pliego doble japonés RTL y página simple.",
      purpose_en: "60+ FPS visual engine for continuous vertical cascade (webtoons), Japanese double-page spread RTL, and single page.",
      responsibilities_es: [
        "Renderizado progresivo con margen de viewport de ±1,200px para erradicar fugas de VRAM",
        "Compensación de paridad de pliego mediante la tecla de acceso rápido 'P'",
        "Restauración inversa de lectura sin saltos de scroll al reanudar a mitad de capítulo",
        "Filtros de GPU ejecutados en shaders (Suavizado, Crisp, Contraste, Invertir, Sepia)"
      ],
      responsibilities_en: [
        "Progressive rendering with ±1,200px viewport margin to eliminate GPU VRAM leaks",
        "Panel spread parity compensation triggered via the 'P' hotkey",
        "Reverse bookmark restoration without scroll jumps when resuming mid-chapter",
        "Hardware-accelerated GPU shader filters (Smooth, Crisp, Contrast, Invert, Sepia)"
      ],
      keyFiles: ["src/renderer/js/components/reader.js", "src/renderer/js/components/reader/"],
      security_es: "Aislamiento estricto de eventos DOM con AbortController al cambiar de vista.",
      security_en: "Strict DOM event isolation via AbortController upon view destruction.",
      performance_es: "Tasa de refresco constante a 60+ FPS en capítulos largos de más de 120 páginas.",
      performance_en: "Rock-solid 60+ FPS frame rates on continuous 120+ page webtoon chapters."
    },
    {
      id: "global-search",
      tag_es: "BÚSQUEDA",
      tag_en: "SEARCH",
      name_es: "3. Búsqueda Global Unificada",
      name_en: "3. Global Unified Search",
      purpose_es: "Cruza búsquedas de texto simultáneas entre el catálogo maestro local y todos los scrapers web instalados.",
      purpose_en: "Performs simultaneous text searches across the local master catalog and all installed scrapers.",
      responsibilities_es: [
        "Búsqueda difusa en milisegundos sobre 80.000+ series de MangaBaka",
        "Despacho paralelo de peticiones de búsqueda hacia extensiones .yomu activas",
        "Deduplicación de resultados idénticos mediante normalización de títulos canónicos",
        "Priorización de obras presentes en la biblioteca local o en lista de seguimiento"
      ],
      responsibilities_en: [
        "Sub-millisecond fuzzy search across 80,000+ MangaBaka series",
        "Parallel search dispatch towards active .yomu scraper extensions",
        "Deduplication of identical titles via canonical work normalization",
        "Prioritization of series present in the local library or followed list"
      ],
      keyFiles: ["src/renderer/js/components/search.js", "src/main/db/modules/dbMangabaka.js"],
      security_es: "Consultas preparadas en SQLite con parámetros vinculados contra inyección SQL.",
      security_en: "SQLite prepared statements with parameter binding preventing SQL injection.",
      performance_es: "4 índices B-Tree dedicados en SQLite reducen la búsqueda difusa a <2ms.",
      performance_en: "4 dedicated B-Tree indexes in SQLite reduce fuzzy search time to <2ms."
    },
    {
      id: "source-discovery",
      tag_es: "DESCUBRIMIENTO",
      tag_en: "DISCOVERY",
      name_es: "4. Descubrimiento y Catálogo Maestro",
      name_en: "4. Source Discovery & Catalog",
      purpose_es: "Exploración estructurada del catálogo de series con filtros por demografía, género, año y estado.",
      purpose_en: "Structured catalog browsing with demographic, genre, year, and publication status filters.",
      responsibilities_es: [
        "Exploración por categorías: Shounen, Seinen, Shoujo, Josei, Manhwa, Webtoon",
        "Filtrado por año de lanzamiento (1970 - 2026) y puntuación de la comunidad",
        "Paginación virtualizada para navegación instantánea sin consumo excesivo de memoria",
        "Acceso directo a fichas técnicas y vinculación con fuentes de lectura"
      ],
      responsibilities_en: [
        "Categorized exploration: Shounen, Seinen, Shoujo, Josei, Manhwa, Webtoon",
        "Filtering by release year (1970 - 2026) and community rating",
        "Virtualized pagination for instant navigation without memory overhead",
        "Direct access to technical sheets and reader source linking"
      ],
      keyFiles: ["src/renderer/js/components/library/LibraryFilters.js", "src/main/db/modules/dbMangabaka.js"],
      security_es: "Base de datos de catálogo abierta exclusivamente en modo solo lectura (readonly: true).",
      security_en: "Catalog database opened exclusively in strict read-only mode (readonly: true).",
      performance_es: "Cero impacto en disco gracias a lecturas directas en caché de memoria.",
      performance_en: "Zero disk wear through direct in-memory cache lookups."
    },
    {
      id: "manga-details",
      tag_es: "METADATOS",
      tag_en: "METADATA",
      name_es: "5. Ficha Técnica y Metadatos",
      name_en: "5. Series Details & Metadata",
      purpose_es: "Vista detallada de cada serie con sinopsis, autores, estado, puntuación y enlaces cruzados a trackers.",
      purpose_en: "In-depth series view with synopsis, creators, status, rating, and cross-tracker links.",
      responsibilities_es: [
        "Visualización de portada maestra oficial de MangaBaka con fallback dinámico",
        "Botones de enlace directo hacia perfiles en AniList, MyAnimeList y MangaBaka",
        "Botón de seguimiento reactivo con selector de estado (Leyendo, Completado, En Pausa)",
        "Control interactivo de progreso de lectura (Capítulo X) con sincronización manual"
      ],
      responsibilities_en: [
        "Display of official MangaBaka master covers with resilient dynamic fallback",
        "Direct deep-link buttons towards AniList, MyAnimeList, and MangaBaka profiles",
        "Reactive follow button with reading status selector (Reading, Completed, On Hold)",
        "Interactive reading progress input (Chapter X) with manual force-sync trigger"
      ],
      keyFiles: ["src/renderer/js/components/details.js", "src/renderer/js/components/details/DetailsMetadata.js"],
      security_es: "Sanitización estricta de cadenas HTML para prevenir inyecciones XSS.",
      security_en: "Strict HTML string sanitization preventing cross-site scripting (XSS).",
      performance_es: "Carga diferida de sinopsis e imágenes para renderizado de vista en <16ms.",
      performance_en: "Deferred rendering of synopsis and covers for sub-16ms view transitions."
    },
    {
      id: "chapter-list",
      tag_es: "CAPÍTULOS",
      tag_en: "CHAPTERS",
      name_es: "6. Lista de Capítulos y Filtros",
      name_en: "6. Chapter Lists & Filtering",
      purpose_es: "Listado completo de capítulos con ordenación ascendente/descendente, filtrado de no leídos y búsqueda.",
      purpose_en: "Complete chapter list with ascending/descending sorting, unread filters, and instant search.",
      responsibilities_es: [
        "Marcado visual inmediato de capítulos leídos (✔) cruzando con la tabla read_chapters",
        "Selector de fuentes activas para alternar entre diferentes grupos de scanlation",
        "Búsqueda numérica instantánea para saltar a un capítulo específico",
        "Lanzamiento directo hacia el motor de lectura con preservación del scroll previo"
      ],
      responsibilities_en: [
        "Instant visual checkmarks (✔) on read chapters cross-referenced with read_chapters",
        "Active source selector to switch between different scanlation releases",
        "Instant numeric chapter search to jump directly to any issue",
        "Direct launch into the reading engine preserving previous view scroll state"
      ],
      keyFiles: ["src/renderer/js/components/details/DetailsChapters.js", "src/renderer/js/components/details/DetailsReaderLauncher.js"],
      security_es: "Atributos dataset estandarizados para validación de tipo numérico seguro.",
      security_en: "Standardized dataset attributes ensuring safe numeric type parsing.",
      performance_es: "Renderizado virtualizado de más de 1.000 capítulos sin ralentizar el DOM.",
      performance_en: "Virtualized DOM rendering of 1,000+ chapter lists with zero lag."
    },
    {
      id: "reading-history",
      tag_es: "HISTORIAL",
      tag_en: "HISTORY",
      name_es: "7. Historial y Aislamiento de Capítulos Leídos",
      name_en: "7. Reading History & Read Marks Isolation",
      purpose_es: "Feed visual de lecturas recientes con desacoplamiento físico entre el historial temporal y las marcas de lectura.",
      purpose_en: "Visual recent activity feed with physical separation between temporary history and permanent read marks.",
      responsibilities_es: [
        "Tabla 'read_chapters' inmutable: los checks ✔ nunca se pierden aunque se limpie el historial",
        "Tabla 'reading_history' con retención automática de 14 días y desduplicación por obra",
        "Asignación prioritaria de la portada maestra de MangaBaka si la remota da error 404",
        "Estructuración de metadata temporal en doble línea limpia (Fecha y Hora exactas)"
      ],
      responsibilities_en: [
        "Immutable 'read_chapters' table: read checkmarks ✔ survive history purges",
        "Temporary 'reading_history' feed with 14-day auto-purge and series deduplication",
        "Priority assignment of MangaBaka master covers over remote 404 scraper covers",
        "Clean two-line temporal metadata layout (Exact Date and Time)"
      ],
      keyFiles: ["src/main/db/modules/dbHistory.js", "src/renderer/js/components/history/HistoryFeed.js"],
      security_es: "Aislamiento transaccional en SQLite evitando pérdidas accidentales de progreso.",
      security_en: "SQLite transactional isolation preventing accidental reading progress data loss.",
      performance_es: "Deduplicación automática por serie manteniendo el feed visual ligero y fluido.",
      performance_en: "Automatic series deduplication keeping the visual history feed fast and responsive."
    },
    {
      id: "updates-feed",
      tag_es: "NOVEDADES",
      tag_en: "UPDATES",
      name_es: "8. Feed de Novedades (Updates)",
      name_en: "8. Updates Feed",
      purpose_es: "Sondeo automatizado en segundo plano para notificar nuevos capítulos de las series que sigues.",
      purpose_en: "Automated background polling notifying new chapters for your followed manga series.",
      responsibilities_es: [
        "Comprobación en segundo plano sin abrir ventanas invasivas de navegador",
        "Encolamiento con prioridad baja para no interferir con la lectura activa",
        "Detección inteligente de capítulos superiores al progreso actual guardado",
        "Notificaciones visuales en la barra lateral con conteo de novedades no leídas"
      ],
      responsibilities_en: [
        "Non-intrusive background checks without opening visible browser windows",
        "Low-priority task queueing preventing interference with active reading",
        "Smart detection of new chapters greater than your current saved progress",
        "Visual sidebar badge notifications with unread chapter count"
      ],
      keyFiles: ["src/renderer/js/components/updates.js", "src/main/core/browser/ScraperQueueManager.js"],
      security_es: "Límite estricto de 2 peticiones simultáneas por dominio para evitar bloqueos por IP.",
      security_en: "Strict 2-request per domain concurrency throttling preventing IP rate limits.",
      performance_es: "Aplazamiento de comprobaciones al arrancar para garantizar inicio instantáneo.",
      performance_en: "Deferred polling during startup ensuring an instantaneous cold boot."
    },
    {
      id: "tracking-services",
      tag_es: "TRACKERS",
      tag_en: "TRACKERS",
      name_es: "9. Integraciones de Seguimiento",
      name_en: "9. Cloud Tracker Integrations",
      purpose_es: "Conexión transparente con AniList (GraphQL), MyAnimeList (PKCE) y MangaBaka.",
      purpose_en: "Seamless synchronization with AniList (GraphQL), MyAnimeList (PKCE), and MangaBaka.",
      responsibilities_es: [
        "Flujo de autenticación OAuth 2.0 con PKCE S256 (sin client secrets expuestos)",
        "Auto-renovación silenciosa de credenciales caducadas ante respuestas HTTP 401",
        "Truncamiento obligatorio con Math.floor() para APIs que rechazan decimales (MAL y MB)",
        "Mapeo automático de estados (Reading, Completed, On Hold, Dropped, Plan to Read)"
      ],
      responsibilities_en: [
        "OAuth 2.0 authentication flow with PKCE S256 (zero client secret exposure)",
        "Silent automatic credential renewal upon encountering HTTP 401 responses",
        "Mandatory Math.floor() truncation for APIs rejecting floating point numbers (MAL and MB)",
        "Automatic reading status mapping (Reading, Completed, On Hold, Dropped, Plan to Read)"
      ],
      keyFiles: ["src/main/core/auth/providers/MALProvider.js", "src/main/core/auth/providers/AnilistProvider.js", "src/main/core/auth/providers/MangabakaProvider.js"],
      security_es: "Cifrado seguro de tokens de actualización en el llavero criptográfico del SO (safeStorage).",
      security_en: "Secure encryption of OAuth refresh tokens using the OS cryptographic vault (safeStorage).",
      performance_es: "Despacho asíncrono en hilo trabajador (SyncWorker) sin congelar la interfaz.",
      performance_en: "Asynchronous worker thread dispatch (SyncWorker) preventing UI freezes."
    },
    {
      id: "sync-hub",
      tag_es: "SINCRONIZACIÓN",
      tag_en: "SYNC HUB",
      name_es: "10. Sync Hub y Motor de Discrepancias",
      name_en: "10. Sync Hub & Discrepancy Engine",
      purpose_es: "Capa de orquestación central que detecta y resuelve diferencias entre lecturas locales y la nube.",
      purpose_en: "Central orchestration layer detecting and resolving differences between local reads and cloud states.",
      responsibilities_es: [
        "Análisis multihilo en segundo plano mediante 'HubAnalyzerWorker.js'",
        "Regla de progresión monotónica: el progreso local nunca se sobreescribe con un valor inferior",
        "Eliminación de falsos positivos: omite series locales sin ID remoto vinculado",
        "Resolución en un clic de discrepancias pendientes con confirmación visual"
      ],
      responsibilities_en: [
        "Multi-threaded background difference analysis via 'HubAnalyzerWorker.js'",
        "Monotonic progression rule: local progress is never downgraded by an older remote state",
        "Zero false positive diffing: automatically skips local series lacking remote service IDs",
        "Single-click discrepancy resolution with clear visual status confirmation"
      ],
      keyFiles: ["src/main/core/sync/syncManager.js", "src/main/core/sync/HubAnalyzerWorker.js"],
      security_es: "Aislamiento de fallos: el error de una API externa no bloquea los demás servicios.",
      security_en: "Fault isolation: third-party API outages do not block other active tracking services.",
      performance_es: "Cálculo diferencial en worker thread desacoplado manteniendo la app a 60 FPS.",
      performance_en: "Decoupled worker thread diff calculations maintaining 60 FPS UI fluidity."
    },
    {
      id: "mapping-vault",
      tag_es: "MAPEOS",
      tag_en: "MAPPING",
      name_es: "11. Bóveda de Mapeos Cruzados",
      name_en: "11. Cross-Source Mapping Vault",
      purpose_es: "Asocia múltiples URLs, slugs y grupos de scanlation externos a una única obra canónica.",
      purpose_en: "Associates multiple external URLs, slugs, and scan releases to a single canonical work.",
      responsibilities_es: [
        "Resolución multidireccional de alias (MangaDex, MangaNato)",
        "Almacenamiento persistente en la tabla 'mappings' de SQLite en formato JSON",
        "Caché en memoria de alto rendimiento para búsquedas y asociaciones instantáneas",
        "Permite leer capítulos de distintas páginas manteniendo un único registro unificado"
      ],
      responsibilities_en: [
        "Multi-directional alias resolution (MangaDex, MangaNato)",
        "Persistent storage in SQLite 'mappings' table formatted as structured JSON",
        "High-performance in-memory cache for instantaneous lookup and association",
        "Allows reading chapters across different websites under a single unified progress record"
      ],
      keyFiles: ["src/main/core/mappingEngine.js", "src/main/core/mappingVault.js"],
      security_es: "Normalización canónica estricta que previene duplicados en los desplegables de mapeo.",
      security_en: "Strict canonical normalization preventing duplicate source entries in mapping pickers.",
      performance_es: "Acceso O(1) en memoria para resolución de fuentes durante la lectura de capítulos.",
      performance_en: "O(1) in-memory resolution of source mappings during active chapter reading."
    },
    {
      id: "module-manager",
      tag_es: "MÓDULOS",
      tag_en: "MODULES",
      name_es: "12. Administrador de Módulos (.yomu)",
      name_en: "12. Module Manager (.yomu)",
      purpose_es: "Gestor del ciclo de vida de extensiones de scraping compiladas en Bytecode V8 con Bytenode.",
      purpose_en: "Lifecycle manager for scraper extensions compiled into V8 Bytecode via Bytenode.",
      responsibilities_es: [
        "Carga dinámica en caliente e invalidación de require.cache al actualizar módulos",
        "Defensas contra ataques Zip Slip durante la descompresión de paquetes .yomu",
        "Activación y desactivación de fuentes individuales sin reiniciar la aplicación",
        "Validación de esquemas de manifiesto (manifest.json) y versiones mínimas de API"
      ],
      responsibilities_en: [
        "Dynamic hot-reloading and require.cache invalidation upon updating extensions",
        "Strict Zip Slip path traversal defenses during .yomu archive decompression",
        "Toggling individual scraper sources on/off without restarting the desktop application",
        "Validation of manifest schemas (manifest.json) and minimum runtime API versions"
      ],
      keyFiles: ["src/main/core/moduleManager.js", "tools/build-modules.js"],
      security_es: "Sanitización obligatoria de moduleId y verificación de rutas de destino autorizadas.",
      security_en: "Mandatory moduleId sanitization and validation of authorized target directories.",
      performance_es: "Ejecución a velocidad nativa sin sobrecarga de transpilación gracias a V8 Bytecode.",
      performance_en: "Native-speed execution without transpilation overhead via compiled V8 Bytecode."
    },
    {
      id: "module-marketplace",
      tag_es: "MARKETPLACE",
      tag_en: "MARKETPLACE",
      name_es: "13. Marketplace Integrado de Módulos",
      name_en: "13. In-App Module Marketplace",
      purpose_es: "Catálogo público curado respaldado por GitHub para descubrir e instalar extensiones con un clic.",
      purpose_en: "Curated public catalog backed by GitHub for one-click extension discovery and installation.",
      responsibilities_es: [
        "Consulta de metadatos de versiones en el registro público 'olivo28/yomu-public'",
        "Descarga segura con guardia de tamaño estricta (máximo 50 MB por paquete)",
        "Notificación automática de actualizaciones disponibles para extensiones instaladas",
        "Modelo de distribución curada: protección del usuario frente a módulos no verificados"
      ],
      responsibilities_en: [
        "Version metadata queries against public registry 'olivo28/yomu-public'",
        "Secure download pipeline with strict 50 MB package size limit",
        "Automatic update notifications for currently installed extensions",
        "Curated distribution model: user protection against unverified third-party code"
      ],
      keyFiles: ["src/main/ipc/handlers/modulesHandler.js", "src/renderer/js/components/options/OptionsModules.js"],
      security_es: "Comprobación estricta de extensiones permitidas (.yomu) y rechazo de archivos corruptos.",
      security_en: "Strict validation of allowed extensions (.yomu) and rejection of malformed archives.",
      performance_es: "Descarga en streaming con limpieza automática de archivos temporales al finalizar.",
      performance_en: "Streaming downloads with automatic cleanup of intermediate temporary files."
    },
    {
      id: "settings-customization",
      tag_es: "AJUSTES",
      tag_en: "SETTINGS",
      name_es: "14. Ajustes y Personalización",
      name_en: "14. Settings & Customization",
      purpose_es: "Configuración granular de red, proveedores de DoH, proxies, preferencias de lectura e interfaz.",
      purpose_en: "Granular configuration of network routing, DoH providers, proxies, and reader ergonomics.",
      responsibilities_es: [
        "Selector de tema visual (Dark Midnight con variables CSS nativas)",
        "Conmutador de proveedor DoH (Cloudflare 1.1.1.1, Google 8.8.8.8 o Sistema)",
        "Configuración de servidores proxy (HTTP/HTTPS/SOCKS5) con credenciales cifradas",
        "Ajuste de margen de cascada predeterminado y dirección de lectura (RTL / LTR)"
      ],
      responsibilities_en: [
        "Visual theme selector (Dark Midnight with native CSS variables)",
        "DoH provider switcher (Cloudflare 1.1.1.1, Google 8.8.8.8, or System DNS)",
        "Proxy gateway configuration (HTTP/HTTPS/SOCKS5) with encrypted credentials",
        "Default cascade margin configuration and reading direction (RTL / LTR)"
      ],
      keyFiles: ["src/renderer/js/components/options.js", "src/main/core/settingsVault.js"],
      security_es: "Credenciales de proxy guardadas bajo cifrado nativo del SO (safeStorage).",
      security_en: "Proxy credentials encrypted in native OS cryptographic storage (safeStorage).",
      performance_es: "Persistencia reactiva en SQLite sin reinicio de la ventana de la aplicación.",
      performance_en: "Reactive SQLite persistence applying setting changes without app reloads."
    },
    {
      id: "network-doh",
      tag_es: "RED & PRIVACIDAD",
      tag_en: "NETWORK & PRIVACY",
      name_es: "15. Pasarela de Red y DoH",
      name_en: "15. Network Gateway & DoH",
      purpose_es: "Resolución cifrada de DNS y proxy de imágenes para rescate de portadas bloqueadas por operadoras.",
      purpose_en: "Encrypted DNS resolution and image proxying for rescuing ISP-blocked manga covers.",
      responsibilities_es: [
        "Consultas DNS cifradas sobre HTTPS a Cloudflare y Google con validación TLS SNI",
        "Patrón PMM (Pre-fetch Manga Module) para rescate de imágenes de CDN bloqueadas regionalmente",
        "Deduplicación en vuelo de peticiones DNS para evitar consultas paralelas redundantes",
        "Fallback transparente al DNS del sistema si los resolvedores remotos no responden"
      ],
      responsibilities_en: [
        "Encrypted DNS queries over HTTPS towards Cloudflare and Google with TLS SNI validation",
        "PMM (Pre-fetch Manga Module) pattern rescuing ISP-blocked manga CDN images",
        "In-flight DNS request deduplication preventing redundant parallel lookups",
        "Transparent fallback towards system DNS resolvers upon network timeouts"
      ],
      keyFiles: ["src/main/core/dohImageProxy.js", "src/main/ipc/handlers/dohHandler.js"],
      security_es: "Cifrado de consultas DNS frente a espionaje o manipulación de operadoras (ISP).",
      security_en: "Encryption of DNS queries preventing ISP eavesdropping and DNS tampering.",
      performance_es: "Caché de resolución TTL en memoria para consultas repetidas en 0ms.",
      performance_en: "In-memory TTL resolution cache resolving repeated queries in 0ms."
    }
  ],

  // Dual SQLite Database DDLs (User Vault & Catalog)
  sqliteSchemas: [
    {
      dbName_es: "yomu_configs.db (Bóveda de Usuario — Modo WAL)",
      dbName_en: "yomu_configs.db (User Vault — WAL Mode)",
      tables: [
        {
          name: "settings",
          ddl: "CREATE TABLE settings (\n  key TEXT PRIMARY KEY,\n  value TEXT NOT NULL\n);"
        },
        {
          name: "read_chapters",
          ddl: "CREATE TABLE read_chapters (\n  manga_id TEXT,\n  chapter_id TEXT,\n  chapter_number REAL,\n  read_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (manga_id, chapter_id)\n);"
        },
        {
          name: "reading_history",
          ddl: "CREATE TABLE reading_history (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  manga_id TEXT NOT NULL,\n  site TEXT NOT NULL,\n  manga_title TEXT NOT NULL,\n  chapter_title TEXT NOT NULL,\n  chapter_number REAL,\n  chapter_url TEXT NOT NULL,\n  cover_url TEXT,\n  read_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);"
        },
        {
          name: "followed_mangas",
          ddl: "CREATE TABLE followed_mangas (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  mb_id INTEGER UNIQUE,\n  title TEXT NOT NULL,\n  cover_url TEXT,\n  status TEXT,\n  progress REAL DEFAULT 0,\n  score REAL DEFAULT 0,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);"
        },
        {
          name: "mappings",
          ddl: "CREATE TABLE mappings (\n  mb_id INTEGER PRIMARY KEY,\n  title TEXT,\n  sources TEXT NOT NULL,\n  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);"
        },
        {
          name: "mangas & chapters (Biblioteca Local)",
          ddl: "CREATE TABLE mangas (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  folder_path TEXT UNIQUE,\n  title TEXT,\n  cover_path TEXT,\n  total_chapters INTEGER\n);\nCREATE TABLE chapters (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  manga_id INTEGER,\n  file_path TEXT UNIQUE,\n  chapter_number REAL,\n  page_count INTEGER,\n  FOREIGN KEY(manga_id) REFERENCES mangas(id) ON DELETE CASCADE\n);"
        }
      ]
    },
    {
      dbName_es: "yomu_mangabaka.db (Catálogo Maestro — Modo Solo Lectura)",
      dbName_en: "yomu_mangabaka.db (Master Catalog — Read-Only Mode)",
      tables: [
        {
          name: "series (80,000+ Obras Normalizadas)",
          ddl: "CREATE TABLE series (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  romaji_title TEXT,\n  alt_titles TEXT,\n  summary TEXT,\n  cover_url TEXT,\n  type TEXT,\n  status TEXT,\n  year INTEGER,\n  rating REAL,\n  genres TEXT,\n  author TEXT,\n  artist TEXT,\n  mal_id INTEGER,\n  anilist_id INTEGER,\n  created_at DATETIME\n);\n-- 4 Índices B-Tree Optimizados:\nCREATE INDEX idx_series_title ON series(title);\nCREATE INDEX idx_series_titles_norm ON series(title COLLATE NOCASE);\nCREATE INDEX idx_series_year ON series(year);\nCREATE INDEX idx_series_type ON series(type);"
        }
      ]
    }
  ],

  // Complete IPC Interface Contract Table (preload.js)
  ipcChannels: [
    { channel: "library:getAll", handler: "libraryHandler.js", args: "none", returns: "Array<Manga>", desc_es: "Obtiene todas las obras de la biblioteca local con conteo de capítulos.", desc_en: "Retrieves all local library manga records with volume and chapter counts." },
    { channel: "library:scanFolder", handler: "libraryHandler.js", args: "folderPath: string", returns: "{ success, count }", desc_es: "Escanea un directorio, extrae metadatos y registra capítulos en SQLite.", desc_en: "Scans directory, extracts archive metadata, and registers chapters in SQLite." },
    { channel: "library:updateProgress", handler: "libraryHandler.js", args: "mangaId, chapter, vol, force", returns: "{ success, skipped? }", desc_es: "Guarda el progreso de lectura y despacha la sincronización a la nube.", desc_en: "Saves reading progress and dispatches cloud tracker sync." },
    { channel: "modules:getAll", handler: "modulesHandler.js", args: "none", returns: "Array<ModuleMeta>", desc_es: "Retorna todos los módulos de scraping .yomu con sus estados activos.", desc_en: "Returns all installed .yomu scraper extensions with active states." },
    { channel: "scrapers:getChapters", handler: "scraperHandler.js", args: "moduleId, mangaUrl", returns: "Array<Chapter>", desc_es: "Obtiene lista de capítulos a través de la cola de alta prioridad.", desc_en: "Fetches chapter list through prioritized queue (high priority)." },
    { channel: "scrapers:getPages", handler: "scraperHandler.js", args: "moduleId, chapterUrl", returns: "Array<Page>", desc_es: "Extrae URLs de imágenes resolviendo scripts DOM o Cloudflare Turnstile.", desc_en: "Resolves image URLs executing DOM scripts or Turnstile bypass." },
    { channel: "sync:updateProgress", handler: "syncHandler.js", args: "mangaId, chapter, force", returns: "{ success, skipped? }", desc_es: "Despacha progreso a AniList, MAL (Math.floor) y MangaBaka.", desc_en: "Dispatches progress to AniList, MAL (Math.floor), and MangaBaka." },
    { channel: "mangabaka:search", handler: "mangabakaHandler.js", args: "query, limit", returns: "Array<Series>", desc_es: "Búsqueda difusa en el catálogo de 80K+ series respaldado por índices B-Tree.", desc_en: "Fuzzy search against 80K+ catalog backed by SQLite B-Tree indexes." },
    { channel: "doh:resolve", handler: "dohHandler.js", args: "hostname: string", returns: "Array<IP>", desc_es: "Resuelve nombres de dominio sobre HTTPS con Cloudflare o Google DoH.", desc_en: "Resolves domain over HTTPS using Cloudflare or Google DoH." }
  ]
};
