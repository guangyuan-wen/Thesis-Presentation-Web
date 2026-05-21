import { useState, useEffect, useCallback } from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Slide { id: number; content: React.ReactNode; }

const T = {
  bg: 'bg-[#f8fafc]',
  ink: 'text-[#1e293b]',
  card: 'bg-white border border-[#e2e8f0] shadow-[0_4px_20px_rgba(30,58,95,0.08)] rounded-xl',
  font: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
};

function S({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden ${T.bg} ${T.ink}`} style={{ fontFamily: T.font }}>
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}

function W({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-[1280px] mx-auto px-10 ${className}`}>{children}</div>;
}

function H({ label, title, sub }: { label?: string; title: string; sub?: string }) {
  return (
    <W className="pt-8 pb-3 flex-shrink-0 text-center">
      {label && <div className="text-xs font-bold tracking-[0.2em] text-[#1e40af] uppercase mb-2">{label}</div>}
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#1e3a5f]">{title}</h2>
      {sub && <p className="mt-2 text-base md:text-lg text-[#475569]">{sub}</p>}
    </W>
  );
}

const CURSOR_PREV = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'white\' stroke=\'%231e40af\' stroke-width=\'2\' d=\'M20 6 L10 16 L20 26\'/%3E%3C/svg%3E") 16 16, auto';
const CURSOR_NEXT = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'white\' stroke=\'%231e40af\' stroke-width=\'2\' d=\'M12 6 L22 16 L12 26\'/%3E%3C/svg%3E") 16 16, auto';

const OFFERS = [
  '招商银行 · 广州分行 / 深圳分行 · 对公市场营销',
  '招商银行 · 总行远程客户经理',
  '华润 · 营销管培',
  '深信服 · 产品经理',
  '广州地铁 · 商业分析岗',
  '特发集团 · 售前支持',
  '玛氏 · 休闲食品事业部 · 创研供应',
];

const MARS_CRITERIA = [
  { biz: '学习敏锐度 (Learning Agility)', landscape: '快速掌握新场地类型、规范与软件工具' },
  { biz: '全局视野与系统性解决问题', landscape: '从概念草图到扩初落地的全流程把控' },
  { biz: '商业洞察力', landscape: '场地调研、痛点挖掘与方案说服力' },
];

const TRANSLATIONS = [
  { biz: '商业 / 需求分析', landscape: '场地调研与痛点挖掘' },
  { biz: '项目管理与统筹', landscape: '从概念草图到扩初设计的落地把控' },
  { biz: '跨部门沟通', landscape: '与甲方、施工方、公众的汇报与协调' },
];

export default function ScauSharing() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showL, setShowL] = useState(false);
  const [showR, setShowR] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      content: (
        <S>
          <div className="flex flex-col items-center justify-center h-full text-center px-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#eff6ff] border border-[#bfdbfe] rounded-full text-[#1e40af] text-sm font-semibold mb-6">
              华南农业大学 · 园林专业分享会
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#1e3a5f] mb-4">
              不设限的风景园林
              <span className="block text-[#2563eb] mt-2 text-3xl md:text-5xl">从数字前沿到多元职场</span>
            </h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mb-8">
              写给大二的你：在 NUS 做毕设与跨界求职的一些感悟
            </p>
            <div className={`${T.card} px-8 py-5 inline-block`}>
              <div className="text-sm text-[#64748b] mb-1">演讲人</div>
              <div className="text-xl font-semibold text-[#1e293b]">温广源</div>
              <div className="text-[#475569] mt-1">2020 级华农园林校友 · NUS 景观建筑在读硕士</div>
            </div>
          </div>
        </S>
      ),
    },
    {
      id: 2,
      content: (
        <S>
          <H label="The Situation" title="打破「专业壁垒」的迷思" sub="用真实的 Offer 矩阵，缓解专业焦虑" />
          <div className="flex-1 min-h-0 pb-6 flex flex-col">
            <W className="flex-shrink-0 mb-4">
              <div className={`${T.card} p-5`}>
                <div className="text-sm font-semibold text-[#1e40af] mb-3">求职战绩（节选）</div>
                <div className="flex flex-wrap gap-2">
                  {OFFERS.map((o) => (
                    <span key={o} className="text-sm px-3 py-1.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-lg text-[#334155]">{o}</span>
                  ))}
                </div>
              </div>
            </W>
            <W className="flex-1 min-h-0 grid lg:grid-cols-2 gap-5 items-stretch">
              <div className={`${T.card} p-5 flex flex-col justify-center`}>
                <p className="text-lg font-medium text-[#1e3a5f] leading-relaxed">
                  一个<span className="text-[#2563eb] font-semibold">纯风景园林本硕生</span>，为什么能拿到这些看似毫不相关的岗位？
                </p>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  承认专业差异的存在，但在真实商业环境中，绝大多数岗位（除少数硬核技术岗）更看重的是
                  <span className="font-semibold text-[#1e293b]">综合素质</span>，而非单一的专业标签。
                </p>
              </div>
              <div className={`${T.card} p-3 flex items-center justify-center min-h-0`}>
                <img src="/mars-jd.png" alt="玛氏 JD 截图" className="w-full max-h-[48vh] object-contain rounded-lg" />
              </div>
            </W>
          </div>
        </S>
      ),
    },
    {
      id: 3,
      content: (
        <S>
          <H label="The Analysis" title="企业到底在买单什么？" sub="借用玛氏 AC 面核心标准，揭秘头部企业选人逻辑" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-[#1e40af] mb-2">核心考核指标</div>
                {MARS_CRITERIA.map((item) => (
                  <div key={item.biz} className={`${T.card} p-4`}>
                    <div className="font-semibold text-[#1e3a5f] mb-1">{item.biz}</div>
                    <div className="text-sm text-[#64748b]">→ {item.landscape}</div>
                  </div>
                ))}
                <p className="text-sm text-[#475569] leading-relaxed pt-2">
                  面试官不考植物学，但会通过简历深挖判断你面对复杂系统时的拆解能力。设计课训练的逻辑推演，正是商业世界渴求的底层资产。
                </p>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1e40af] mb-3">概念转译 · 商业词汇 → 园林语境</div>
                <div className={`${T.card} overflow-hidden`}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f1f5f9] border-b border-[#e2e8f0]">
                        <th className="text-left py-3 px-4 text-[#1e40af] font-bold">商业侧</th>
                        <th className="text-left py-3 px-4 text-[#1e40af] font-bold">园林侧</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSLATIONS.map((row) => (
                        <tr key={row.biz} className="border-b border-[#f1f5f9]">
                          <td className="py-3 px-4 text-[#334155]">{row.biz}</td>
                          <td className="py-3 px-4 text-[#475569]">{row.landscape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </W>
          </div>
        </S>
      ),
    },
    {
      id: 4,
      content: (
        <S>
          <H label="The Action" title="为什么必须重视眼前的设计课？" sub="优秀的跨界能力，必须建立在对本职任务的极高标准之上" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full grid lg:grid-cols-2 gap-6 items-stretch">
              <div className={`${T.card} p-4 flex flex-col min-h-0`}>
                <div className="text-sm font-semibold text-[#1e40af] mb-3">学术积累</div>
                <div className="flex-1 min-h-0 flex items-center justify-center bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-2">
                  <img src="/CV.png" alt="简历" className="w-full max-h-[50vh] object-contain" />
                </div>
                <ul className="mt-3 space-y-1 text-sm text-[#475569]">
                  <li>· 专业排名前 3%（GPA 4.21）</li>
                  <li>· 国家奖学金、丁颖奖学金</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`${T.card} p-5 border-red-200 bg-red-50/50`}>
                  <div className="text-red-700 font-bold text-sm mb-2">错误心态</div>
                  <p className="text-[#334155] leading-relaxed text-sm">
                    觉得专业没前途 → 设计课投入不足、深度不够 → 缺乏深度思考与解决复杂难题的经验
                  </p>
                </div>
                <div className={`${T.card} p-5 border-[#86efac] bg-emerald-50/30`}>
                  <div className="text-emerald-800 font-bold text-sm mb-2">正确心态</div>
                  <p className="text-[#334155] leading-relaxed text-sm">
                    将设计课视为训练场 → 深入钻研每一个课题逻辑 → 沉淀极强的学习力与抗压韧性
                  </p>
                </div>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  高绩点不是为炫耀，而是企业评估「学习能力」和「态度底线」的最直观证据。若连当下专业课题都不愿深入挖掘，很难说服未来雇主你能在陌生商业挑战中迎难而上。
                </p>
              </div>
            </W>
          </div>
        </S>
      ),
    },
    {
      id: 5,
      content: (
        <S>
          <H label="The Vision" title="风景园林的下一个形态" sub="NUS 毕业设计 · 技术与专业的融合" />
          <div className="flex-1 min-h-0 pb-6">
            <W className="h-full grid lg:grid-cols-[1fr_1.1fr] gap-6 items-center">
              <div className="space-y-4">
                <div className={`${T.card} p-5`}>
                  <div className="text-lg font-bold text-[#1e3a5f] mb-2">From Preferences to Places</div>
                  <p className="text-sm text-[#475569] leading-relaxed">NUS MLA2 毕业设计 · 作品入选 NUS 设计年鉴</p>
                </div>
                <div className={`${T.card} p-4 space-y-3`}>
                  <div>
                    <div className="font-semibold text-[#1e40af] text-sm">Landscape Pro 平台</div>
                    <p className="text-sm text-[#64748b] mt-1">针对行业「沟通黑盒」，开发可计算的参与式设计工具</p>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1e40af] text-sm">数据闭环</div>
                    <p className="text-sm text-[#64748b] mt-1">用户交互 → 标准化 JSON → Python 处理 → 设计意图热力图</p>
                  </div>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  风景园林没有走到死胡同，它正在与 AI、数据分析深度融合。打好设计基础的同时，积极拥抱新技术，自己去定义专业的边界。
                </p>
                <Button size="sm" data-no-flip onClick={() => window.open('https://landscape-configurator.vercel.app/', '_blank')} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                  体验 Landscape Pro
                </Button>
              </div>
              <div className={`${T.card} p-3 flex items-center justify-center`}>
                <img src="/Landscape-Pro.jpg" alt="Landscape Pro" className="w-full max-h-[52vh] object-contain rounded-lg" />
              </div>
            </W>
          </div>
        </S>
      ),
    },
    {
      id: 6,
      content: (
        <S>
          <div className="flex flex-col h-full items-center justify-center py-8">
            <W className="flex flex-col items-center gap-8 max-w-xl text-center">
              <div>
                <div className="text-xs font-bold tracking-[0.2em] text-[#1e40af] uppercase mb-3">Q & A</div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f]">感谢聆听</h2>
                <p className="mt-4 text-[#475569] text-lg">欢迎提问与交流</p>
              </div>
              <div className={`${T.card} p-8 w-full space-y-3 text-left`}>
                <div>
                  <div className="text-sm text-[#64748b]">演讲人</div>
                  <div className="text-lg font-semibold text-[#1e293b]">温广源</div>
                </div>
                <div>
                  <div className="text-sm text-[#64748b]">微信 / 联系方式</div>
                  <div className="text-[#1e293b] font-medium" data-no-flip>（请在此处补充你的联系方式）</div>
                </div>
              </div>
              <Button variant="outline" data-no-flip onClick={() => navigate('/')} className="border-[#cbd5e1] text-[#475569]">
                <Home className="w-4 h-4 mr-2" />返回首页
              </Button>
            </W>
          </div>
        </S>
      ),
    },
  ];

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
      className={`h-screen ${T.bg} ${T.ink} flex flex-col overflow-hidden select-none`}
      style={{ WebkitUserSelect: 'none', userSelect: 'none', cursor: cursorStyle, fontFamily: T.font }}
      onClick={handleClick}
    >
      <nav className="flex-shrink-0 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/'); }} className="text-[#64748b] hover:text-[#1e293b] h-8">
            <Home className="w-4 h-4 mr-2" />首页
          </Button>
          <span className="text-sm text-[#64748b] font-medium">华农分享会 · {currentSlide + 1} / {slides.length}</span>
          <span className="text-xs text-[#94a3b8] hidden sm:inline">SCAU Landscape · Career Sharing</span>
        </div>
      </nav>
      <div className="flex-1 relative overflow-hidden">{slides[currentSlide].content}</div>
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] z-50">
        <div className="px-6 py-2.5">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-[#64748b]">← / → 点击屏幕两侧 · 方向键翻页</span>
            <span className="text-xs text-[#64748b]">ESC 返回首页</span>
          </div>
          <div className="h-0.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#2563eb] transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
