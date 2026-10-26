"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Check,
  Copy,
  GitBranch,
  GitFork,
  Mail,
  Menu,
  Moon,
  RefreshCw,
  ShieldAlert,
  Star,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import {
  DOTFILES_CLONE_COMMAND,
  ENGINEERING_LOG,
  GITHUB_BADGES,
  PROCESS_PILLARS,
  PROFILE_DATA,
  PROJECTS_DATA,
  SNAPSHOT_DATE_LABEL,
  StackCategory,
  TECH_STACK_MODULES,
  WORKSTATION_SPECS,
  WorkCategory,
} from "@/data/portfolio";
import { SchematicSvg } from "@/components/SchematicSvg";

type DynamicViewState = "ready" | "loading" | "empty" | "error";

const NAV_ITEMS = [
  { label: "WORK", href: "#work" },
  { label: "PROCESS", href: "#process" },
  { label: "SPECS", href: "#specs" },
  { label: "STACK", href: "#stack" },
  { label: "LOG", href: "#log" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
] as const;

export function PortfolioClient() {
  // Theme state (dark default #0a0a0a, persisted in localStorage)
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reduced motion state (respects OS prefers-reduced-motion + manual accessibility toggle)
  const [reducedMotion, setReducedMotion] = useState(false);

  // Real-time telemetry state
  const [bandungTime, setBandungTime] = useState<string>("20:05:20 UTC+7");
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [scrollVel, setScrollVel] = useState<number>(0);

  // #work filter & dynamic state
  const [workFilter, setWorkFilter] = useState<WorkCategory>("ALL");
  const [workViewState, setWorkViewState] = useState<DynamicViewState>("ready");

  // #specs copy button state
  const [copiedCommand, setCopiedCommand] = useState(false);

  // #stack filter & dynamic state
  const [stackFilter, setStackFilter] = useState<StackCategory>("ALL");
  const [stackViewState, setStackViewState] = useState<DynamicViewState>("ready");

  // #contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactScope, setContactScope] = useState("LLM_GATEWAY_INFRA");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSimulateError, setContactSimulateError] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactFeedback, setContactFeedback] = useState<string>("");
  const [contactDispatchId, setContactDispatchId] = useState<string>("");

  // Marquee animation refs
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const marqueeOffsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize theme & prefers-reduced-motion listener
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("seavx-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
      document.documentElement.setAttribute(
        "data-reduced-motion",
        mediaQuery.matches ? "true" : "false"
      );
    };
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  // Toggle theme handler
  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("seavx-theme", nextTheme);
  };

  // Toggle reduced motion manually (for testing or user comfort)
  const handleToggleReducedMotion = () => {
    const nextVal = !reducedMotion;
    setReducedMotion(nextVal);
    document.documentElement.setAttribute("data-reduced-motion", nextVal ? "true" : "false");
  };

  // 2. Real-time Bandung UTC+7 clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setBandungTime(`${formatter.format(new Date())} UTC+7`);
      } catch {
        setBandungTime("UTC+7 BANDUNG");
      }
    };
    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  // 3. Lenis smooth scroll (lerp: 0.08) + scroll telemetry + velocity-reactive marquee
  useEffect(() => {
    if (reducedMotion) {
      // Destroy Lenis if active and use native scroll listener without kinetic interpolation
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      setScrollVel(0);
      velocityRef.current = 0;

      const handleNativeScroll = () => {
        const docHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
        setScrollPct(Math.min(100, Math.max(0, progress)));
      };
      handleNativeScroll();
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleNativeScroll);
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number; velocity: number }) => {
      const pct = Math.min(100, Math.max(0, Math.round((e.progress || 0) * 100)));
      const vel = Number((e.velocity || 0).toFixed(2));
      setScrollPct(pct);
      setScrollVel(vel);
      velocityRef.current = e.velocity || 0;
    });

    let rafId = 0;
    const animate = (time: number) => {
      lenis.raf(time);

      // Update footer marquee position based on base speed + scroll velocity
      if (marqueeTrackRef.current) {
        const baseStep = 0.45;
        const velocityBoost = Math.min(Math.abs(velocityRef.current) * 0.35, 8);
        const direction = velocityRef.current < -0.1 ? -1 : 1;
        marqueeOffsetRef.current -= (baseStep + velocityBoost) * direction;

        if (marqueeOffsetRef.current <= -50) {
          marqueeOffsetRef.current += 50;
        } else if (marqueeOffsetRef.current > 0) {
          marqueeOffsetRef.current -= 50;
        }
        marqueeTrackRef.current.style.transform = `translate3d(${marqueeOffsetRef.current}%, 0, 0)`;
      }

      // Decay velocity readout smoothly when idle
      velocityRef.current *= 0.92;
      if (Math.abs(velocityRef.current) < 0.02) {
        velocityRef.current = 0;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Smooth filter handler for #work
  const handleSelectWorkFilter = (category: WorkCategory) => {
    setWorkFilter(category);
    setWorkViewState("ready");
  };

  // Smooth filter handler for #stack
  const handleSelectStackFilter = (group: StackCategory) => {
    setStackFilter(group);
    setStackViewState("ready");
  };

  // Copy command handler
  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(DOTFILES_CLONE_COMMAND);
      setCopiedCommand(true);
      window.setTimeout(() => setCopiedCommand(false), 3000);
    } catch {
      // Fallback copy via textarea
      const textarea = document.createElement("textarea");
      textarea.value = DOTFILES_CLONE_COMMAND;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedCommand(true);
      window.setTimeout(() => setCopiedCommand(false), 3000);
    }
  };

  // Contact form submit handler
  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactStatus("error");
      setContactFeedback("Harap lengkapi seluruh kolom wajib (Nama, Email, dan Spesifikasi Pesan).");
      return;
    }

    setContactStatus("loading");
    setContactFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          scope: contactScope,
          message: contactMessage,
          simulateError: contactSimulateError,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setContactStatus("error");
        setContactFeedback(
          data.error || "Gagal mengirim transmisi. Gunakan tautan email langsung di bawah."
        );
        return;
      }

      setContactStatus("success");
      setContactDispatchId(data.dispatchId || "DSPX-OK");
      setContactFeedback(data.message);
    } catch {
      setContactStatus("error");
      setContactFeedback(
        "Gangguan jaringan saat menghubungi endpoint server. Silakan kirim email langsung ke owner@seaavey.com."
      );
    }
  };

  const filteredProjects =
    workViewState === "empty"
      ? []
      : PROJECTS_DATA.filter((item) =>
          workFilter === "ALL" ? true : item.category === workFilter
        );

  const filteredStack =
    stackViewState === "empty"
      ? []
      : TECH_STACK_MODULES.filter((mod) =>
          stackFilter === "ALL" ? true : mod.group === stackFilter
        );

  return (
    <div className="min-h-screen bg-theme text-theme selection:bg-[var(--color-accent)] selection:text-white">
      {/* Skip Link untuk Navigasi Keyboard */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--color-accent)] focus:text-white focus:px-4 focus:py-3 font-mono text-xs uppercase tracking-widest"
      >
        Lewati ke konten utama
      </a>

      {/* =====================================================================
          1. TOP BAR STICKY (Header + Nav + Telemetry + Invert Theme)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-theme border-b border-grid">
        {/* Sub-bar Telemetri Dekoratif (aria-hidden karena murni dekoratif) */}
        <div
          aria-hidden="true"
          className="border-b border-grid px-4 lg:px-8 py-1.5 text-[11px] font-mono tracking-wider uppercase flex flex-wrap items-center justify-between gap-2 text-muted"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`inline-block w-2 h-2 bg-[var(--color-accent)] ${
                  reducedMotion ? "" : "animate-pulse"
                }`}
              />
              <span>SYS.ONLINE // BANDUNG</span>
            </span>
            <span className="hidden sm:inline">COORD: {PROFILE_DATA.coordinates}</span>
            <span>LOC.TIME: {bandungTime}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>SCROLL: {String(scrollPct).padStart(3, "0")}%</span>
            <span className="hidden md:inline">
              VEL: {reducedMotion ? "0.00 (REDUCED-MOTION)" : `${scrollVel.toFixed(2)} PX/F`}
            </span>
            <span className="hidden lg:inline">GRID: 12-COL // 1PX SOLID</span>
          </div>
        </div>

        {/* Bar Navigasi Utama */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 items-stretch">
          {/* Wordmark Placeholder */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 border-r border-grid flex items-center px-4 lg:px-6 py-2">
            <a
              href="#top"
              className="touch-target inline-flex flex-col justify-center font-mono font-bold tracking-tighter text-base lg:text-lg"
              aria-label="Muhammad Adriansyah ( SEAVX ) — Kembali ke atas"
            >
              <span>{PROFILE_DATA.wordmark}</span>
              <span className="text-[10px] font-normal text-muted tracking-widest uppercase">
                WORDMARK PLACEHOLDER
              </span>
            </a>
          </div>

          {/* Menu Anchor Desktop */}
          <nav
            aria-label="Navigasi bagian utama"
            className="hidden lg:flex lg:col-span-7 border-r border-grid items-stretch"
          >
            <ul className="w-full grid grid-cols-7">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-r last:border-r-0 border-grid flex">
                  <a
                    href={item.href}
                    className="touch-target w-full flex items-center justify-center font-mono text-xs tracking-widest uppercase hover:bg-surface transition-colors px-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontrol Tema & Aksesibilitas & Tombol Menu Mobile */}
          <div className="col-span-6 sm:col-span-8 lg:col-span-3 flex items-stretch justify-end">
            <button
              type="button"
              onClick={handleToggleReducedMotion}
              className="touch-target hidden sm:inline-flex items-center justify-center gap-1.5 px-3 border-r border-grid font-mono text-[11px] uppercase tracking-wider hover:bg-surface transition-colors"
              aria-pressed={reducedMotion}
              title="Aktifkan atau nonaktifkan mode pengurangan gerak (Reduced Motion)"
            >
              <span>MOTION: {reducedMotion ? "OFF" : "ON"}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleTheme}
              className="touch-target flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 border-r lg:border-r-0 border-grid font-mono text-xs uppercase tracking-wider hover:bg-surface transition-colors cursor-pointer"
              aria-label={`Invert Theme (Saat ini tema ${theme === "dark" ? "gelap" : "terang"})`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span>Invert Theme</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="touch-target lg:hidden inline-flex items-center justify-center gap-1.5 px-4 font-mono text-xs uppercase tracking-wider hover:bg-surface transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" aria-hidden="true" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Drawer Navigasi Mobile */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="Navigasi utama perangkat seluler"
            className="lg:hidden border-t border-grid bg-theme"
          >
            <ul className="grid grid-cols-1 divide-y divide-[var(--color-border)]">
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="touch-target flex items-center justify-between px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-surface"
                  >
                    <span>
                      0{idx + 1}. {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="px-6 py-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-muted">MODE REDUCED MOTION</span>
                <button
                  type="button"
                  onClick={handleToggleReducedMotion}
                  className="touch-target px-3 py-2 border border-grid font-mono text-xs uppercase"
                  aria-pressed={reducedMotion}
                >
                  {reducedMotion ? "NONAKTIF (REDUCED)" : "AKTIF (SMOOTH)"}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* =====================================================================
          MAIN LANDMARK
         ===================================================================== */}
      <main id="main-content" className="max-w-[1600px] mx-auto border-x border-grid">
        {/* ===================================================================
            2. HERO / PROFIL SECTION
           =================================================================== */}
        <section
          id="top"
          aria-labelledby="hero-heading"
          className="grid grid-cols-1 lg:grid-cols-12 border-b border-grid"
        >
          {/* Kolom Kiri (7 Kolom): Identitas, Disiplin, Bio, CTA */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-grid p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="px-2 py-1 border border-grid text-theme">
                  INDEX // 00 — PROFILE
                </span>
                <span>{PROFILE_DATA.handle}</span>
                <span>•</span>
                <span>{PROFILE_DATA.location}</span>
              </div>

              <div className="space-y-3">
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold">
                  {PROFILE_DATA.discipline}
                </p>
                <h1 id="hero-heading" className="swiss-display uppercase">
                  {PROFILE_DATA.name}
                </h1>
              </div>

              <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
                {PROFILE_DATA.bio}
              </p>
            </div>

            {/* CTA Utama: Email & GitHub */}
            <div className="pt-4 border-t border-grid flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="touch-target inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>HUBUNGI: {PROFILE_DATA.email}</span>
              </a>

              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center gap-3 px-6 py-3.5 border border-grid bg-surface hover:bg-theme font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <GitBranch className="w-4 h-4" aria-hidden="true" />
                <span>GITHUB // @SEAAVEY</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#work"
                className="touch-target inline-flex items-center gap-2 px-5 py-3.5 border border-grid font-mono text-xs uppercase tracking-widest text-muted hover:text-theme transition-colors"
              >
                <span>LIHAT PROYEK [A-01..A-06]</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan (5 Kolom): Schematic FIG 00.A & Statistik GitHub */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Diagram Skematik FIG 00.A */}
            <div className="p-6 sm:p-8 border-b border-grid bg-surface">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted mb-3">
                <span>SCHEMATIC DIAGRAM // FIG 00.A</span>
                <span>RECREATED VECTOR SVG</span>
              </div>
              <SchematicSvg variant="FIG-00.A" />
            </div>

            {/* Statistik Publik GitHub (Per 26 Oktober 2026) */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="px-6 py-3 border-b border-grid flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
                <span>GITHUB TELEMETRY</span>
                <span>{PROFILE_DATA.githubStats.asOf}</span>
              </div>

              <dl className="grid grid-cols-3 divide-x divide-[var(--color-border)] border-b border-grid">
                <div className="p-5 sm:p-6">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    REPO PUBLIK
                  </dt>
                  <dd className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
                    0{PROFILE_DATA.githubStats.publicRepos}
                  </dd>
                  <span className="block mt-1 font-mono text-[10px] text-muted">
                    Per 26 Okt 2026
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    FOLLOWER
                  </dt>
                  <dd className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
                    {PROFILE_DATA.githubStats.followers}
                  </dd>
                  <span className="block mt-1 font-mono text-[10px] text-muted">
                    Per 26 Okt 2026
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    TOTAL BINTANG
                  </dt>
                  <dd className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
                    {PROFILE_DATA.githubStats.stars}
                  </dd>
                  <span className="block mt-1 font-mono text-[10px] text-muted">
                    Per 26 Okt 2026
                  </span>
                </div>
              </dl>

              <div className="px-6 py-4 font-mono text-xs flex items-center justify-between text-muted">
                <span>FOKUS: LLM GATEWAY • SWISS UI • LINUX</span>
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-1 text-theme underline underline-offset-4"
                >
                  <span>github.com/seaavey</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. #work (SELECTED WORKS — 6 KARTU PROYEK A-01 s/d A-06)
           =================================================================== */}
        <section id="work" aria-labelledby="work-heading" className="border-b border-grid">
          {/* Header Bagian #work */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-grid">
            <div className="lg:col-span-5 p-6 sm:p-8 lg:border-r border-grid">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                SECTION 01 // SELECTED WORKS [A-01 — A-06]
              </p>
              <h2 id="work-heading" className="swiss-h2 uppercase">
                Selected Works
              </h2>
              <p className="mt-2 text-sm text-muted">
                Arsitektur gateway LLM, runtime otomasi, sistem konfigurasi Wayland, dan antarmuka
                web Swiss brutalist. Seluruh angka bintang & fork tercatat{" "}
                <strong className="text-theme font-normal">{SNAPSHOT_DATE_LABEL}</strong>.
              </p>
            </div>

            {/* Filter Kategori & Simulasi State Dinamis */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4 border-t lg:border-t-0 border-grid">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted mb-2">
                  FILTER KATEGORI PROYEK:
                </span>
                <div
                  role="group"
                  aria-label="Filter kategori proyek"
                  className="flex flex-wrap gap-2"
                >
                  {(["ALL", "SYSTEMS", "WEB", "CONFIG"] as WorkCategory[]).map((cat) => {
                    const active = workFilter === cat && workViewState === "ready";
                    const count =
                      cat === "ALL"
                        ? PROJECTS_DATA.length
                        : PROJECTS_DATA.filter((p) => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleSelectWorkFilter(cat)}
                        aria-pressed={active}
                        className={`touch-target px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                          active
                            ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)] font-bold"
                            : "bg-surface text-theme border-grid hover:bg-theme"
                        }`}
                      >
                        {cat} [{count}]
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Penguji State Dinamis (Ready / Loading / Empty / Error) */}
              <div className="pt-3 border-t border-grid flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  STATE INSPECTOR (#WORK):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["ready", "loading", "empty", "error"] as DynamicViewState[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setWorkViewState(st)}
                      aria-pressed={workViewState === st}
                      className={`touch-target px-3 py-1 border font-mono text-[11px] uppercase cursor-pointer ${
                        workViewState === st
                          ? "border-[var(--color-accent)] text-accent font-bold"
                          : "border-grid text-muted hover:text-theme"
                      }`}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* State Loading */}
          {workViewState === "loading" && (
            <div
              role="status"
              aria-live="polite"
              className="p-12 text-center font-mono space-y-3 bg-surface"
            >
              <RefreshCw
                className={`w-6 h-6 mx-auto ${reducedMotion ? "" : "animate-spin"}`}
                aria-hidden="true"
              />
              <p className="text-sm uppercase tracking-widest">
                MEMUAT INDEKS PROYEK [A-01 .. A-06]...
              </p>
              <p className="text-xs text-muted">Mengambil telemetri repositori dan skematik SVG.</p>
            </div>
          )}

          {/* State Error */}
          {workViewState === "error" && (
            <div
              role="alert"
              className="p-12 text-center font-mono space-y-4 bg-surface border-b border-grid"
            >
              <ShieldAlert className="w-7 h-7 mx-auto text-accent" aria-hidden="true" />
              <p className="text-sm uppercase tracking-widest text-accent font-bold">
                ERR_WORK_INDEX_FETCH // GAGAL MEMUAT DAFTAR PROYEK
              </p>
              <p className="text-xs text-muted max-w-md mx-auto">
                Terjadi kesalahan saat merender indeks proyek. Anda dapat memuat ulang state atau
                mengakses repositori langsung di GitHub.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setWorkViewState("ready")}
                  className="touch-target px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest cursor-pointer"
                >
                  PULIHKAN DATA (RETRY)
                </button>
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-2 px-4 py-2 border border-grid font-mono text-xs uppercase"
                >
                  <span>BUKA GITHUB</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* State Empty */}
          {workViewState === "empty" && (
            <div role="status" className="p-12 text-center font-mono space-y-4 bg-surface">
              <p className="text-sm uppercase tracking-widest">
                0 PROYEK DITEMUKAN PADA FILTER INI
              </p>
              <p className="text-xs text-muted">
                Tidak ada entri proyek yang cocok dengan kriteria pencarian saat ini.
              </p>
              <button
                type="button"
                onClick={() => handleSelectWorkFilter("ALL")}
                className="touch-target px-4 py-2 border border-grid font-mono text-xs uppercase tracking-widest hover:bg-theme cursor-pointer"
              >
                RESET KE SEMUA KATEGORI (ALL)
              </button>
            </div>
          )}

          {/* State Ready (Daftar 6 Kartu Proyek) */}
          {workViewState === "ready" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 border-grid">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="lg:col-span-4 border-b border-r border-grid p-6 sm:p-8 flex flex-col justify-between gap-6 bg-theme hover:bg-surface transition-colors"
                >
                  <div className="space-y-5">
                    {/* Baris Atas: Indeks A-01..A-06, Kategori, Telemetri Bintang/Fork */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-grid font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[var(--color-text)] text-[var(--color-bg)] font-bold">
                          {project.id}
                        </span>
                        <span className="px-2 py-0.5 border border-grid uppercase">
                          {project.category}
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-3 text-muted"
                        title={`${project.statusNote}`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                          <span>{project.stars}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{project.forks}</span>
                        </span>
                      </div>
                    </div>

                    {/* Diagram Skematik SVG A-01 s/d A-06 */}
                    <div className="bg-surface p-3 border border-grid">
                      <SchematicSvg variant={project.id} />
                    </div>

                    {/* Judul & Ringkasan */}
                    <div className="space-y-2">
                      <h3 className="swiss-h3 uppercase">{project.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{project.summary}</p>
                    </div>

                    {/* Bullet Kapabilitas */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        KAPABILITAS INTI:
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm list-disc pl-4">
                        {project.capabilities.map((cap, idx) => (
                          <li key={idx} className="leading-snug">
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stack & Tautan */}
                  <div className="pt-4 border-t border-grid space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 border border-grid font-mono text-[11px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <span className="font-mono text-[10px] text-muted uppercase">
                        DATA: 26 OKT 2026 [INFERRED DIST]
                      </span>
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-target inline-flex items-center gap-1 px-3 py-2 border border-grid font-mono text-xs uppercase hover:bg-theme"
                          >
                            <span>LIVE</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="touch-target inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase font-semibold"
                          aria-label={`Lihat repositori ${project.title} di GitHub`}
                        >
                          <span>SOURCE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ===================================================================
            4. #process (METHODOLOGY — 4 PILAR)
           =================================================================== */}
        <section id="process" aria-labelledby="process-heading" className="border-b border-grid">
          <div className="p-6 sm:p-8 border-b border-grid grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                SECTION 02 // METHODOLOGY & ARCHITECTURAL PILLARS
              </p>
              <h2 id="process-heading" className="swiss-h2 uppercase">
                Methodology
              </h2>
            </div>
            <div className="lg:col-span-6 font-mono text-xs text-muted">
              Empat pilar rekayasa yang menyatukan perutean gateway LLM, tata letak tipografi Swiss,
              manajemen jendela Wayland, dan infrastruktur penyebaran modern. Metrik klaim situs
              ditandai secara eksplisit.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
            {PROCESS_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="lg:col-span-3 border-b lg:border-b-0 border-r last:border-r-0 border-grid p-6 sm:p-8 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-muted">
                    <span className="px-2 py-0.5 border border-grid text-theme font-bold">
                      PILLAR // {pillar.index}
                    </span>
                    <span>{pillar.label}</span>
                  </div>

                  <h3 className="swiss-h3 uppercase">{pillar.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{pillar.description}</p>
                </div>

                <div className="pt-4 border-t border-grid space-y-1.5">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                    TELEMETRY METRIC:
                  </span>
                  <p className="font-mono text-xs font-bold text-accent">{pillar.metric}</p>
                  {pillar.isUnverifiedClaim && pillar.claimNote && (
                    <p className="font-mono text-[10px] text-muted">{pillar.claimNote}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            5. #specs (WORKSTATION SPEC + BLOK SALIN GIT CLONE)
           =================================================================== */}
        <section id="specs" aria-labelledby="specs-heading" className="border-b border-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Kolom Kiri (4 Kolom): Deskripsi & Blok Perintah git clone */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-grid p-6 sm:p-8 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  SECTION 03 // WORKSTATION SPECIFICATION
                </p>
                <h2 id="specs-heading" className="swiss-h2 uppercase">
                  Workstation Spec
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  Konfigurasi sistem operasi Linux, kompositor tiling Wayland, dan perangkat lunak
                  inti yang digunakan untuk merancang serta menguji infrastruktur web dan gateway
                  LLM di Bandung (UTC+7).
                </p>
              </div>

              {/* Blok Perintah Salin git clone */}
              <div className="border border-grid bg-surface p-5 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="inline-flex items-center gap-2 text-theme font-semibold">
                    <Terminal className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span>BOOTSTRAP DOTFILES REPOSITORY</span>
                  </span>
                  <span>SHELL // ZSH</span>
                </div>

                <pre className="p-3 bg-theme border border-grid font-mono text-xs overflow-x-auto">
                  <code>{DOTFILES_CLONE_COMMAND}</code>
                </pre>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCopyCommand}
                    className="touch-target w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>COPY CLONE COMMAND</span>
                      </>
                    )}
                  </button>
                </div>

                <div aria-live="polite" className="sr-only">
                  {copiedCommand ? "COPIED TO CLIPBOARD" : ""}
                </div>
              </div>
            </div>

            {/* Kolom Kanan (7 Kolom): Tabel Spesifikasi */}
            <div className="lg:col-span-7 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Tabel spesifikasi workstation Linux dan stack utama Muhammad Adriansyah
                </caption>
                <thead>
                  <tr className="border-b border-grid bg-surface font-mono text-xs uppercase text-muted">
                    <th scope="col" className="py-3.5 px-4 sm:px-6 border-r border-grid">
                      ID
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 border-r border-grid">
                      KOMPONEN
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 border-r border-grid">
                      SPESIFIKASI AKTIF
                    </th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6">
                      CATATAN / STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-sm">
                  {WORKSTATION_SPECS.map((row) => (
                    <tr key={row.parameter} className="hover:bg-surface transition-colors">
                      <td className="py-4 px-4 sm:px-6 border-r border-grid font-mono text-xs text-accent font-semibold whitespace-nowrap">
                        {row.parameter}
                      </td>
                      <td className="py-4 px-4 sm:px-6 border-r border-grid font-mono text-xs uppercase font-semibold whitespace-nowrap">
                        {row.key}
                      </td>
                      <td className="py-4 px-4 sm:px-6 border-r border-grid font-medium">
                        {row.value}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-mono text-xs text-muted">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. #stack (TECH MATRIX — 20 MODUL DENGAN FILTER GRUP)
           =================================================================== */}
        <section id="stack" aria-labelledby="stack-heading" className="border-b border-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-grid">
            <div className="lg:col-span-5 p-6 sm:p-8 lg:border-r border-grid">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                SECTION 04 // TECH MATRIX [20 MODULES]
              </p>
              <h2 id="stack-heading" className="swiss-h2 uppercase">
                Tech Matrix
              </h2>
              <p className="mt-2 text-sm text-muted">
                20 modul teknologi yang dikelompokkan ke dalam lapisan Frontend, Backend/Systems,
                dan Linux/Tools.
              </p>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4 border-t lg:border-t-0 border-grid">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted mb-2">
                  FILTER GRUP MODUL:
                </span>
                <div
                  role="group"
                  aria-label="Filter grup Tech Matrix"
                  className="flex flex-wrap gap-2"
                >
                  {(["ALL", "FRONTEND", "BACKEND/SYS", "LINUX/TOOLS"] as StackCategory[]).map(
                    (grp) => {
                      const active = stackFilter === grp && stackViewState === "ready";
                      const count =
                        grp === "ALL"
                          ? TECH_STACK_MODULES.length
                          : TECH_STACK_MODULES.filter((m) => m.group === grp).length;
                      return (
                        <button
                          key={grp}
                          type="button"
                          onClick={() => handleSelectStackFilter(grp)}
                          aria-pressed={active}
                          className={`touch-target px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                            active
                              ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)] font-bold"
                              : "bg-surface text-theme border-grid hover:bg-theme"
                          }`}
                        >
                          {grp} [{count}]
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Penguji State Dinamis (#stack) */}
              <div className="pt-3 border-t border-grid flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  STATE INSPECTOR (#STACK):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["ready", "loading", "empty", "error"] as DynamicViewState[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStackViewState(st)}
                      aria-pressed={stackViewState === st}
                      className={`touch-target px-3 py-1 border font-mono text-[11px] uppercase cursor-pointer ${
                        stackViewState === st
                          ? "border-[var(--color-accent)] text-accent font-bold"
                          : "border-grid text-muted hover:text-theme"
                      }`}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {stackViewState === "loading" && (
            <div role="status" aria-live="polite" className="p-12 text-center font-mono bg-surface">
              <p className="text-sm uppercase tracking-widest">
                MEMUAT 20 MODUL MATRIKS TEKNOLOGI...
              </p>
            </div>
          )}

          {stackViewState === "error" && (
            <div role="alert" className="p-12 text-center font-mono space-y-3 bg-surface">
              <p className="text-sm uppercase tracking-widest text-accent font-bold">
                ERR_MATRIX_READ // GAGAL MEMUAT MODUL STACK
              </p>
              <button
                type="button"
                onClick={() => setStackViewState("ready")}
                className="touch-target px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase cursor-pointer"
              >
                MUAT ULANG MATRIKS
              </button>
            </div>
          )}

          {stackViewState === "empty" && (
            <div role="status" className="p-12 text-center font-mono space-y-3 bg-surface">
              <p className="text-sm uppercase tracking-widest">MATRIKS KOSONG UNTUK FILTER INI</p>
              <button
                type="button"
                onClick={() => handleSelectStackFilter("ALL")}
                className="touch-target px-4 py-2 border border-grid font-mono text-xs uppercase cursor-pointer"
              >
                TAMPILKAN SEMUA 20 MODUL
              </button>
            </div>
          )}

          {stackViewState === "ready" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {filteredStack.map((mod) => (
                <div
                  key={mod.code}
                  className="border-b border-r border-grid p-5 flex flex-col justify-between gap-4 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                    <span className="text-accent font-bold">{mod.code}</span>
                    <span className="px-1.5 py-0.5 border border-grid">{mod.group}</span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold uppercase">{mod.name}</h3>
                    <p className="mt-1 text-xs text-muted">{mod.role}</p>
                  </div>
                  <div className="pt-2 border-t border-grid flex items-center justify-between font-mono text-[10px] text-muted">
                    <span>TIER: {mod.tier}</span>
                    <span>STATUS: ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ===================================================================
            7. #log (ENGINEERING LOG 2024.06 — 2026.01 + PANEL BADGE GITHUB)
           =================================================================== */}
        <section id="log" aria-labelledby="log-heading" className="border-b border-grid">
          <div className="p-6 sm:p-8 border-b border-grid">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              SECTION 05 // CHRONOLOGICAL ENGINEERING LOG [2024.06 — 2026.01]
            </p>
            <h2 id="log-heading" className="swiss-h2 uppercase">
              Engineering Log
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Timeline Vertikal (8 Kolom) */}
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-grid divide-y divide-[var(--color-border)]">
              {ENGINEERING_LOG.map((entry) => (
                <article
                  key={entry.code}
                  className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-4 hover:bg-surface transition-colors"
                >
                  <div className="sm:col-span-3 font-mono">
                    <time className="text-lg font-bold block text-accent">{entry.date}</time>
                    <span className="text-xs text-muted uppercase">{entry.code}</span>
                  </div>

                  <div className="sm:col-span-9 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                      <span className="px-2 py-0.5 border border-grid uppercase">
                        {entry.category}
                      </span>
                      {entry.inferred && <span>[INFERRED MILESTONE]</span>}
                    </div>
                    <h3 className="swiss-h3">{entry.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{entry.summary}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Panel Badge & Snapshot GitHub (4 Kolom) */}
            <aside
              aria-label="Panel badge dan telemetri GitHub"
              className="lg:col-span-4 p-6 sm:p-8 bg-surface flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="pb-3 border-b border-grid flex items-center justify-between font-mono text-xs uppercase">
                  <span className="font-bold">GITHUB BADGE PANEL</span>
                  <span className="text-muted">26 OKT 2026</span>
                </div>

                <p className="text-xs text-muted font-mono">
                  Data profil GitHub (@seaavey) diverifikasi{" "}
                  <strong className="text-theme">{SNAPSHOT_DATE_LABEL}</strong>.
                </p>

                <div className="space-y-3">
                  {GITHUB_BADGES.map((badge) => (
                    <div key={badge.id} className="p-4 border border-grid bg-theme space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-accent font-bold">{badge.id}</span>
                        <span className="text-muted">{badge.tier}</span>
                      </div>
                      <h4 className="font-mono text-xs font-bold uppercase">{badge.title}</h4>
                      <p className="text-xs text-muted">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-grid bg-theme font-mono text-xs uppercase tracking-widest hover:bg-surface"
              >
                <GitBranch className="w-4 h-4" aria-hidden="true" />
                <span>VERIFIKASI DI GITHUB.COM/SEAAVEY</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        {/* ===================================================================
            8. #about (MANIFESTO — KUTIPAN BESAR & PARAGRAF EDITORIAL)
           =================================================================== */}
        <section id="about" aria-labelledby="about-heading" className="border-b border-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-grid flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  SECTION 06 // MANIFESTO & PHILOSOPHY
                </p>
                <h2 id="about-heading" className="swiss-h2 uppercase">
                  Manifesto
                </h2>
              </div>

              <div className="pt-6 font-mono text-xs text-muted space-y-1">
                <p>DISIPLIN: BUILDING DESIGN × SYSTEMS ENGINEERING</p>
                <p>ESTETIKA: SWISS BRUTALIST EDITORIAL</p>
                <p>BASIS: BANDUNG, INDONESIA (UTC+7)</p>
              </div>
            </div>

            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 space-y-8">
              <blockquote className="swiss-quote border-l-4 border-[var(--color-accent)] pl-6">
                &ldquo;Arsitektur yang jujur tidak menyembunyikan balok penopangnya; baik ketika
                merancang struktur ruang fisik maupun ketika merutekan ribuan paket token melintasi
                gateway LLM dan tata letak grid 1px di layar.&rdquo;
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-muted leading-relaxed pt-4 border-t border-grid">
                <p>
                  Latar belakang dalam perancangan bangunan (<em>building design</em>) dan rekayasa
                  web full stack membentuk pendekatan yang menolak dekorasi superfisial. Setiap
                  garis batas 1px, kontras tipografi, dan pemisahan modul dirancang untuk memperjelas
                  fungsi serta mempercepat pembacaan informasi oleh manusia maupun mesin.
                </p>
                <p>
                  Dari pengaturan kompositor Wayland di Linux hingga pembangunan lapisan perutean
                  API LLM multi-provider, fokus utamanya tetap sama: keandalan deterministik,
                  kebersihan struktur kode, dan antarmuka yang menghormati kendali penuh pengguna.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            9. #contact (DISPATCH — KANAL KONTAK, PARAMETER, & FORM SERVER-SIDE)
           =================================================================== */}
        <section id="contact" aria-labelledby="contact-heading" className="border-b border-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Kolom Kiri (5 Kolom): Parameter Ketersediaan & Kanal Kontak */}
            <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-grid flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  SECTION 07 // COMMUNICATION DISPATCH
                </p>
                <h2 id="contact-heading" className="swiss-h2 uppercase">
                  Dispatch
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  Tersedia untuk kolaborasi terpilih pada pembangunan aplikasi web modern, arsitektur
                  gateway LLM, dan sistem desain UI bergaya Swiss brutalist.
                </p>
              </div>

              {/* Tabel Parameter Ketersediaan */}
              <dl className="border border-grid divide-y divide-[var(--color-border)] font-mono text-xs">
                <div className="p-3.5 flex items-center justify-between gap-2 bg-surface">
                  <dt className="text-muted">STATUS KETERSEDIAAN</dt>
                  <dd className="font-bold text-accent">OPEN FOR SELECTED PROJECTS</dd>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">RESPONSE WINDOW</dt>
                  <dd className="font-semibold">24–48 JAM (HARI KERJA)</dd>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">LOKASI BASIS</dt>
                  <dd className="font-semibold">BANDUNG, INDONESIA</dd>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">ZONA WAKTU</dt>
                  <dd className="font-semibold">UTC+7 (WIB)</dd>
                </div>
              </dl>

              {/* Kanal Kontak Langsung */}
              <div className="space-y-3">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                  KANAL UTAMA TERVERIFIKASI:
                </span>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="touch-target w-full flex items-center justify-between px-4 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest font-bold"
                >
                  <span>EMAIL // {PROFILE_DATA.email}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-full flex items-center justify-between px-4 py-3.5 border border-grid bg-surface hover:bg-theme font-mono text-xs uppercase tracking-widest font-semibold"
                >
                  <span>GITHUB // github.com/seaavey</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Kolom Kanan (7 Kolom): Formulir Kontak Server-Side (/api/contact) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-grid">
                <h3 className="font-mono text-sm uppercase font-bold">
                  DIRECT TRANSMISSION FORM // ENDPOINT: /api/contact
                </h3>
                <span className="font-mono text-[11px] text-muted">NO FRONTEND SECRETS</span>
              </div>

              <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase tracking-wider mb-2"
                    >
                      NAMA / ORGANISASI *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Contoh: Adi Pratama / Studio X"
                      className="touch-target w-full px-4 py-3 bg-surface border border-grid font-mono text-xs text-theme"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase tracking-wider mb-2"
                    >
                      ALAMAT EMAIL BALASAN *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="nama@perusahaan.com"
                      className="touch-target w-full px-4 py-3 bg-surface border border-grid font-mono text-xs text-theme"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-scope"
                    className="block font-mono text-xs uppercase tracking-wider mb-2"
                  >
                    LINGKUP KEBUTUHAN SISTEM
                  </label>
                  <select
                    id="contact-scope"
                    name="scope"
                    value={contactScope}
                    onChange={(e) => setContactScope(e.target.value)}
                    className="touch-target w-full px-4 py-3 bg-surface border border-grid font-mono text-xs text-theme"
                  >
                    <option value="LLM_GATEWAY_INFRA">
                      01 // INFRASTRUKTUR GATEWAY LLM & API ROUTING
                    </option>
                    <option value="SWISS_WEB_SYSTEM">
                      02 // PENGEMBANGAN FULL STACK WEB & SWISS UI SYSTEM
                    </option>
                    <option value="LINUX_OR_AUTOMATION">
                      03 // OTOMASI BOT, CLI AGENT, & KONFIGURASI LINUX
                    </option>
                    <option value="GENERAL_INQUIRY">04 // DISKUSI TEKNIS / REKRUTMEN</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider mb-2"
                  >
                    SPESIFIKASI PROYEK & TARGET WAKTU *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Jelaskan kebutuhan teknis, arsitektur yang diinginkan, atau jadwal proyek (minimal 10 karakter)..."
                    className="w-full p-4 bg-surface border border-grid font-mono text-xs text-theme"
                  />
                </div>

                {/* Opsi pengujian error state untuk memverifikasi fallback */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    id="simulate-error-checkbox"
                    type="checkbox"
                    checked={contactSimulateError}
                    onChange={(e) => setContactSimulateError(e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-accent)]"
                  />
                  <label
                    htmlFor="simulate-error-checkbox"
                    className="font-mono text-[11px] text-muted cursor-pointer"
                  >
                    Simulasikan kegagalan gateway (Uji state Error & fallback email langsung)
                  </label>
                </div>

                {/* Umpan Balik State: Loading / Sukses / Error */}
                {contactStatus === "loading" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 border border-grid bg-surface font-mono text-xs"
                  >
                    MENGIRIM PAYLOAD KE /api/contact...
                  </div>
                )}

                {contactStatus === "success" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 border border-grid bg-surface font-mono text-xs space-y-1.5"
                  >
                    <p className="font-bold text-accent">
                      TRANSMISI SUKSES // ID: {contactDispatchId}
                    </p>
                    <p>{contactFeedback}</p>
                  </div>
                )}

                {contactStatus === "error" && (
                  <div
                    role="alert"
                    className="p-4 border border-[var(--color-accent)] bg-surface font-mono text-xs space-y-2"
                  >
                    <p className="font-bold text-accent">TRANSMISI GAGAL // FALLBACK TERSEDIA</p>
                    <p>{contactFeedback}</p>
                    <p>
                      Alternatif langsung:{" "}
                      <a
                        href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
                          `[DISPATCH ${contactScope}] Proyek dari ${contactName || "Klien"}`
                        )}&body=${encodeURIComponent(contactMessage)}`}
                        className="underline font-bold text-theme"
                      >
                        Kirim via Klien Email ({PROFILE_DATA.email})
                      </a>
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={contactStatus === "loading"}
                    className="touch-target px-6 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] font-mono text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50 cursor-pointer"
                  >
                    {contactStatus === "loading" ? "TRANSMITTING..." : "KIRIM TRANSMISI DISPATCH"}
                  </button>

                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="touch-target inline-flex items-center gap-2 px-5 py-3.5 border border-grid font-mono text-xs uppercase tracking-widest hover:bg-surface"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>MAILTO LANGSUNG</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          10. FOOTER (Tautan, Hak Cipta 2026, Versi Engine, Velocity Marquee)
         ===================================================================== */}
      <footer className="max-w-[1600px] mx-auto border-x border-b border-grid bg-theme">
        {/* Marquee Teks Berjalan yang Bereaksi terhadap Kecepatan Scroll */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-b border-grid bg-surface py-3 select-none"
        >
          <div
            ref={marqueeTrackRef}
            className="flex whitespace-nowrap font-mono text-xs uppercase tracking-widest"
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <span key={idx} className="inline-flex items-center gap-6 px-4">
                <span className="font-bold text-theme">{PROFILE_DATA.wordmark}</span>
                <span>MUHAMMAD ADRIANSYAH (@SEAAVEY)</span>
                <span className="text-accent">•</span>
                <span>FULL STACK WEB &amp; BUILDING / SYSTEMS DESIGN</span>
                <span className="text-accent">•</span>
                <span>LLM GATEWAY INFRASTRUCTURE</span>
                <span className="text-accent">•</span>
                <span>SWISS BRUTALIST UI</span>
                <span className="text-accent">•</span>
                <span>BANDUNG UTC+7</span>
                <span className="text-accent">//</span>
              </span>
            ))}
          </div>
        </div>

        {/* Baris Informasi Footer */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center font-mono text-xs">
          <div className="md:col-span-5 space-y-1">
            <p className="font-bold text-theme">
              © 2026 {PROFILE_DATA.name} ({PROFILE_DATA.handle}). ALL RIGHTS RESERVED.
            </p>
            <p className="text-muted text-[11px]">
              Data metrik GitHub tertera {SNAPSHOT_DATE_LABEL}.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap gap-4">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="touch-target inline-flex items-center underline underline-offset-4 hover:text-accent"
            >
              {PROFILE_DATA.email}
            </a>
            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center underline underline-offset-4 hover:text-accent"
            >
              GitHub (@seaavey)
            </a>
            <a
              href="#top"
              className="touch-target inline-flex items-center underline underline-offset-4 hover:text-accent"
            >
              BACK TO TOP ↑
            </a>
          </div>

          <div className="md:col-span-3 md:text-right text-muted space-y-1 text-[11px]">
            <p className="text-theme font-bold">ENGINE: SEAVX-SYS v2.6.0</p>
            <p>NEXT.JS 15 • REACT 19 • LENIS 0.08</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
