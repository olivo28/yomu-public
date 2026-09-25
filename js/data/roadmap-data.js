// ==========================================================================
// YOMU (ヨム) — Technical Roadmap Data (Bilingual ES/EN)
// Verified Milestones from v3.0 Resonance Beta to v3.3 P2P LAN Mesh
// ==========================================================================

window.YOMU_ROADMAP_DATA = [
  {
    version: "v3.0.0",
    codeName: "RESONANCE",
    status: "current",
    statusLabel_es: "BETA PRIVADA ACTIVA",
    statusLabel_en: "ACTIVE PRIVATE BETA",
    summary_es: "Arquitectura híbrida fundamental. Bases de datos duales SQLite, sandboxing estricto en Electron, puente IPC de 31 canales y sincronización tri-tracker multicloud unificada.",
    summary_en: "The foundational hybrid architecture. Dual SQLite databases, hardened Electron sandboxing, 31-channel IPC bridge, and unified multi-cloud tracker sync.",
    deliverables_es: [
      "Segmentación dual en SQLite: yomu_configs.db (modo WAL) y yomu_mangabaka.db (modo Solo Lectura)",
      "Motor de lectura de alto rendimiento: Cascada continua Webtoon, Pliego Doble RTL con cambio de paridad 'P' y buffer progresivo de 1200px",
      "ScraperQueueManager con 3 colas de prioridad y límite de 2 peticiones concurrentes por dominio",
      "Grupo de Chromium BrowserWorkers con reaper automático de 20s para bypass de Cloudflare Turnstile",
      "Sync Hub tri-tracker: AniList GraphQL, MyAnimeList PKCE y MangaBaka v1 con truncamiento preventivo Math.floor",
      "Resolvedor cifrado DNS-over-HTTPS (DoH) con soporte para Cloudflare y Google, y cifrado seguro de proxies vía safeStorage",
      "16/16 Suites de pruebas unitarias automatizadas pasando con éxito en menos de 600ms"
    ],
    deliverables_en: [
      "Dual SQLite database sharding: yomu_configs.db (WAL) and yomu_mangabaka.db (Read-Only)",
      "High-performance reading engine: Webtoon continuous vertical, Double Page with 'P' parity shift, and 1200px progressive buffer",
      "ScraperQueueManager with 3 priority tiers and 2-req/host limits",
      "Chromium BrowserWorker pool with 20s idle reaper for Turnstile bypass",
      "3-way cloud tracking hub: AniList GraphQL, MyAnimeList PKCE, and MangaBaka v1 with Math.floor integer truncation",
      "DNS-over-HTTPS (DoH) encrypted resolver with Cloudflare/Google fallback and safeStorage proxy encryption",
      "16/16 Automated Unit Test Suites passing in under 600ms"
    ]
  },
  {
    version: "v3.1.0",
    codeName: "VAULT FORGE",
    status: "in-progress",
    statusLabel_es: "EN DESARROLLO ACTIVO",
    statusLabel_en: "IN ACTIVE DEVELOPMENT",
    summary_es: "Gestor de descargas de capítulos en segundo plano con hilos auxiliares multithreading y empaquetado automático en formato CBZ con ComicInfo.xml.",
    summary_en: "High-speed offline chapter downloader queue with multi-threaded background workers and automatic CBZ archive repackaging.",
    deliverables_es: [
      "Cola de descargas en segundo plano ejecutada en procesos auxiliares utilityProcess",
      "Empaquetado automático en contenedores CBZ con síntesis de metadatos ComicInfo.xml",
      "Flujos de descarga de imágenes reanudables con validación de integridad mediante sumas de verificación",
      "Controles de limitación de ancho de banda y programación de descargas nocturnas por lotes",
      "Ingestión automática en la biblioteca local tras finalizar cada descarga"
    ],
    deliverables_en: [
      "Background download queue manager running in utilityProcess workers",
      "Automatic CBZ container packaging with ComicInfo.xml metadata synthesis",
      "Resumeable multi-part image streams with integrity checksum validation",
      "Bandwidth throttling controls and scheduled overnight batch downloading",
      "Automatic library folder ingestion upon download completion"
    ]
  },
  {
    version: "v3.2.0",
    codeName: "DECK RUNNER",
    status: "planned",
    statusLabel_es: "PLANEADO",
    statusLabel_en: "PLANNED",
    summary_es: "Interfaz de usuario '10-Foot' optimizada para Steam Deck, PCs de mano y mandos de sala con navegación a 60 FPS por botones y gatillos.",
    summary_en: "10-Foot user interface optimized for Steam Deck, handheld PCs, and living room gamepads with 60 FPS controller navigation.",
    deliverables_es: [
      "Navegación completa por gamepad (mapeo nativo para XInput, DualSense y controles de Steam Deck)",
      "Modo UI de 3 metros para televisión con tipografía ampliada, vibración háptica y salto rápido de capítulo en gatillos",
      "Empaquetado AppImage para SteamOS con integración fluida en el Game Mode de Steam Deck",
      "Desplazamiento de webtoons asistido por giroscopio y combinaciones de botones personalizables"
    ],
    deliverables_en: [
      "Full gamepad navigation (XInput / DualSense / Steam Deck native controller mapping)",
      "10-Foot TV UI mode with large typography, haptic feedback, and quick bumper chapter switching",
      "SteamOS AppImage packaging with seamless Steam Deck Game Mode integration",
      "Gyroscope-assisted webtoon scrolling and customized button chords"
    ]
  },
  {
    version: "v3.3.0",
    codeName: "MESH SYNC",
    status: "planned",
    statusLabel_es: "PLANEADO",
    statusLabel_en: "PLANNED",
    summary_es: "Sincronización en malla punto a punto (P2P) entre ordenador de sobremesa, portátil y consola a través de red local (LAN) sin servidores externos.",
    summary_en: "Peer-to-peer local mesh synchronization across desktop, laptop, and handheld devices over LAN without external cloud servers.",
    deliverables_es: [
      "Descubrimiento automático de dispositivos en red local mediante mDNS / Bonjour con cero configuración",
      "Sincronización cifrada TLS punto a punto para historial de lectura, marcadores y capítulos leídos",
      "Sincronización diferencial opcional para capítulos CBZ descargados entre el PC principal y el portátil",
      "Cero dependencia de servidores externos: opera enteramente dentro de tu red Wi-Fi doméstica"
    ],
    deliverables_en: [
      "Zero-config mDNS / Bonjour local network device discovery",
      "Encrypted TLS peer-to-peer sync for reading history, bookmarks, and read_chapters marks",
      "Optional delta sync for downloaded CBZ chapters between home desktop and portable laptop",
      "Zero external server dependence: operates completely inside your home Wi-Fi"
    ]
  }
];
