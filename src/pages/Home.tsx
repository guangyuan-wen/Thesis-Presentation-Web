import { ArrowRight, ChevronDown, Users, Database, Workflow, MapPin, Lightbulb, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

export default function Home() {
  const navigate = useNavigate();

  const scrollToContent = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">LandscapePro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-emerald-400 transition-colors">Workflow</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.jpg" alt="Urban Park" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          {/* Badge — fades in first */}
          <div
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm"
            style={{ animation: 'heroFadeUp 0.8s ease 0.1s both' }}
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Design Thesis 2026
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ animation: 'heroFadeUp 0.8s ease 0.25s both' }}
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              From Preferences
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              To Places
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            style={{ animation: 'heroFadeUp 0.8s ease 0.4s both' }}
          >
            A Computable, Human-led Workflow for Redesigning Urban Parks
          </p>

          <p
            className="text-gray-400 mb-12 max-w-2xl mx-auto"
            style={{ animation: 'heroFadeUp 0.8s ease 0.5s both' }}
          >
            Transforming landscape architecture from an opaque expert process into an auditable,
            human-led, and collaborative workflow.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: 'heroFadeUp 0.8s ease 0.65s both' }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/presentation')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-xl group"
            >
              View Presentation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={() => window.open('https://landscape-configurator.vercel.app/', '_blank')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
            >
              Landscape Pro Interface
            </Button>
          </div>

          <div
            className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500"
            style={{ animation: 'heroFadeUp 0.8s ease 0.8s both' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">Presenter:</span>
              <span>Wen Guangyuan</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">Advisors:</span>
              <span>Ervine LIN, Dorothy TANG</span>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-400 hover:text-white transition-colors"
          style={{ animation: 'heroFadeUp 1s ease 1.1s both' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Scroll Down</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Tool Gap in Design</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Why can't we do collaborative landscape master planning like we do with Word documents and Excel sheets?
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Fragmentation vs Unity",
                desc: "Office collaboration is seamless, but Master Planning is stuck in single-user expert silos."
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Accessibility Gap",
                desc: "Specialized CAD/BIM tools are too heavy for effective public or client engagement."
              },
              {
                icon: <Workflow className="w-8 h-8" />,
                title: "Technical Output",
                desc: "Unlike whiteboard tools, this engine records standardized assets for professional workflow integration."
              }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Site Lab ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0f1a15]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  Case Study
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Site Lab: Speaker's Corner
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Hong Lim Park, Singapore
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Chosen as the "Laboratory of Democracy"—the most symbolic space for public agency in Singapore.
                  Our case study hypothesizes a total redesign driven by the people.
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Democratic Context", desc: "Testing public agency in design decisions" },
                    { title: "Auditability", desc: "Traceable decisions with full transparency" },
                    { title: "Symbolic Location", desc: "Next to Clarke Quay MRT with high visibility" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="relative">
                <img
                  src="/honglim-park.jpg"
                  alt="Hong Lim Park"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 p-6 bg-[#1a1a1a] rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-emerald-400">300+</div>
                  <div className="text-gray-400 text-sm">Design Layouts Generated</div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Workflow ───────────────────────────────────── */}
      <section id="workflow" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Flow: Preference to Places</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From individual subjective preferences to geographical coordinate data—
              the aggregated heatmap becomes a mathematical mandate.
            </p>
          </Reveal>

          <Reveal>
            <img
              src="/workflow-visual2.jpg"
              alt="Workflow Visualization"
              className="w-full rounded-2xl mb-12"
            />
          </Reveal>

          {/* Timeline: one line connecting 01 → 02 → 03 → 04 */}
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-500/30" aria-hidden />
            <div className="grid md:grid-cols-4 gap-6 relative">
              {[
                { step: "01", title: "Harvest", desc: "Users enter via simple link" },
                { step: "02", title: "Export", desc: "JSON coordinate list generated" },
                { step: "03", title: "Aggregate", desc: "Python merges data points" },
                { step: "04", title: "Translate", desc: "IF-THEN rules for CAD/BIM" }
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0a0a0a] border-2 border-emerald-500/50 text-2xl md:text-3xl font-bold text-emerald-400 mb-3 relative z-10">
                      {item.step}
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Computable Differentiator ──────────────────── */}
      <section className="py-24 px-6 bg-[#0f1a15]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            <Reveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Computable Differentiator
                </h2>
                <p className="text-gray-400 mb-8">
                  Every "click" is captured as a structured coordinate set. This allows the layout to be instantly
                  exported into JSON for professional Rhino, BIM, or AutoCAD integration.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: <Lightbulb className="w-5 h-5" />, title: "Human-led Choices", desc: "Intuitive public participation" },
                    { icon: <BarChart3 className="w-5 h-5" />, title: "Traceable Agency", desc: "Every decision recorded" },
                    { icon: <Database className="w-5 h-5" />, title: "Seamless Export", desc: "Direct CAD/BIM integration" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
                <div className="text-sm text-gray-500 mb-4">Sample Data Export (JSON)</div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "Asset_ID": "TREE_S_04",
  "Coord_X": 142.56,
  "Coord_Y": 88.91,
  "Area": "3m x 3m",
  "Rotation": "45°",
  "Cost": 450
}
{
  "Asset_ID": "SHRUBS_M_12",
  "Coord_X": 144.10,
  "Coord_Y": 86.20,
  "Area": "1.8m x 1.8m",
  "Rotation": "12°",
  "Cost": 120
}
{
  "Asset_ID": "WATER_P1",
  "Coord_X": 110.22,
  "Coord_Y": 75.40,
  "Area": "10m²",
  "Cost": 3804
}`}</code>
                </pre>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Future Vision ──────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Future Vision</h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-12">
              Hong Lim Park is just the beginning. We aim to build a democratic design engine for the entire Singapore Green Network.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Reveal delay={0}>
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-emerald-400">Public Version</h3>
                <p className="text-gray-400">For intuitive human-led layouts and community engagement</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Pro Version</h3>
                <p className="text-gray-400">GNPR calculations, growth simulations, and live BIM connections</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-t from-emerald-900/30 to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">

          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Towards a Collaborative Dialogue
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Transforming landscape architecture from an opaque expert process into an auditable,
              human-led, and collaborative workflow.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/presentation')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-xl"
              >
                Explore the Research
              </Button>
              <Button
                size="lg"
                onClick={() => window.open('https://landscape-configurator.vercel.app/', '_blank')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
              >
                Try Landscape Pro
              </Button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-white/10">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LandscapePro</span>
              </div>

              <div className="text-gray-500 text-sm text-center">
                <p>NUS Design Thesis 2026</p>
                <p>From Preferences to Places — A Human-led Computational Workflow</p>
              </div>

              <div className="text-gray-500 text-sm">
                © 2026 Wen Guangyuan. All rights reserved.
              </div>
            </div>
          </div>
        </Reveal>
      </footer>

    </div>
  );
}
