/**
 * DATA PORTOFOLIO MUHAMMAD ADRIANSYAH (@seaavey)
 * Semua metrik publik (bintang, follower, jumlah repositori, tanggal)
 * ditandai per tanggal pengambilan: 26 Oktober 2026.
 * Bagian detail yang diinferensi dari konteks teknis pemilik ditandai dengan komentar INFERRED.
 */

export type WorkCategory = "ALL" | "SYSTEMS" | "WEB" | "CONFIG";
export type StackCategory = "ALL" | "FRONTEND" | "BACKEND/SYS" | "LINUX/TOOLS";

export interface ProjectItem {
  id: "A-01" | "A-02" | "A-03" | "A-04" | "A-05" | "A-06";
  title: string;
  category: Exclude<WorkCategory, "ALL">;
  stack: string[];
  stars: number; // per tanggal pengambilan 26 Oktober 2026 (INFERRED distribusi per-repo dari total 32 bintang)
  forks: number; // per tanggal pengambilan 26 Oktober 2026 (INFERRED)
  summary: string;
  capabilities: string[];
  repoUrl: string;
  liveUrl?: string;
  statusNote: string;
}

export interface ProcessPillar {
  index: string;
  title: string;
  label: string;
  metric: string;
  isUnverifiedClaim: boolean;
  claimNote?: string;
  description: string;
}

export interface WorkstationSpecRow {
  parameter: string;
  key: string;
  value: string;
  notes: string;
  inferred?: boolean;
}

export interface StackModule {
  code: string;
  name: string;
  group: Exclude<StackCategory, "ALL">;
  role: string;
  tier: string;
}

export interface LogEntry {
  date: string;
  code: string;
  title: string;
  category: string;
  summary: string;
  inferred?: boolean;
}

export interface GithubBadge {
  id: string;
  title: string;
  tier: string;
  description: string;
  inferred?: boolean;
}

export const SNAPSHOT_DATE_LABEL = "Per tanggal pengambilan 26 Oktober 2026";

export const PROFILE_DATA = {
  wordmark: "( SEAVX )", // Placeholder teks resmi — meminta file logo asli dari pemilik
  name: "Muhammad Adriansyah",
  handle: "@seaavey",
  discipline: "Full Stack Web & Building / Systems Design",
  location: "Bandung, Indonesia",
  coordinates: "6.9175° S, 107.6191° E",
  timezone: "UTC+7 (WIB)",
  email: "owner@seaavey.com",
  githubUrl: "https://github.com/seaavey",
  bio: "Membangun infrastruktur gateway LLM berlatensi rendah, antarmuka web bergaya Swiss brutalist editorial, dan konfigurasi sistem Linux deterministik. Menggabungkan disiplin perancangan bangunan (building design) dengan rekayasa sistem perangkat lunak.",
  githubStats: {
    asOf: SNAPSHOT_DATE_LABEL,
    publicRepos: 8,
    followers: 79,
    stars: 32,
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "A-01",
    title: "SRouter",
    category: "SYSTEMS",
    stack: ["TypeScript", "Node.js", "Edge Runtime", "SSE Streaming", "OpenAI-Compatible"],
    stars: 11, // INFERRED rincian bintang per repo (total agregat profil 32 bintang per 26 Oktober 2026)
    forks: 3, // INFERRED
    summary:
      "Lapisan agregasi dan perutean API LLM multi-provider dengan normalisasi skema, rotasi kredensial, dan fallback otomatis lintas upstream.",
    capabilities: [
      "Perutean berbasis kebijakan (policy-based routing) dengan streaming Server-Sent Events (SSE)",
      "Overhead proxy < 2ms [KLAIM SITUS — BELUM DIVERIFIKASI] pada jalur eksekusi panas",
      "Normalisasi payload kompatibel skema OpenAI untuk beragam penyedia model",
    ],
    repoUrl: "https://github.com/seaavey",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
  {
    id: "A-02",
    title: "SAgent",
    category: "SYSTEMS",
    stack: ["TypeScript", "Node.js", "CLI", "JSON-RPC", "Linux Process Control"],
    stars: 8, // INFERRED
    forks: 2, // INFERRED
    summary:
      "Runtime agen otonom berbasis CLI untuk orkestrasi pemanggilan tool, eksekusi sandboxed command, dan alur kerja rekayasa deterministik.",
    capabilities: [
      "Mesin eksekusi langkah-demi-langkah dengan batas waktu (timeout) terukur",
      "Integrasi pipa standar UNIX (stdin/stdout) dan pencatatan audit JSONL",
      "Pemisahan konteks memori kerja dan validasi skema pemanggilan fungsi ketat",
    ],
    repoUrl: "https://github.com/seaavey",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
  {
    id: "A-03",
    title: "seaavey-bot",
    category: "SYSTEMS",
    stack: ["Node.js", "JavaScript", "Webhooks", "Multi-Provider LLM", "REST API"],
    stars: 5, // INFERRED
    forks: 2, // INFERRED
    summary:
      "Bot otomasi pesan dan dispatcher perintah asinkron yang menghubungkan kanal komunikasi langsung ke pipeline inferensi LLM dan utilitas sistem.",
    capabilities: [
      "Arsitektur plugin modular untuk command handler dan pencari media eksternal",
      "Manajemen sesi percakapan ringan dengan pembatas laju (rate limiter) per pengguna",
      "Fallback otomatis antar endpoint penyedia AI saat terjadi batas kuota",
    ],
    repoUrl: "https://github.com/seaavey",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
  {
    id: "A-04",
    title: "Dotfiles & Hyprland Rice",
    category: "CONFIG",
    stack: ["Hyprland", "Wayland", "Arch Linux", "Waybar", "Neovim Lua", "Zsh"],
    stars: 4, // INFERRED
    forks: 1, // INFERRED
    summary:
      "Konfigurasi workstation Wayland monokromatik bergaya Swiss brutalist dengan fokus pada navigasi keyboard penuh dan efisiensi sumber daya.",
    capabilities: [
      "Tata letak tiling dinamis Hyprland dengan border 1px tegas tanpa efek blur berlebih",
      "Konfigurasi Neovim berbasis Lua dengan LSP, Treesitter, dan waktu mulai < 45ms [KLAIM SITUS — BELUM DIVERIFIKASI]",
      "Skrip bootstrap reproduktif untuk sinkronisasi paket dan tema terminal",
    ],
    repoUrl: "https://github.com/seaavey",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
  {
    id: "A-05",
    title: "Seaavey Web Portfolio",
    category: "WEB",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Lenis", "SVG Schematics"],
    stars: 3, // INFERRED
    forks: 1, // INFERRED
    summary:
      "Sistem antarmuka web portofolio berstruktur grid 12 kolom dengan telemetri scroll waktu nyata, skema warna dwi-tema, dan aksesibilitas WCAG AA.",
    capabilities: [
      "Tipografi fluid menggunakan fungsi CSS clamp() dan garis struktural 1px solid",
      "Dukungan penuh prefers-reduced-motion serta navigasi keyboard menyeluruh",
      "Diagram skematik SVG kustom (FIG 00.A, A-01 s/d A-06) tanpa aset gambar berat",
    ],
    repoUrl: "https://github.com/seaavey",
    liveUrl: "https://seaavey.com",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
  {
    id: "A-06",
    title: "Open Source Contributions",
    category: "WEB",
    stack: ["TypeScript", "React", "Linux Tools", "API Clients", "Documentation"],
    stars: 1, // INFERRED
    forks: 1, // INFERRED
    summary:
      "Kumpulan kontribusi patch, perbaikan bug klien API, modul scraper/integrasi, serta komponen UI terbuka di ekosistem GitHub.",
    capabilities: [
      "Perbaikan kompatibilitas stream parser dan penanganan error jaringan pada klien LLM",
      "Eksperimen komponen antarmuka minimalis tanpa ketergantungan pustaka berat",
      "Dokumentasi teknis dan skrip otomasi pengembangan lintas platform",
    ],
    repoUrl: "https://github.com/seaavey",
    statusNote: "Metrik bintang per 26 Oktober 2026 (INFERRED distribusi repo)",
  },
];

export const PROCESS_PILLARS: ProcessPillar[] = [
  {
    index: "01",
    title: "Gateways & Core",
    label: "LLM ROUTING & BACKEND",
    metric: "LATENCY < 2MS [KLAIM SITUS — BELUM DIVERIFIKASI]",
    isUnverifiedClaim: true,
    claimNote: "Klaim situs asal — belum diverifikasi secara independen.",
    description:
      "Merancang jalur perutean permintaan LLM dan layanan backend dengan overhead minimal, skema kesalahan terstruktur, serta mekanisme failover deterministik.",
  },
  {
    index: "02",
    title: "Swiss Editorial",
    label: "UI / ARCHITECTURE SYSTEM",
    metric: "12-COL GRID • 1PX SOLID",
    isUnverifiedClaim: false,
    description:
      "Menerapkan prinsip ketegasan arsitektur bangunan dan tipografi Neo-Grotesque Swiss: struktur terekspos, hirarki kontras tinggi, dan penghapusan ornamen semu.",
  },
  {
    index: "03",
    title: "Wayland Tiling",
    label: "LINUX WORKSTATION",
    metric: "ZERO-LATENCY KEYFLOW [KLAIM SITUS — BELUM DIVERIFIKASI]",
    isUnverifiedClaim: true,
    claimNote: "Klaim ergonomi workstation situs — belum diverifikasi.",
    description:
      "Lingkungan kerja berbasis kompositor Wayland (Hyprland) dan terminal multiplexer yang dirancang untuk iterasi kode cepat tanpa perpindahan tangan dari papan ketik.",
  },
  {
    index: "04",
    title: "Infrastructure",
    label: "EDGE & RUNTIME DEPLOY",
    metric: "UPTIME 99.9% [KLAIM SITUS — BELUM DIVERIFIKASI]",
    isUnverifiedClaim: true,
    claimNote: "Klaim ketersediaan situs — belum diverifikasi dengan SLA pihak ketiga.",
    description:
      "Penerapan aplikasi web modern berbasis Next.js SSR/Edge dan kontainer Linux yang mudah diaudit, cepat dimuat, serta hemat sumber daya komputasi.",
  },
];

export const WORKSTATION_SPECS: WorkstationSpecRow[] = [
  {
    parameter: "SYS.01",
    key: "OS / KERNEL",
    value: "Arch Linux x86_64 (Linux Zen / Rolling)",
    notes: "Minimal base install • Systemd boot [INFERRED]",
    inferred: true,
  },
  {
    parameter: "SYS.02",
    key: "WINDOW MANAGER",
    value: "Hyprland (Wayland Dynamic Tiling Compositor)",
    notes: "1px monochrome borders • Custom Waybar telemetry",
    inferred: false,
  },
  {
    parameter: "SYS.03",
    key: "SHELL & MULTIPLEXER",
    value: "Zsh + Tmux + Foot / Alacritty Terminal",
    notes: "Vi-mode keybindings • Session persistence [INFERRED]",
    inferred: true,
  },
  {
    parameter: "SYS.04",
    key: "EDITOR / PDE",
    value: "Neovim (Lua Native LSP, Treesitter, Telescope)",
    notes: "Monochrome brutalist colorscheme [INFERRED]",
    inferred: true,
  },
  {
    parameter: "SYS.05",
    key: "JARINGAN / NETWORK",
    value: "Tailscale WireGuard Mesh + DoH Resolver",
    notes: "Low-jitter tunnel untuk pengujian gateway [INFERRED]",
    inferred: true,
  },
  {
    parameter: "SYS.06",
    key: "STACK UTAMA",
    value: "TypeScript, Next.js, React, TailwindCSS, Node.js",
    notes: "Fokus pada Web Systems & LLM API Gateways",
    inferred: false,
  },
];

export const DOTFILES_CLONE_COMMAND =
  "git clone https://github.com/seaavey/dotfiles.git ~/.dotfiles && cd ~/.dotfiles && ./install.sh";

export const TECH_STACK_MODULES: StackModule[] = [
  // FRONTEND (6)
  { code: "M-01", name: "Next.js (App Router)", group: "FRONTEND", role: "SSR & Hybrid Web Framework", tier: "CORE" },
  { code: "M-02", name: "React 19", group: "FRONTEND", role: "UI Component Architecture", tier: "CORE" },
  { code: "M-03", name: "TypeScript", group: "FRONTEND", role: "Static Type System", tier: "CORE" },
  { code: "M-04", name: "TailwindCSS", group: "FRONTEND", role: "Utility-First Brutalist Styling", tier: "CORE" },
  { code: "M-05", name: "Lenis Smooth Scroll", group: "FRONTEND", role: "Kinetic Scroll Engine (lerp 0.08)", tier: "UI/UX" },
  { code: "M-06", name: "Semantic HTML5 & SVG", group: "FRONTEND", role: "Accessible Document & Schematics", tier: "CORE" },

  // BACKEND/SYS (7)
  { code: "M-07", name: "Node.js Runtime", group: "BACKEND/SYS", role: "Asynchronous Server Execution", tier: "CORE" },
  { code: "M-08", name: "LLM Gateway Routing", group: "BACKEND/SYS", role: "Multi-Provider Proxy & Failover", tier: "CORE" },
  { code: "M-09", name: "SSE & WebStreams", group: "BACKEND/SYS", role: "Real-Time Token Streaming", tier: "SYS" },
  { code: "M-10", name: "REST & Webhook APIs", group: "BACKEND/SYS", role: "Service Integration Layer", tier: "CORE" },
  { code: "M-11", name: "PostgreSQL", group: "BACKEND/SYS", role: "Relational Data Store [INFERRED]", tier: "DATA" },
  { code: "M-12", name: "Redis / In-Memory Cache", group: "BACKEND/SYS", role: "Rate Limiting & State [INFERRED]", tier: "DATA" },
  { code: "M-13", name: "Edge / Serverless Functions", group: "BACKEND/SYS", role: "Low-Latency Dispatch", tier: "INFRA" },

  // LINUX/TOOLS (7)
  { code: "M-14", name: "Arch Linux", group: "LINUX/TOOLS", role: "Primary Operating System", tier: "OS" },
  { code: "M-15", name: "Hyprland (Wayland)", group: "LINUX/TOOLS", role: "Tiling Window Compositor", tier: "WM" },
  { code: "M-16", name: "Neovim", group: "LINUX/TOOLS", role: "Keyboard-Centric Code Editor", tier: "TOOL" },
  { code: "M-17", name: "Git & GitHub Workflow", group: "LINUX/TOOLS", role: "Version Control & CI", tier: "TOOL" },
  { code: "M-18", name: "Zsh & POSIX Shell", group: "LINUX/TOOLS", role: "Automation & Build Scripts", tier: "SHELL" },
  { code: "M-19", name: "Tmux", group: "LINUX/TOOLS", role: "Terminal Multiplexing [INFERRED]", tier: "TOOL" },
  { code: "M-20", name: "CAD / Building Design Tools", group: "LINUX/TOOLS", role: "Spatial & Structural Drafting", tier: "DESIGN" },
];

export const ENGINEERING_LOG: LogEntry[] = [
  {
    date: "2026.01",
    code: "LOG-06",
    title: "Rekonstruksi Sistem Portofolio Swiss Brutalist ( SEAVX ) v2.6",
    category: "WEB / DESIGN SYSTEM",
    summary:
      "Pembaruan arsitektur antarmuka 12 kolom dengan diagram skematik SVG terintegrasi, telemetri scroll waktu nyata, dan kepatuhan aksesibilitas WCAG AA.",
  },
  {
    date: "2025.10",
    code: "LOG-05",
    title: "Pengembangan SRouter & Orkestrasi SAgent CLI",
    category: "SYSTEMS / LLM GATEWAY",
    summary:
      "Implementasi perutean multi-provider LLM dengan normalisasi respons streaming dan eksekusi agen berbasis terminal.",
  },
  {
    date: "2025.06",
    code: "LOG-04",
    title: "Iterasi seaavey-bot & Integrasi Multi-Provider AI",
    category: "AUTOMATION / BOT",
    summary:
      "Penyusunan modul bot pesan otomatis dengan dukungan rotasi penyedia model dan manajemen sesi percakapan.",
  },
  {
    date: "2025.02",
    code: "LOG-03",
    title: "Migrasi Penuh Workstation ke Hyprland (Wayland)",
    category: "LINUX / CONFIG",
    summary:
      "Standarisasi dotfiles, bar status minimalis, serta skema warna monokromatik kontras tinggi untuk alur kerja harian.",
  },
  {
    date: "2024.10",
    code: "LOG-02",
    title: "Eksplorasi Tipografi Editorial & Grid Struktural di Web",
    category: "UI / BUILDING DESIGN",
    summary:
      "Translasi prinsip proporsi bangunan dan sistem grid Swiss International Style ke dalam komponen React dan CSS Grid.",
    inferred: true,
  },
  {
    date: "2024.06",
    code: "LOG-01",
    title: "Inisiasi Fondasi Rekayasa Full Stack & Sistem Terbuka",
    category: "FOUNDATION",
    summary:
      "Konsolidasi repositori publik, utilitas otomasi Node.js/Python, dan eksperimen arsitektur web awal di Bandung.",
    inferred: true,
  },
];

export const GITHUB_BADGES: GithubBadge[] = [
  {
    id: "BDG-01",
    title: "PUBLIC REPOSITORIES: 08",
    tier: "VERIFIED SNAPSHOT",
    description: "8 repositori publik aktif tercatat per tanggal pengambilan 26 Oktober 2026.",
  },
  {
    id: "BDG-02",
    title: "NETWORK FOLLOWERS: 79",
    tier: "VERIFIED SNAPSHOT",
    description: "79 pengikut di jaringan GitHub per tanggal pengambilan 26 Oktober 2026.",
  },
  {
    id: "BDG-03",
    title: "STAR TELEMETRY: 32★",
    tier: "VERIFIED SNAPSHOT",
    description: "Total 32 bintang agregat pada repositori publik per tanggal pengambilan 26 Oktober 2026.",
  },
  {
    id: "BDG-04",
    title: "PULL SHARK / OPEN SOURCE",
    tier: "ACHIEVEMENT [INFERRED]",
    description: "Kontribusi kode dan pemeliharaan repositori terbuka lintas proyek [INFERRED].",
    inferred: true,
  },
];
