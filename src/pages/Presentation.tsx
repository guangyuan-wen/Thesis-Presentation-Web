import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Home, MapPin, Users, Database, Lightbulb, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Slide { id: number; content: React.ReactNode; }

/* ── Background wrapper (full-bleed). No bg = very faint honglim-park. ── */
function S({ children, bg, noFaintBg }: { children: React.ReactNode; bg?: string; noFaintBg?: boolean }) {
  const showFaintBg = !noFaintBg && !bg;
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {bg && (
        <>
          <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/65 via-[#0a0a0a]/50 to-[#0a0a0a]/90" />
        </>
      )}
      {showFaintBg && (
        <>
          <img src="/honglim-park.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.065]" aria-hidden />
          <div className="absolute inset-0 bg-[#0a0a0a]/93" />
        </>
      )}
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}

/* ── Content container — left/right margin on every slide ──── */
function W({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[1320px] mx-auto px-12 ${className}`}>
      {children}
    </div>
  );
}

/* ── Slide header: centered, larger, with top spacing ─────────── */
function H({ label, title, sub }: { label?: string; title: string; sub?: string }) {
  return (
    <W className="pt-10 pb-4 flex-shrink-0 text-center">
      {label && <div className="text-xs font-bold tracking-[0.22em] text-emerald-400 uppercase mb-2">{label}</div>}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
      {sub && <p className="mt-2 text-base md:text-lg text-emerald-400 font-medium">{sub}</p>}
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
        <S bg="/hero-bg.jpg">
          <div className="flex flex-col items-center justify-center h-full text-center px-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Design Thesis 2026 · Mid Review
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-3">
              <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent block">From Preferences</span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block">To Places</span>
            </h1>
            <p className="text-lg text-gray-300 mb-7 max-w-xl">A Computable, Human-led Workflow for Redesigning Urban Parks</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Human-led', 'Democratic', 'Computable', 'Collaborative'].map((t) => (
                <span key={t} className="px-3 py-1.5 bg-white/10 rounded-full text-gray-300 text-sm border border-white/15">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">Presenter</div>
                <div className="text-white font-medium text-base">Wen Guangyuan</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">Advisors</div>
                <div className="text-white font-medium">Ervine LIN</div>
                <div className="text-gray-400">Dorothy TANG</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-gray-400 text-xs mb-1">Institution</div>
                <div className="text-white text-sm font-medium">NUS · MLA</div>
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
            <W className="h-full grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  A web-based interface for remote participants — no installation required. Open a link to join
                  the design dialogue and start placing assets on a real site plan.
                </p>
                {[
                  { t: 'Web-based, no installation required', d: 'Open a link and immediately participate from any device, anywhere.' },
                  { t: 'Real-time collaboration via simple link', d: 'Multiple stakeholders work simultaneously on the same canvas.' },
                  { t: 'Structured data export (JSON)', d: 'Every placement recorded as a coordinate set — not just a pixel.' },
                  { t: 'Professional CAD / BIM integration', d: 'Output flows directly into Rhino, AutoCAD, and BIM pipelines.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-4 px-5 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5" />
                    <div>
                      <div className="font-semibold text-white text-base mb-1">{item.t}</div>
                      <div className="text-gray-400 text-base leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Technical Output Comparison</div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-300 font-mono text-base font-semibold mb-2">Standard Whiteboard Tools</div>
                  <div className="text-gray-500 text-base">Figma / Canva / Miro → Visual diagrams only</div>
                  <div className="text-gray-600 text-base mt-2">No geometry data · No coordinate output · Dead-end for professionals</div>
                </div>
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center gap-1 text-emerald-400/50">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                    <span className="text-sm text-gray-600">LandscapePro changes this</span>
                  </div>
                </div>
                <div className="p-6 bg-emerald-500/8 rounded-xl border border-emerald-500/25">
                  <div className="text-emerald-400 font-mono text-base font-semibold mb-2">LandscapePro Engine</div>
                  <div className="text-gray-300 text-base">Records standardized assets + geometry coordinates</div>
                  <div className="text-emerald-400/70 text-base mt-2">→ Direct export to Rhino / BIM / AutoCAD</div>
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
            <W className="h-full grid grid-cols-[1fr_1fr] gap-8 items-stretch">
              <div className="flex flex-col gap-5 min-h-0">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Chosen as the <span className="text-emerald-400 font-semibold">"Laboratory of Democracy"</span> — the most symbolically
                  democratic public space in Singapore. Our case study hypothesises a total redesign driven entirely by the people.
                </p>
                <div className="grid grid-cols-1 gap-4 flex-1 min-h-0">
                  {[
                    { title: 'Democratic Context', desc: 'Testing public agency in spatial decisions' },
                    { title: 'Auditability', desc: 'Every decision fully traceable to source data' },
                    { title: 'Symbolic Location', desc: 'Adjacent to Clarke Quay MRT' },
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mb-3" />
                      <h4 className="font-semibold text-white text-base mb-1.5">{item.title}</h4>
                      <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-6 text-base text-gray-400 pt-1 flex-shrink-0">
                  <span>◐ Outdoor Stage & Central Lawn</span>
                  <span>◐ Shaded Perimeters</span>
                  <span className="text-emerald-400 font-semibold">300+ Design Layouts Generated</span>
                </div>
              </div>
              <div className="min-h-0 flex items-center justify-center bg-transparent">
                <img src="/speaker-corner.jpg" alt="Speaker's Corner" className="w-full h-full object-contain rounded-lg" />
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
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      {['Asset_ID', 'Coord_X', 'Coord_Y', 'Area', 'Rotation', 'Cost'].map((h) => (
                        <th key={h} className="text-left py-3 px-4 text-emerald-400 font-bold uppercase tracking-wider text-sm">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-mono text-base text-gray-300">
                    {[
                      ['TREE_S_04', '142.56', '88.91', '3m × 3m', '45°', '$450'],
                      ['SHRUBS_M_12', '144.10', '86.20', '1.8m × 1.8m', '12°', '$120'],
                      ['WATER_P1', '110.22', '75.40', '10m²', '—', '$3,804'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-emerald-400 font-semibold">{row[0]}</td>
                        {row.slice(1).map((c, j) => <td key={j} className="py-3 px-4">{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2">
                {['Browser-based', 'Real-time Sync', 'JSON Export', 'Budget Tracking'].map((t) => (
                  <span key={t} className="text-sm font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/8 px-3 py-2 rounded-full text-center">{t}</span>
                ))}
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 06 DATA FLOW ─────────────────────────────────────────── */
    {
      id: 6,
      content: (
        <S>
          <H label="The Methodology" title="Data Flow" sub="From Preference to Places" />
          {/* Workflow image — unchanged per user */}
          <W className="pb-3 flex-shrink-0 max-h-[34vh]">
            <div className="rounded-xl overflow-hidden border border-white/10 h-full flex items-center justify-center bg-[#141414]">
              <img src="/workflow-visual.jpg" alt="Workflow" className="w-full h-full object-contain" />
            </div>
          </W>
          {/* Steps — larger text */}
          <div className="flex-1 min-h-0 pb-5">
            <W className="h-full flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { step: '300', label: 'Design Layouts', desc: 'Individual sessions' },
                  { step: '300', label: 'JSON Files', desc: 'Coordinate lists' },
                  { step: '1', label: 'Python Aggregator', desc: 'Spatial density merging' },
                  { step: '1', label: 'Consensus Heatmap', desc: 'Mathematical mandate' },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">{item.step}</div>
                      <div className="font-semibold text-base mb-1">{item.label}</div>
                      <div className="text-gray-500 text-sm">{item.desc}</div>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                        <ChevronRight className="w-5 h-5 text-emerald-400/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-[#141414] rounded-xl px-6 py-4 border border-white/10">
                <span className="text-emerald-400 font-semibold text-base">The Mathematical Mandate — </span>
                <span className="text-gray-300 text-base">When 100 individual subjective preferences become coordinate data (X,Y), the aggregated heatmap is no longer a suggestion — it becomes a design directive.</span>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 07 LOGIC BRIDGE ──────────────────────────────────────── */
    {
      id: 7,
      content: (
        <S>
          <H label="Translating Preference to Rules" title="The Logic Bridge" sub="IF-THEN Design Logic" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full flex flex-col gap-3">
              {/* Logic bridge image — no frame, slightly larger */}
              <div className="flex-shrink-0 max-h-[38vh] flex items-center justify-center bg-transparent">
                <img src="/logic-bridge.jpg" alt="Logic Bridge" className="w-full h-full object-contain" />
              </div>
              {/* Compact: rule + two cards in one row */}
              <div className="grid grid-cols-[1fr_1fr] gap-3 flex-shrink-0">
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Design Rule Example</div>
                  <code className="text-base text-emerald-400 font-mono block leading-snug">
                    IF (User_Dwell_Density &gt; 0.8)<br />
                    &nbsp;&nbsp;AND (Solar_Radiation &gt; 400W)<br />
                    THEN [Add_Canopy_Radius = 6m]
                  </code>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Evidence Chain</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-snug">Every dimension linked to a Rule ID backed by the JSON dataset.</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Full Audit Trail</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-snug">Public preference → density map → rule → CAD. Every decision traceable.</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-emerald-500/8 rounded-xl border border-emerald-500/20 flex-shrink-0">
                <p className="text-gray-300 text-sm"><strong className="text-white">Result: </strong>The final plan is a mathematically mandated response to 300+ participants' spatial preferences — not a subjective expert design.</p>
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 08 HEATMAP — 2×2 grid, four images + titles only ──────── */
    {
      id: 8,
      content: (
        <S>
          <H label="Application" title="Heatmap" sub="Expert Intent vs. User Intuition" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full grid grid-cols-2 grid-rows-2 gap-6">
              {[
                { src: '/tree-large.png', title: 'Public Performance Analysis — Park (Tree) User Large' },
                { src: '/tree-medium.png', title: 'Public Performance Analysis — Park (Tree) User Medium' },
                { src: '/open-plaza-area.png', title: 'Public Performance Analysis — Plaza/Open User circles' },
                { src: '/playground-area.png', title: 'Public Performance Analysis — Playground User circles' },
              ].map((img) => (
                <div key={img.src} className="flex flex-col min-h-0">
                  <div className="flex-1 min-h-0 flex items-center justify-center bg-transparent">
                    <img src={img.src} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="px-2 py-3 text-center flex-shrink-0">
                    <span className="text-sm text-emerald-400 font-semibold leading-tight">{img.title}</span>
                  </div>
                </div>
              ))}
            </W>
          </div>
        </S>
      ),
    },

    /* ── 09 LIMITATIONS ───────────────────────────────────────── */
    {
      id: 9,
      content: (
        <S>
          <H label="Honest Assessment" title="Limitations & Mitigation" sub="Addressing Methodological Challenges" />
          <div className="flex-1 min-h-0 pb-6 -mt-1">
            <W className="h-full flex flex-col justify-center gap-4">
              {[
                { tag: 'Sampling Bias', problem: 'Online tools may exclude elderly users and those without reliable digital access, skewing the dataset toward a younger, tech-literate demographic.', solution: 'Deploy physical tablets on-site at Hong Lim Park to capture in-person participants alongside the digital cohort.' },
                { tag: 'Nonsensical Inputs', problem: 'Participants may place assets randomly without genuine spatial intent, generating noise that distorts the aggregated heatmap.', solution: 'AI-assisted outlier detection filters sessions that deviate significantly from spatial logic before aggregation.' },
                { tag: 'Technical Logic Constraints', problem: 'IF-THEN rules may inadvertently suppress creative or unconventional design solutions outside the predefined logic space.', solution: 'Future versions will include a "Free Draw" mode alongside the structured IF-THEN workflow.' },
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_40px_1fr] gap-4 items-center">
                  <div className="p-5 bg-red-500/5 rounded-xl border border-red-500/15">
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">{item.tag}</div>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">{item.problem}</p>
                  </div>
                  <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-gray-600" /></div>
                  <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/15">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Mitigation</div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </W>
          </div>
        </S>
      ),
    },

    /* ── 10 FUTURE VISION ─────────────────────────────────────── */
    {
      id: 10,
      content: (
        <S noFaintBg>
          {/* Singapore green map — darkened to match theme */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Singapore-green.png"
              alt="Singapore Green Network"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.12) saturate(2) hue-rotate(80deg)', mixBlendMode: 'normal' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]/85" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <H label="Future Development" title="Scaling Beyond the Pilot" sub="From Hong Lim Park to the Singapore Green Network" />
            <div className="flex-1 min-h-0 pb-6 overflow-auto">
              <W className="py-2 flex flex-col gap-5">
                <div className="bg-white/5 rounded-2xl px-8 py-5 border border-white/10 text-center flex-shrink-0">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Hong Lim Park is just the <span className="text-emerald-400 font-semibold">Pilot Study</span>.
                    The vision: a city where <span className="text-emerald-400 font-semibold">6 million planners</span> are
                    continuously engaged in redesigning Fort Canning Park, Marina Bay, East Coast Park,
                    and the entire Singapore Green Network.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 flex-shrink-0">
                  <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/20">
                    <h4 className="text-xl font-semibold mb-4 text-emerald-400">Public Version</h4>
                    <ul className="space-y-3 text-gray-300">
                      {['Intuitive human-led layouts', 'Community engagement at scale', 'Web-based, zero-barrier access', 'Real-time budget feedback'].map((t) => (
                        <li key={t} className="flex items-start gap-3 text-base"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl border border-cyan-500/20">
                    <h4 className="text-xl font-semibold mb-4 text-cyan-400">Pro Version</h4>
                    <ul className="space-y-3 text-gray-300">
                      {['GNPR & LRR real-time compliance tracking', 'Species growth simulations', 'Automated cost estimation & LCCA', 'Live BIM / Rhino-Inside connection'].map((t) => (
                        <li key={t} className="flex items-start gap-3 text-base"><div className="w-2.5 h-2.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />{t}</li>
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
          </div>
        </S>
      ),
    },

    /* ── 11 EXPERT EXTENSION ──────────────────────────────────── */
    {
      id: 11,
      content: (
        <S>
          <H label="Next Steps" title="The Expert Extension" sub="Upgrading from Prototype to Professional Engine" />
          <div className="flex-1 min-h-0 pb-6 overflow-auto">
            <W className="pt-4 pb-4 flex flex-col gap-6">
              <p className="text-center text-gray-400 text-lg">Moving from a preference prototype to a full-grade engine for collaborative urbanism.</p>
              <div className="grid grid-cols-4 gap-5 flex-shrink-0">
                {[
                  { icon: '🌿', area: 'Botany', feature: 'Species-specific growth metrics & biodiversity selection integrated into every asset placement decision.' },
                  { icon: '⚖️', area: 'Policy', feature: 'GNPR & LRR real-time compliance tracking. Every public submission automatically verified against regulations.' },
                  { icon: '📊', area: 'Economics', feature: 'Automated cost estimation and full lifecycle maintenance cost analysis (LCCA) per design session.' },
                  { icon: '🔗', area: 'Technical', feature: 'Direct live connection to BIM / Rhino-Inside. Closes the loop from public preference to construction docs.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="font-semibold text-emerald-400 mb-3 text-lg">{item.area}</h4>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">{item.feature}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                {['Current: Public Prototype', 'v2: Expert Modules', 'v3: City-Scale Network', 'v4: Live BIM Pipeline'].map((phase, i) => (
                  <div key={i} className={`px-5 py-4 text-center text-sm font-semibold ${i === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#141414] text-gray-500'}`}>{phase}</div>
                ))}
              </div>
            </W>
          </div>
        </S>
      ),
    },

    /* ── 12 CONCLUSION ────────────────────────────────────────── */
    {
      id: 12,
      content: (
        <S>
          <div className="flex flex-col h-full items-center justify-center py-8">
            <W className="flex flex-col items-center gap-6">
              <div className="text-center">
                <div className="text-[10px] font-bold tracking-[0.22em] text-emerald-400 uppercase mb-2">Conclusion</div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Towards a Collaborative Dialogue</h2>
                <p className="mt-2 text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">Transforming landscape architecture from an opaque expert process into an auditable, human-led, and collaborative workflow.</p>
              </div>
              <div className="grid grid-cols-3 gap-5 w-full">
                {[
                  { icon: <Users className="w-7 h-7 text-emerald-400" />, title: 'Human', desc: 'Human-led choices at every step of the design process' },
                  { icon: <Lightbulb className="w-7 h-7 text-emerald-400" />, title: 'Democratic', desc: "Traceable public agency — every participant's input is counted" },
                  { icon: <Database className="w-7 h-7 text-emerald-400" />, title: 'Computable', desc: 'Seamless export to professional CAD/BIM workflows' },
                ].map((item, idx) => (
                  <div key={idx} className="p-7 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/25 transition-colors text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">{item.icon}</div>
                    <h4 className="text-lg font-semibold mb-1.5">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => window.open('https://landscape-configurator.vercel.app/', '_blank')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 text-base rounded-xl">
                  <MapPin className="mr-2 w-5 h-5" />Try Landscape Pro
                </Button>
                <Button size="lg" onClick={() => navigate('/')} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-5 text-base rounded-xl">
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
      className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden select-none"
      style={{ WebkitUserSelect: 'none', userSelect: 'none', cursor: cursorStyle }}
      onClick={handleClick}
    >
      <nav className="flex-shrink-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/'); }} className="text-gray-400 hover:text-white h-8">
            <Home className="w-4 h-4 mr-2" />Home
          </Button>
          <span className="text-sm text-gray-500 font-medium">{currentSlide + 1} / {slides.length}</span>
          <Button size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://landscape-configurator.vercel.app/', '_blank'); }} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 h-8">
            <MapPin className="w-3.5 h-3.5 mr-1.5" />Landscape Pro
          </Button>
        </div>
      </nav>

      <div className="flex-1 relative overflow-hidden">
        {slides[currentSlide].content}
      </div>

      <div className="flex-shrink-0 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 z-50">
        <div className="px-6 py-2.5">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-gray-600">← / → click screen edges · arrow keys</span>
            <span className="text-xs text-gray-600">ESC to return home</span>
          </div>
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
