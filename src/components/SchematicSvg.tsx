import React from "react";

/**
 * INFERRED / RECREATED SCHEMATIC SVGs (FIG 00.A & A-01 s/d A-06)
 * Dibuat ulang sebagai diagram teknis vektor SVG sederhana bergaya Swiss brutalist
 * (bukan salinan file gambar asli).
 */

interface SchematicProps {
  variant: "FIG-00.A" | "A-01" | "A-02" | "A-03" | "A-04" | "A-05" | "A-06";
  className?: string;
}

export function SchematicSvg({ variant, className = "" }: SchematicProps) {
  switch (variant) {
    case "FIG-00.A":
      return (
        <svg
          viewBox="0 0 480 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto block ${className}`}
          aria-hidden="true"
        >
          {/* Outer structural frame */}
          <rect x="1" y="1" width="478" height="238" stroke="currentColor" strokeWidth="1" />
          {/* Structural grid lines */}
          <line x1="120" y1="1" x2="120" y2="239" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="240" y1="1" x2="240" y2="239" stroke="currentColor" strokeWidth="1" />
          <line x1="360" y1="1" x2="360" y2="239" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="1" y1="120" x2="479" y2="120" stroke="currentColor" strokeWidth="1" />

          {/* Ingress Node */}
          <rect x="24" y="42" width="72" height="36" stroke="currentColor" strokeWidth="1.5" />
          <text x="34" y="64" fill="currentColor" fontSize="10" fontFamily="monospace">
            INGRESS
          </text>

          {/* Gateway Core Node */}
          <rect x="192" y="88" width="96" height="64" stroke="currentColor" strokeWidth="1.5" />
          <text x="206" y="116" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">
            SEAVX.CORE
          </text>
          <text x="206" y="132" fill="currentColor" fontSize="9" fontFamily="monospace">
            GATEWAY // UI
          </text>

          {/* Egress Nodes */}
          <rect x="380" y="32" width="76" height="32" stroke="currentColor" strokeWidth="1" />
          <text x="392" y="52" fill="currentColor" fontSize="9" fontFamily="monospace">
            NODE.LLM_A
          </text>

          <rect x="380" y="104" width="76" height="32" stroke="currentColor" strokeWidth="1" />
          <text x="392" y="124" fill="currentColor" fontSize="9" fontFamily="monospace">
            NODE.LLM_B
          </text>

          <rect x="380" y="176" width="76" height="32" stroke="currentColor" strokeWidth="1" />
          <text x="392" y="196" fill="currentColor" fontSize="9" fontFamily="monospace">
            SYS.WAYLAND
          </text>

          {/* Connectors */}
          <path d="M96 60 H192 V105" stroke="currentColor" strokeWidth="1.2" />
          <path d="M288 105 H334 V48 H380" stroke="currentColor" strokeWidth="1.2" />
          <path d="M288 120 H380" stroke="currentColor" strokeWidth="1.2" />
          <path d="M288 135 H334 V192 H380" stroke="currentColor" strokeWidth="1.2" />

          {/* Architectural crosshair markers */}
          <circle cx="240" cy="120" r="3" fill="currentColor" />
          <text x="12" y="226" fill="currentColor" fontSize="9" fontFamily="monospace">
            FIG 00.A — ARCHITECTURAL TOPOLOGY [RECREATED SVG]
          </text>
        </svg>
      );

    case "A-01":
      // SRouter: Multi-provider router schematic
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          <rect x="16" y="42" width="56" height="36" stroke="currentColor" strokeWidth="1.2" />
          <text x="25" y="64" fill="currentColor" fontSize="9" fontFamily="monospace">
            REQ.IN
          </text>
          <polygon points="128,30 184,30 198,60 184,90 128,90" stroke="currentColor" strokeWidth="1.2" />
          <text x="137" y="63" fill="currentColor" fontSize="9" fontFamily="monospace">
            SROUTER
          </text>
          <line x1="72" y1="60" x2="128" y2="60" stroke="currentColor" strokeWidth="1.2" />
          <line x1="198" y1="60" x2="236" y2="28" stroke="currentColor" strokeWidth="1" />
          <line x1="198" y1="60" x2="236" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="198" y1="60" x2="236" y2="92" stroke="currentColor" strokeWidth="1" />
          <rect x="236" y="16" width="68" height="24" stroke="currentColor" strokeWidth="1" />
          <rect x="236" y="48" width="68" height="24" stroke="currentColor" strokeWidth="1" />
          <rect x="236" y="80" width="68" height="24" stroke="currentColor" strokeWidth="1" />
          <text x="246" y="31" fill="currentColor" fontSize="8" fontFamily="monospace">
            UPSTREAM.01
          </text>
          <text x="246" y="63" fill="currentColor" fontSize="8" fontFamily="monospace">
            UPSTREAM.02
          </text>
          <text x="246" y="95" fill="currentColor" fontSize="8" fontFamily="monospace">
            FALLBACK.03
          </text>
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-01 // ROUTING LOOP
          </text>
        </svg>
      );

    case "A-02":
      // SAgent: Autonomous cyclic state machine
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="56" r="26" stroke="currentColor" strokeWidth="1.2" />
          <text x="53" y="59" fill="currentColor" fontSize="9" fontFamily="monospace">
            PLAN()
          </text>
          <rect x="132" y="30" width="64" height="52" stroke="currentColor" strokeWidth="1.2" />
          <text x="145" y="59" fill="currentColor" fontSize="9" fontFamily="monospace">
            EXEC.SH
          </text>
          <circle cx="256" cy="56" r="26" stroke="currentColor" strokeWidth="1.2" />
          <text x="236" y="59" fill="currentColor" fontSize="9" fontFamily="monospace">
            VERIFY
          </text>
          <line x1="96" y1="56" x2="132" y2="56" stroke="currentColor" strokeWidth="1.2" />
          <line x1="196" y1="56" x2="230" y2="56" stroke="currentColor" strokeWidth="1.2" />
          <path d="M256 82 V98 H70 V82" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-02 // AGENT PIPELINE
          </text>
        </svg>
      );

    case "A-03":
      // seaavey-bot: Event webhook & dispatch queue
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          <rect x="18" y="24" width="68" height="64" stroke="currentColor" strokeWidth="1.2" />
          <text x="26" y="54" fill="currentColor" fontSize="8" fontFamily="monospace">
            WEBHOOK.RX
          </text>
          <text x="26" y="68" fill="currentColor" fontSize="8" fontFamily="monospace">
            QUEUE[FIFO]
          </text>
          <line x1="86" y1="56" x2="130" y2="56" stroke="currentColor" strokeWidth="1.2" />
          <rect x="130" y="24" width="76" height="64" stroke="currentColor" strokeWidth="1.2" />
          <text x="140" y="54" fill="currentColor" fontSize="8" fontFamily="monospace">
            BOT.DISPATCH
          </text>
          <text x="140" y="68" fill="currentColor" fontSize="8" fontFamily="monospace">
            RATE_LIMIT
          </text>
          <line x1="206" y1="56" x2="244" y2="56" stroke="currentColor" strokeWidth="1.2" />
          <rect x="244" y="34" width="58" height="44" stroke="currentColor" strokeWidth="1.2" />
          <text x="252" y="59" fill="currentColor" fontSize="8" fontFamily="monospace">
            LLM.REPLY
          </text>
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-03 // ASYNC DISPATCHER
          </text>
        </svg>
      );

    case "A-04":
      // Dotfiles & Hyprland Rice: Wayland master-stack tiling geometry
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          {/* Top Waybar */}
          <rect x="12" y="10" width="296" height="12" stroke="currentColor" strokeWidth="1" />
          <text x="18" y="19" fill="currentColor" fontSize="7" fontFamily="monospace">
            [1][2][3][4] // WAYBAR // UTC+7
          </text>
          {/* Master pane */}
          <rect x="12" y="26" width="160" height="72" stroke="currentColor" strokeWidth="1.2" />
          <text x="22" y="44" fill="currentColor" fontSize="9" fontFamily="monospace">
            TILE.01 [NVIM]
          </text>
          {/* Stack panes */}
          <rect x="176" y="26" width="132" height="34" stroke="currentColor" strokeWidth="1" />
          <text x="184" y="46" fill="currentColor" fontSize="8" fontFamily="monospace">
            TILE.02 [ZSH]
          </text>
          <rect x="176" y="64" width="132" height="34" stroke="currentColor" strokeWidth="1" />
          <text x="184" y="84" fill="currentColor" fontSize="8" fontFamily="monospace">
            TILE.03 [BTOP]
          </text>
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-04 // WAYLAND COMPOSITOR
          </text>
        </svg>
      );

    case "A-05":
      // Seaavey Web Portfolio: 12-column Swiss grid schematic
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          {/* 12 columns */}
          {Array.from({ length: 12 }).map((_, idx) => (
            <rect
              key={idx}
              x={16 + idx * 24}
              y="14"
              width="20"
              height="82"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 2"
            />
          ))}
          <rect x="16" y="28" width="140" height="28" stroke="currentColor" strokeWidth="1.5" />
          <rect x="160" y="28" width="140" height="56" stroke="currentColor" strokeWidth="1.5" />
          <text x="24" y="45" fill="currentColor" fontSize="8" fontFamily="monospace">
            12-COL SWISS GRID
          </text>
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-05 // EDITORIAL LAYOUT
          </text>
        </svg>
      );

    case "A-06":
      // Open Source Contributions: Git graph branches & merge nodes
      return (
        <svg viewBox="0 0 320 120" fill="none" className={`w-full h-auto block ${className}`} aria-hidden="true">
          <rect x="0.5" y="0.5" width="319" height="119" stroke="currentColor" strokeWidth="1" />
          <line x1="28" y1="68" x2="292" y2="68" stroke="currentColor" strokeWidth="1.5" />
          <path d="M84 68 L116 34 H212 L244 68" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="52" cy="68" r="5" fill="currentColor" />
          <circle cx="84" cy="68" r="5" fill="currentColor" />
          <circle cx="116" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="164" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="212" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="244" cy="68" r="5" fill="currentColor" />
          <circle cx="276" cy="68" r="5" fill="currentColor" />
          <text x="122" y="24" fill="currentColor" fontSize="8" fontFamily="monospace">
            PATCH // PR MERGE
          </text>
          <text x="10" y="112" fill="currentColor" fontSize="8" fontFamily="monospace">
            SCHEMATIC A-06 // UPSTREAM DIFFS
          </text>
        </svg>
      );
  }
}
