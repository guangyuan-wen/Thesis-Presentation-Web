import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Home, MapPin, Users, Database, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Slide { id: number; content: React.ReactNode; }

const TOKENS = {
  paperBg: 'bg-[#f6f1e7]',
  paperInk: 'text-[#1f2937]',
  accent: 'text-emerald-600',
  card: 'bg-[#fffdf7]/90 border border-[#d8d0c1] shadow-[0_8px_24px_rgba(56,48,37,0.10)] rounded-2xl',
  fontDisplay: "'Inter', 'Segoe UI', sans-serif",
  fontScript: "'Inter', 'Segoe UI', sans-serif",
  fontBody: "'Inter', 'Segoe UI', sans-serif",
};

/* ── Background wrapper: hand-drawn paper stage ───────────────── */
function S({ children, bg, noFaintBg }: { children: React.ReactNode; bg?: string; noFaintBg?: boolean }) {
  const showFaintBg = !noFaintBg && !bg;
  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden ${TOKENS.paperBg} ${TOKENS.paperInk}`}>
      {bg && (
        <>
          <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1e7]/82 via-[#f6f1e7]/72 to-[#f6f1e7]/88" />
        </>
      )}
      {showFaintBg && (
        <>
          <img src="/honglim-park.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.07]" aria-hidden />
          <div className="absolute inset-0 bg-[#f6f1e7]/90" />
        </>
      )}
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}

/* ── Content container — left/right margin on every slide ──── */
function W({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[1280px] mx-auto px-10 ${className}`}>
      {children}
    </div>
  );
}

/* ── Slide header: paper-style hierarchy ───────────────────────── */
function H({ label, title, sub }: { label?: string; title: string; sub?: string }) {
  return (
    <W className="pt-10 pb-4 flex-shrink-0 text-center">
      {label && (
        <div
          className="text-xs font-bold tracking-[0.24em] text-emerald-700 uppercase mb-2"
          style={{ fontFamily: TOKENS.fontScript }}
        >
          {label}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight" style={{ fontFamily: TOKENS.fontDisplay }}>{title}</h2>
      {sub && <p className="mt-2 text-base md:text-lg text-emerald-700 font-medium" style={{ fontFamily: TOKENS.fontBody }}>{sub}</p>}
    </W>
  );
}

/* Custom cursor SVGs: left/right arrow (emerald, 32x32, hotspot 16,16) */
const CURSOR_PREV = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'white\' stroke=\'%2310b981\' stroke-width=\'2\' d=\'M20 6 L10 16 L20 26\'/%3E%3C/svg%3E") 16 16, auto';
const CURSOR_NEXT = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'white\' stroke=\'%2310b981\' stroke-width=\'2\' d=\'M12 6 L22 16 L12 26\'/%3E%3C/svg%3E") 16 16, auto';

export default function Presentation() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showL, setShowL] = useState(false);
  const [showR, setShowR] = useState(false);

  const slides: Slide[] = [

    /* ── 01 COVER ────────────────────────────────────────────── */
    {
      id: 1,
      content: (
        <S>
          <div className="relative flex flex-col items-center justify-center h-full text-center px-12">
            {/* Subtle info layer to reduce empty feeling on large screens */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[22%] left-[8%] text-[12px] tracking-[0.18em] uppercase text-emerald-700/25">Human-led</div>
              <div className="absolute top-[28%] right-[9%] text-[12px] tracking-[0.18em] uppercase text-emerald-700/25">Democratic</div>
              <div className="absolute bottom-[27%] left-[10%] text-[12px] tracking-[0.18em] uppercase text-emerald-700/25">Computable</div>
              <div className="absolute bottom-[22%] right-[8%] text-[12px] tracking-[0.18em] uppercase text-emerald-700/25">Collaborative</div>
              <div className="absolute left-[7%] top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-emerald-700/18 to-transparent" />
              <div className="absolute right-[7%] top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-emerald-700/18 to-transparent" />
            </div>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-100/80 border border-emerald-200 rounded-full text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-7"
              style={{ fontFamily: TOKENS.fontScript }}
            >
              <span className="w-2 h-2 bg-emerald-700 rounded-full animate-pulse" />
              Design Thesis 2026 · Final Review
            </div>
            <h1 className="text-7xl md:text-9xl leading-[0.95] mb-4" style={{ fontFamily: TOKENS.fontDisplay }}>
              <span className="text-[#243247] block tracking-tight">From Preferences</span>
              <span className="text-emerald-700 block tracking-tight">To Places</span>
            </h1>
            <p className="text-2xl text-[#475569] mb-9 max-w-3xl" style={{ fontFamily: TOKENS.fontBody }}>A Computable, Human-led Workflow for Redesigning Urban Parks</p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Human-led', 'Democratic', 'Computable', 'Collaborative'].map((t) => (
                <span key={t} className="px-4 py-2 bg-[#f4eee3] rounded-full text-[#475569] text-base border border-[#d8d0c1]" style={{ fontFamily: TOKENS.fontBody }}>{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-10 text-base">
              <div className="text-center">
                <div className="text-emerald-700 font-semibold text-sm uppercase tracking-wider mb-1.5">Presenter</div>
                <div className="text-[#1f2937] font-medium text-xl">Wen Guangyuan</div>
              </div>
              <div className="w-px h-12 bg-[#d8d0c1]" />
              <div className="text-center">
                <div className="text-emerald-700 font-semibold text-sm uppercase tracking-wider mb-1.5">Advisors</div>
                <div className="text-[#1f2937] font-medium text-lg">Ervine LIN</div>
                <div className="text-[#475569] text-lg">Dorothy TANG</div>
              </div>
              <div className="w-px h-12 bg-[#d8d0c1]" />
              <div className="text-center">
                <div className="text-[#64748b] text-sm mb-1.5">Institution</div>
                <div className="text-[#1f2937] text-lg font-medium">NUS · MLA</div>
              </div>
            </div>
          </div>
        </S>
      ),
    },

    /* ── 02 THE TOOL GAP ──────────────────────────────────────── */
    {
      id: 2,
      content: (
        <S>
          <H label="Problem Statement" title="The Tool Gap in Design" sub="Fragmentation vs. Unity" />
          <W className="pb-3 flex-shrink-0">
            <div className="bg-white/5 rounded-xl px-8 py-5 border border-white/10">
              <p className="text-lg md:text-xl text-center italic text-gray-300 leading-relaxed">
                "We do collaborative Word documents and Excel sheets… landscape remains an isolated expert silo.{' '}
                <span className="text-emerald-400 not-italic font-semibold">Why can't we do a collaborative master plan?</span>"
              </p>
            </div>
          </W>
          {/* Two comparison images with VS — no outer box, follow blue box size */}
          <div className="flex-1 min-h-0 pb-5">
            <W className="h-full flex items-stretch gap-4">
              <div className="flex-1 flex flex-col min-h-0 max-h-[54vh]">
                <div className="bg-red-500/10 px-4 py-2.5 flex-shrink-0">
                  <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Traditional Tools — Isolated Silos</span>
                </div>
                <div className="flex-1 min-h-0 flex items-center justify-center bg-transparent">
                  <img src="/traditional-tool.jpg" alt="Traditional Tools" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center px-2">
                <span className="text-4xl md:text-5xl font-black text-emerald-400/90 drop-shadow-lg">VS</span>
              </div>
              <div className="flex-1 flex flex-col min-h-0 max-h-[54vh]">
                <div className="bg-emerald-500/10 px-4 py-2.5 flex-shrink-0">
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">LandscapePro — Collaborative Workflow</span>
                </div>
                <div className="flex-1 min-h-0 flex items-center justify-center bg-transparent">
                  <img src="/collaborative-tool.jpg" alt="Collaborative Tool" className="w-full h-full object-contain" />
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 03 REMOTE COLLABORATION ──────────────────────────────── */
    {
      id: 3,
      content: (
        <S>
          <H label="The Solution" title="Remote Collaboration Platform" sub="Universal Accessibility" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="pb-3 flex-shrink-0">
              <p className="text-center text-[16px] text-[#64748b] leading-relaxed">
                Participants join through a simple web link and co-design in real time, without software barriers.<br />
                Every placement becomes structured spatial data that can be traced, aggregated, and exported to professional CAD/BIM pipelines.
              </p>
            </W>
            <W className="h-full grid lg:grid-cols-2 gap-6 items-start mt-2">
              <div className="space-y-3 p-5 bg-[#fffdf7]/85 border border-[#d8d0c1] rounded-2xl shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                <p className="text-[#334155] text-xl leading-relaxed">
                  A web-based interface for remote participants — no installation required. Open a link to join
                  the design dialogue and start placing assets on a real site plan.
                </p>
                {[
                  { t: 'Web-based, no installation required', d: 'Open a link and immediately participate from any device, anywhere.' },
                  { t: 'Real-time collaboration via simple link', d: 'Multiple stakeholders work simultaneously on the same canvas.' },
                  { t: 'Structured data export (JSON)', d: 'Every placement recorded as a coordinate set — not just a pixel.' },
                  { t: 'Professional CAD / BIM integration', d: 'Output flows directly into Rhino, AutoCAD, and BIM pipelines.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3.5 px-4 bg-[#f7f2e9] rounded-xl border border-[#d8d0c1] transition-colors">
                    <div className="w-2.5 h-2.5 bg-emerald-700 rounded-full flex-shrink-0 mt-1.5" />
                    <div>
                      <div className="font-semibold text-[#1f2937] text-[17px] mb-0.5">{item.t}</div>
                      <div className="text-[#475569] text-[15px] leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 p-5 bg-[#fffdf7]/85 border border-[#d8d0c1] rounded-2xl shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                <div className="text-[13px] text-emerald-700 font-semibold uppercase tracking-wider border-b border-[#d8d0c1] pb-2">Technical Output Comparison</div>
                <div className="p-5 bg-[#f7f2e9] rounded-xl border border-[#d8d0c1]">
                  <div className="text-[#1f2937] font-mono text-[17px] font-semibold mb-1.5">Standard Whiteboard Tools</div>
                  <div className="text-[#64748b] text-[15px]">Figma / Canva / Miro → Visual diagrams only</div>
                  <div className="text-[#94a3b8] text-[15px] mt-1.5">No geometry data · No coordinate output · Dead-end for professionals</div>
                </div>
                <div className="flex justify-center py-0.5">
                  <div className="flex flex-col items-center gap-1 text-emerald-700/70">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                    <span className="text-[13px] text-[#64748b]">LandscapePro changes this</span>
                  </div>
                </div>
                <div className="p-5 bg-emerald-100/70 rounded-xl border border-emerald-200">
                  <div className="text-emerald-700 font-mono text-[17px] font-semibold mb-1.5">LandscapePro Engine</div>
                  <div className="text-[#334155] text-[15px]">Records standardized assets + geometry coordinates</div>
                  <div className="text-emerald-700/80 text-[15px] mt-1.5">→ Direct export to Rhino / BIM / AutoCAD</div>
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 04 SITE LAB: left text, right Hong Lim Park map ───────── */
    {
      id: 4,
      content: (
        <S>
          <H label="Site Laboratory" title="Speaker's Corner" sub="Hong Lim Park, Singapore" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full grid grid-cols-[1fr_1fr] gap-8 items-center -mt-12">
              <div className="flex flex-col gap-3 min-h-0">
                <p className="text-[#334155] text-[18px] leading-relaxed">
                  Chosen as the <span className="text-emerald-400 font-semibold">"Laboratory of Democracy"</span> — the most symbolically
                  democratic public space in Singapore. Our case study hypothesises a total redesign driven entirely by the people.
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { title: 'Democratic Context', desc: 'Testing public agency in spatial decisions' },
                    { title: 'Auditability', desc: 'Every decision fully traceable to source data' },
                    { title: 'Symbolic Location', desc: 'Adjacent to Clarke Quay MRT' },
                  ].map((item, i) => (
                    <div key={i} className="py-3 px-4 bg-[#fffdf7] rounded-xl border border-[#cfc6b5] shadow-[0_6px_16px_rgba(56,48,37,0.09)]">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mb-2" />
                      <h4 className="font-semibold text-[#1f2937] text-[17px] mb-1">{item.title}</h4>
                      <p className="text-[#475569] text-[15px] leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-5 text-[15px] text-[#475569] pt-1 flex-shrink-0">
                  <span>◐ Outdoor Stage & Central Lawn</span>
                  <span>◐ Shaded Perimeters</span>
                  <span className="text-emerald-400 font-semibold">50+ Design Layouts Generated</span>
                </div>
              </div>
              <div className="min-h-0 flex items-start justify-center bg-transparent">
                <img src="/speaker-corner.jpg" alt="Speaker's Corner" className="w-full max-h-[55vh] object-contain rounded-lg" />
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 05 LANDSCAPE PRO ─────────────────────────────────────── */
    {
      id: 5,
      content: (
        <S>
          <H label="The Platform" title="Landscape Pro" sub="Computable Differentiator" />
          {/* Screenshot — larger; table pushed down */}
          <W className="flex-shrink-0 max-h-[42vh] mb-8">
            <div className="h-full flex items-center justify-center bg-transparent">
              <img src="/Landscape-Pro.jpg" alt="Landscape Pro" className="w-full h-full object-contain" />
            </div>
          </W>
          {/* Table + tags below */}
          <div className="flex-1 min-h-0 pb-5">
            <W className="h-full grid grid-cols-[1fr_180px] gap-5 items-start">
              <div className={`${TOKENS.card} overflow-hidden`}>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f4eee3] border-b border-[#d8d0c1]">
                      {['Asset_ID', 'Coord_X', 'Coord_Y', 'Area', 'Rotation', 'Cost'].map((h) => (
                        <th key={h} className="text-left py-3 px-4 text-emerald-700 font-bold uppercase tracking-wider text-sm">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono text-base text-[#334155]">
                    {[
                      ['TREE_S_04', '142.56', '88.91', '3m × 3m', '45°', '$450'],
                      ['SHRUBS_M_12', '144.10', '86.20', '1.8m × 1.8m', '12°', '$120'],
                      ['WATER_P1', '110.22', '75.40', '10m²', '—', '$3,804'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#e5dece] hover:bg-[#faf6ee]">
                        <td className="py-3 px-4 text-emerald-700 font-semibold">{row[0]}</td>
                        {row.slice(1).map((c, j) => <td key={j} className="py-3 px-4">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2">
                {['Browser-based', 'Real-time Sync', 'JSON Export', 'Budget Tracking'].map((t) => (
                  <span key={t} className="text-sm font-bold text-emerald-700 border border-emerald-200 bg-emerald-100/70 px-3 py-2 rounded-full text-center">{t}</span>
                ))}
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 06 LANDSCAPE PRO VIDEO ────────────────────────────────── */
    {
      id: 6,
      content: (
        <S>
          <H label="The Platform" title="Landscape Pro" sub="Demo" />
          <div className="flex-1 min-h-0 pb-6 flex items-center justify-center">
            <W className="h-full flex items-center justify-center">
              <div className="cursor-default max-w-full max-h-[70vh]">
                <video
                  src="/Landscape%20Pro.mp4"
                  controls
                  className="max-w-full max-h-[70vh] rounded-xl border border-white/10 bg-black"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 07 DATA FLOW ─────────────────────────────────────────── */
    {
      id: 7,
      content: (
        <S>
          <H label="The Methodology" title="Data Flow" sub="From Preference to Places" />
          {/* Workflow image — larger, no white base, blended into layout */}
          <W className="pb-2 flex-shrink-0 max-h-[44vh]">
            <div className="h-full flex items-center justify-center bg-transparent">
              <img src="/workflow-visual.jpg" alt="Workflow" className="w-full h-full object-contain" />
            </div>
          </W>
          {/* Steps — larger text */}
          <div className="flex-1 min-h-0 pb-5">
            <W className="h-full flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { step: '50', label: 'Design Layouts', desc: 'Individual sessions' },
                  { step: '50', label: 'JSON Files', desc: 'Coordinate lists' },
                  { step: '1', label: 'Python Aggregator+Grasshopper', desc: 'Spatial density merging' },
                  { step: '1', label: 'Consensus Heatmap', desc: 'Mathematical mandate' },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`${TOKENS.card} p-5 text-center`}>
                      <div className="text-4xl font-bold text-emerald-700 mb-2">{item.step}</div>
                      <div className="font-semibold text-base mb-1">{item.label}</div>
                      <div className="text-[#64748b] text-sm">{item.desc}</div>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                        <ChevronRight className="w-5 h-5 text-emerald-700/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className={`${TOKENS.card} px-6 py-4`}>
                <span className="text-emerald-700 font-semibold text-base">The Mathematical Mandate — </span>
                <span className="text-[#334155] text-base">When 50 individual subjective preferences become coordinate data (X,Y), the aggregated heatmap is no longer a suggestion — it becomes a design directive.</span>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 08 DATA PROCESSING WORKFLOW ──────────────────────────── */
    {
      id: 8,
      content: (
        <S>
          <H label="Application" title="Design Display" sub="Generated Scheme Exploration" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex items-center justify-center max-w-[1540px] px-2 -mt-2">
              <img src="/display.jpg" alt="Design Display" className="w-full h-full object-contain scale-[1.08]" />
            </W>
          </div>
        </S>
      ),
    },

    /* ── 09 DATA PROCESSING WORKFLOW ──────────────────────────── */
    {
      id: 9,
      content: (
        <S>
          <H label="Methodology" title="Data Processing Workflow" sub="How Raw Preferences Become Spatial Outputs" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4">
              {/* Main workflow diagram */}
              <div className="flex-shrink-0 max-h-[58vh] flex items-center justify-center bg-transparent">
                <img src="/logic-bridge.jpg" alt="Data Processing Workflow" className="w-full h-full object-contain" />
              </div>
              {/* Concise explanation for presentation speaking flow */}
              <div className="grid grid-cols-2 gap-4 flex-shrink-0">
                <div className={`${TOKENS.card} px-5 py-4`}>
                  <div className="text-[12px] text-emerald-700 font-semibold uppercase tracking-wider mb-1.5">Input to Audit</div>
                  <p className="text-[#475569] text-[15px] leading-relaxed">
                    50 user preference sessions are collected as JSON coordinate lists, then audited to remove incomplete
                    or low-quality entries before aggregation.
                  </p>
                </div>
                <div className={`${TOKENS.card} px-5 py-4`}>
                  <div className="text-[12px] text-emerald-700 font-semibold uppercase tracking-wider mb-1.5">Aggregation to Plan</div>
                  <p className="text-[#475569] text-[15px] leading-relaxed">
                    Grasshopper-based grid processing computes spatial probabilities, generates a consensus heatmap,
                    and translates statistical outputs into an optimized landscape plan.
                  </p>
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 10 DATA PROCESSING — single large figure ───────────────── */
    {
      id: 10,
      content: (
        <S>
          <H label="Application" title="Data Processing Workflow" sub="Node-Based Processing and Data Translation" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex items-center justify-center max-w-[1540px] px-2 mt-1">
              <div className="w-full h-full flex items-center gap-2">
                <div className="w-[110px] flex-shrink-0 h-[82%] flex flex-col justify-between">
                  {['Fitness', 'Plaza', 'Water', 'Grass', 'Trees'].map((label) => (
                    <div key={label} className="text-[18px] font-semibold text-emerald-700 text-right pr-0.5">
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex-1 h-full flex items-center justify-center">
                  <img src="/data%20process.jpg" alt="Data Processing Workflow" className="w-full h-full object-contain scale-[1.04]" />
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 11 PROCESS A — GEOMETRIC REFINEMENT ───────────────────── */
    {
      id: 11,
      content: (
        <S>
          <H label="Application" title="Process A — Geometric Refinement & Topological Translation" sub="From Pixelated Consensus to Spatial Coherence" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1540px] px-2 -mt-[10px]">
              <div className="flex-shrink-0 h-[62%] flex items-center justify-center">
                <img src="/ProcessA.jpg" alt="Process A Workflow" className="w-full h-full object-contain scale-[1.03]" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-0">
                {[
                  {
                    title: '01. The Pixelated Consensus',
                    desc: 'Raw spatial data generated by the optimization algorithm. Programmatic zones are strictly bound to the 5x5m computational grid, resulting in an accurate but rigid and disjointed layout.',
                  },
                  {
                    title: '02. Boundary Extraction',
                    desc: 'Tracing the threshold between distinct functional zones. The hard edges of the pixels are isolated to form a skeletal vector framework, preparing the data for morphological adjustments.',
                  },
                  {
                    title: '03. Topological Refinement',
                    desc: 'Designer intervention. Jagged data boundaries are organically dissolved into flowing landscape curves for different area, establishing a coherent figure-ground relationship.',
                  },
                ].map((item) => (
                  <div key={item.title} className={`${TOKENS.card} px-4 py-3`}>
                    <div className="text-[14px] font-semibold text-emerald-700 mb-1.5">{item.title}</div>
                    <p className="text-[13px] leading-relaxed text-[#475569]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 12 PROCESS B — CONTEXTUAL CORRECTION ──────────────────── */
    {
      id: 12,
      content: (
        <S>
          <H label="Application" title="Process B — Contextual Correction & Site Adaptation" sub="Human-Led Calibration of Algorithmic Outputs" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1540px] px-2 -mt-[10px]">
              <div className="flex-shrink-0 h-[62%] flex items-center justify-center">
                <img src="/ProcessB.jpg" alt="Process B Workflow" className="w-full h-full object-contain scale-[1.03]" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-0">
                {[
                  {
                    title: '01. Algorithmic Blind Spots',
                    desc: "The raw data consensus mechanically allocates water features along the site's periphery. While statistically valid based on user inputs, this placement neglects environmental realities, exposing the proposed water body to adjacent street noise and fragmented edge conditions.",
                  },
                  {
                    title: '02. Contextual Override',
                    desc: 'Human-led calibration. Edge-adjacent water cells are actively reassigned to mitigate noise exposure and spatial fragmentation. The internal water cluster is simultaneously strengthened to create a consolidated, tranquil core protected from the surrounding urban streetscape.',
                  },
                  {
                    title: '03. Site-Adapted Placement',
                    desc: 'The refined, context-aware layout. The organic water feature is now strategically anchored in the quiet interior of the park. Buffered by surrounding terrain and vegetation, this layout demonstrates the necessity of integrating civic data with professional site analysis.',
                  },
                ].map((item) => (
                  <div key={item.title} className={`${TOKENS.card} px-4 py-3`}>
                    <div className="text-[14px] font-semibold text-emerald-700 mb-1.5">{item.title}</div>
                    <p className="text-[13px] leading-relaxed text-[#475569]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 13 PROCESS C1 — READING URBAN CONTEXT ─────────────────── */
    {
      id: 13,
      content: (
        <S>
          <H
            label="Application"
            title="Process C1 — Reading the Urban Context"
            sub="Surrounding uses, access conditions, and edge characters around the site."
          />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1540px] px-2 mt-5">
              <div className="flex-shrink-0 h-[86%] flex items-center justify-center">
                <img src="/ProcessC1.jpg" alt="Process C1 Urban Context" className="w-full h-full object-contain scale-[1.1]" />
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 14 PROCESS C2 — MOVEMENT STRUCTURE & USER PATTERNS ────── */
    {
      id: 14,
      content: (
        <S>
          <H
            label="Application"
            title="Process C2 — Movement Structure & User Patterns"
            sub="Pedestrian flows, access points, and activity intensity."
          />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1540px] px-2 mt-5">
              <div className="flex-shrink-0 h-[86%] flex items-center justify-center">
                <img src="/ProcessC2.jpg" alt="Process C2 Movement Structure and User Patterns" className="w-full h-full object-contain scale-[1.1]" />
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 15 PROCESS C3 — PROGRAMME RESPONSE & FUNCTIONAL ZONING ─ */
    {
      id: 15,
      content: (
        <S>
          <H
            label="Application"
            title="Process C3 — Programme Response & Functional Zoning"
            sub="Spatial programmes derived from context, movement, and user patterns."
          />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1540px] px-2 mt-5">
              <div className="flex-shrink-0 h-[86%] flex items-center justify-center">
                <img src="/ProcessC3.jpg" alt="Process C3 Programme Response and Functional Zoning" className="w-full h-full object-contain scale-[1.1]" />
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 16 MASTER PLAN ───────────────────────────────────────── */
    {
      id: 16,
      content: (
        <S>
          <H label="Application" title="Master Plan" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-4 max-w-[1580px] px-1 mt-6">
              <div className="flex-shrink-0 h-[90%] flex items-center justify-center">
                <img src="/Master%20plan.png" alt="Master Plan" className="w-full h-full object-contain scale-[1.16]" />
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 17 LIMITATIONS ───────────────────────────────────────── */
    {
      id: 17,
      content: (
        <S>
          <H label="Honest Assessment" title="Limitations & Mitigation" sub="Addressing Methodological Challenges" />
          <div className="flex-1 min-h-0 pb-6 -mt-1">
            <W className="h-full flex flex-col justify-center gap-4">
              {[
                { tag: 'Participation Fatigue', problem: 'When interaction steps are too long or cognitively heavy, participants lose patience and willingness to complete the full design session, reducing both sample size and data quality.', solution: 'Introduce a tiered workflow: a 3-minute quick mode for broad participation and an advanced mode for detailed inputs. Add progress indicators, autosave, and lightweight interaction guidance to reduce drop-off.' },
                { tag: 'Nonsensical Inputs', problem: 'Participants may place assets randomly without genuine spatial intent, generating noise that distorts the aggregated heatmap.', solution: 'AI-assisted outlier detection filters sessions that deviate significantly from spatial logic before aggregation.' },
                { tag: 'Probability Grid Limits', problem: 'The current probability-per-cell model captures spatial preference density well, but it can over-emphasize local hotspots and under-represent sequential spatial experience, edge continuity, and cross-zone relationships.', solution: 'Upgrade from single-cell probability to multi-factor spatial inference: incorporate adjacency penalties, path-network weights, and context-aware smoothing. Then validate outputs with post-optimization expert calibration loops.' },
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_40px_1fr] gap-4 items-center">
                  <div className="p-5 bg-[#fff5f5] rounded-xl border border-[#efc6c6] shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                    <div className="text-xs font-bold text-[#b45353] uppercase tracking-wider mb-2">{item.tag}</div>
                    <p className="text-[#475569] text-base md:text-lg leading-relaxed">{item.problem}</p>
                  </div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-[#94a3b8]" /></div>
                  <div className="p-5 bg-emerald-100/60 rounded-xl border border-emerald-200 shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Mitigation</div>
                    <p className="text-[#334155] text-base md:text-lg leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </W>
          </div>
        </S>
      ),
    },

    /* ── 18 FUTURE VISION ─────────────────────────────────────── */
    {
      id: 18,
      content: (
        <S>
          <H label="Future Development" title="Scaling Beyond the Pilot" sub="From Hong Lim Park to Multi-Site Urban Collaboration" />
          <div className="flex-1 min-h-0 pb-6 overflow-auto">
            <W className="py-2 flex flex-col gap-5">
              <div className={`${TOKENS.card} px-8 py-5 text-center flex-shrink-0`}>
                <p className="text-lg md:text-xl text-[#334155] leading-relaxed">
                  Hong Lim Park is just the <span className="text-emerald-700 font-semibold">Pilot Study</span>.
                  The vision: a city where <span className="text-emerald-700 font-semibold">6 million planners</span> are
                  continuously engaged in redesigning Fort Canning Park, Marina Bay, East Coast Park,
                  and other public landscapes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 flex-shrink-0">
                <div className="p-6 bg-gradient-to-br from-emerald-100/75 to-transparent rounded-2xl border border-emerald-200 shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                  <h4 className="text-xl font-semibold mb-4 text-emerald-700">Public Version</h4>
                  <ul className="space-y-3 text-[#334155]">
                    {['Intuitive human-led layouts', 'Community engagement at scale', 'Web-based, zero-barrier access', 'Real-time budget feedback'].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-base"><div className="w-2.5 h-2.5 bg-emerald-700 rounded-full mt-1.5 flex-shrink-0" />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-gradient-to-br from-sky-100/75 to-transparent rounded-2xl border border-sky-200 shadow-[0_8px_24px_rgba(56,48,37,0.08)]">
                  <h4 className="text-xl font-semibold mb-4 text-sky-700">Pro Version</h4>
                  <ul className="space-y-3 text-[#334155]">
                    {['GNPR & LRR real-time compliance tracking', 'Species growth simulations', 'Automated cost estimation & LCCA', 'Live BIM / Rhino-Inside connection'].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-base"><div className="w-2.5 h-2.5 bg-sky-700 rounded-full mt-1.5 flex-shrink-0" />{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Two images as per user's blue boxes: 1 = Landscape Pro, 2 = Landscape Pro2 */}
              <div className="grid grid-cols-2 gap-6 flex-shrink-0 mt-2">
                <div className="flex items-center justify-center min-h-[24vh] bg-transparent">
                  <img src="/Landscape-Pro.jpg" alt="Landscape Pro" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex items-center justify-center min-h-[24vh] bg-transparent">
                  <img src="/Landscape-Pro2.jpg" alt="Landscape Pro 2" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 19 CONCLUSION ────────────────────────────────────────── */
    {
      id: 19,
      content: (
        <S>
          <div className="flex flex-col h-full items-center justify-center py-6">
            <W className="flex flex-col items-center gap-7 max-w-[1420px]">
              <div className="text-center">
                <div className="text-[11px] font-bold tracking-[0.24em] text-emerald-700 uppercase mb-2.5">Conclusion</div>
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">Towards a Collaborative Dialogue</h2>
                <p className="mt-3 text-[#475569] max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                  Transforming landscape architecture from an opaque expert process into an auditable,
                  human-led, and collaborative workflow.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 w-full">
                {[
                  { icon: <Users className="w-7 h-7 text-emerald-400" />, title: 'Human', desc: 'Human-led choices at every step of the design process' },
                  { icon: <Lightbulb className="w-7 h-7 text-emerald-400" />, title: 'Democratic', desc: "Traceable public agency — every participant's input is counted" },
                  { icon: <Database className="w-7 h-7 text-emerald-400" />, title: 'Computable', desc: 'Seamless export to professional CAD/BIM workflows' },
                ].map((item, idx) => (
                  <div key={idx} className={`${TOKENS.card} p-8 transition-colors text-center`}>
                    <div className="w-16 h-16 rounded-full bg-emerald-100/80 flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-[#475569] text-base md:text-lg leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-5 pt-1">
                <Button size="lg" onClick={() => window.open('https://landscape-configurator.vercel.app/', '_blank')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 text-lg rounded-xl">
                  <MapPin className="mr-2 w-5 h-5" />Try Landscape Pro
                </Button>
                <Button size="lg" onClick={() => navigate('/')} className="bg-[#f4eee3] hover:bg-[#ede4d1] text-[#1f2937] border border-[#cfc6b5] px-10 py-6 text-lg rounded-xl">
                  <Home className="mr-2 w-5 h-5" />Back to Home
                </Button>
              </div>
            </W>
          </div>
        </S>
      ),
    },
  ];

  /* ── Navigation ────────────────────────────────────────────── */
  const nextSlide = useCallback(() => setCurrentSlide((p) => Math.min(p + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((p) => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextSlide, prevSlide, navigate]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      setShowL(e.clientX < w * 0.5 && currentSlide > 0);
      setShowR(e.clientX > w * 0.5 && currentSlide < slides.length - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [currentSlide, slides.length]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea, video, audio, iframe, [contenteditable="true"], [data-no-flip]')) return;
    const x = e.clientX, w = window.innerWidth;
    if (x < w * 0.5) prevSlide();
    else if (x > w * 0.5) nextSlide();
  };

  const cursorStyle = showL ? CURSOR_PREV : showR ? CURSOR_NEXT : 'default';

  return (
    <div
      className="h-screen bg-[#f6f1e7] text-[#1f2937] flex flex-col overflow-hidden select-none [&_.text-white]:text-[#1f2937] [&_.text-gray-300]:text-[#334155] [&_.text-gray-400]:text-[#475569] [&_.text-gray-500]:text-[#64748b] [&_.text-gray-600]:text-[#94a3b8] [&_.text-emerald-400]:text-emerald-700 [&_.text-emerald-400\\/70]:text-emerald-700/80"
      style={{ WebkitUserSelect: 'none', userSelect: 'none', cursor: cursorStyle }}
      onClick={handleClick}
    >
      <nav className="flex-shrink-0 bg-[#f3ede0]/95 backdrop-blur-md border-b border-[#d8d0c1] z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/'); }} className="text-[#64748b] hover:text-[#1f2937] h-8">
            <Home className="w-4 h-4 mr-2" />Home
          </Button>
          <span className="text-sm text-[#64748b] font-medium">{currentSlide + 1} / {slides.length}</span>
          <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://landscape-configurator.vercel.app/', '_blank'); }} className="bg-emerald-100/70 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 h-8">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />Landscape Pro
          </Button>
        </div>
      </nav>

      <div className="flex-1 relative overflow-hidden">
        {slides[currentSlide].content}
      </div>

      <div className="flex-shrink-0 bg-[#f3ede0]/95 backdrop-blur-md border-t border-[#d8d0c1] z-50">
        <div className="px-6 py-2.5">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-[#64748b]">← / → click screen edges · arrow keys</span>
            <span className="text-xs text-[#64748b]">ESC to return home</span>
          </div>
          <div className="h-0.5 bg-[#d8d0c1] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
