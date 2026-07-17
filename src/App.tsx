import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  MessageSquare, 
  Building2, 
  ExternalLink, 
  Terminal, 
  Download, 
  X,
  Layers
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface Project {
  id: string;
  slug: string;
  title: string;
  arabicTitle: string;
  subtitle: string;
  arabicSubtitle: string;
  description: string;
  arabicDescription: string;
  icon: React.ReactNode;
  class: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string }[];
  details: {
    overview: string;
    arabicOverview: string;
    challenges: string[];
    arabicChallenges: string[];
    architecture: string[];
    arabicArchitecture: string[];
  };
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Spotlight Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      slug: 'agmoney',
      title: 'Agmoney',
      arabicTitle: 'إي جي موني',
      subtitle: 'Financial Spend Firewall for AI Agents',
      arabicSubtitle: 'جدار حماية مالي لوكلاء الذكاء الاصطناعي',
      description: 'A Cloudflare Worker + Hono secure proxy acting as a financial firewall to restrict runaway spend for AI agents. Encrypts provider keys at rest using AES-256-GCM.',
      arabicDescription: 'بروكسي آمن مبني على Cloudflare Workers و Hono يعمل كجدار حماية مالي للحد من التكاليف المتصاعدة للوكلاء البرمجيين، مع تشفير المفاتيح باستخدام AES-256-GCM.',
      icon: <Shield className="w-6 h-6" />,
      class: 'agmoney',
      tech: ['Cloudflare Workers', 'Hono', 'Supabase', 'Web Crypto API', 'AES-256-GCM'],
      liveUrl: 'https://agmoney.aiandthings.tech',
      githubUrl: 'https://github.com/Prudctual/Agmoney',
      stats: [
        { label: 'Latency', value: '<20ms' },
        { label: 'Security', value: 'AES-256' },
        { label: 'Runtime', value: 'Edge' }
      ],
      details: {
        overview: 'Agmoney serves as a proxy firewall between AI agents and upstream LLM providers (e.g. OpenAI). It prevents rogue loops and uncontrolled spending by enforcing strict budgets dynamically, stored securely inside Supabase database instances.',
        arabicOverview: 'يعمل مشروع إي جي موني كبروكسي وسيط وجدار حماية بين وكلاء الذكاء الاصطناعي ومزودي النماذج اللغوية (مثل OpenAI). يمنع التكرار اللانهائي والصرف غير المحسوب من خلال فرض قيود ميزانية مرنة ومحكمة مخزنة بشكل آمن في قاعدة بيانات Supabase.',
        challenges: [
          'Implemented a secure cryptographic vault utilizing user-specific salts (PBKDF2) to decrypt API keys ephemerally in Worker memory.',
          'Built custom stream-decoding parsers to inspect tokens in real-time server-sent events (SSE) and calculate billing.',
          'Created fail-closed authorization flows preventing any data leakages or runaway requests if database connectivity drops.'
        ],
        arabicChallenges: [
          'تطوير خزنة تشفير آمنة تعتمد على أملاح خاصة بكل مستخدم (PBKDF2) لفك تشفير المفاتيح بشكل مؤقت داخل ذاكرة الـ Worker.',
          'بناء معالجات مخصصة لتحليل حزم البث المباشر (SSE) لحظياً وحساب استهلاك التوكينات وتكلفتها بدقة.',
          'تصميم نظام تحقق مغلق (Fail-Closed) يمنع معالجة أي طلبات في حال فقدان الاتصال بقاعدة البيانات لضمان عدم تجاوز الميزانية.'
        ],
        architecture: [
          'Edge Computing Proxy (Hono Framework)',
          'Web Crypto API for cryptographic operations',
          'Supabase Realtime for instant budget updates',
          'Ephemerally decrypted Master Keys'
        ],
        arabicArchitecture: [
          'بروكسي حوسبة حافة (إطار عمل Hono)',
          'مستشعرات Web Crypto API لمعالجة التشفير بأداء عالٍ',
          'تحديثات ميزانية لحظية عبر Supabase Realtime',
          'فك تشفير مؤقت وسريع للمفاتيح الرئيسية دون حفظها مكشوفة'
        ]
      }
    },
    {
      id: '2',
      slug: 'sumersend',
      title: 'SumerSend',
      arabicTitle: 'سومر سيند',
      subtitle: 'Visual Messaging Gateway & Transactional Automation',
      arabicSubtitle: 'بوابة مراسلات مرئية وتدفقات مالية مؤتمتة',
      description: 'An advanced visual workspace automating customer messaging workflows, integrating local Iraqi mobile payment gateways (Zain Cash, AsiaHawala) with cryptographic signature validation.',
      arabicDescription: 'مساحة عمل بصرية متطورة لأتمتة تدفقات مراسلة العملاء، تدعم بوابات الدفع العراقية المحلية (زين كاش، آسيا حوالة) مع تحقق صارم من التواقيع الرقمية.',
      icon: <MessageSquare className="w-6 h-6" />,
      class: 'sumersend',
      tech: ['Express', 'React', 'Zain Cash API', 'HMAC SHA-256', 'BullMQ', 'Redis'],
      liveUrl: 'https://sumersend.aiandthings.tech',
      githubUrl: 'https://github.com/Prudctual/SumerSend',
      stats: [
        { label: 'Sig Verification', value: 'HMAC' },
        { label: 'Queue Engine', value: 'BullMQ' },
        { label: 'Auth Schema', value: 'RLS' }
      ],
      details: {
        overview: 'SumerSend provides visual flow builders to orchestrate WhatsApp campaigns while securely handling transactional state machines. It integrates Zain Cash ZainPay and AsiaHawala APIs to reconcile payments with atomic precision.',
        arabicOverview: 'يوفر نظام سومر سيند لوحة تحكم بصرية لبناء سيناريوهات تفاعل تلقائي عبر الواتساب مع إدارة آمنة ومحكمة لحالات العمليات المالية، وربطها المباشر ببوابات زين كاش وآسيا حوالة لتسوية الدفعات بدقة متناهية.',
        challenges: [
          'Engineered state reconciliation guards to protect payment webhooks against double-spending and replay attacks.',
          'Hardened Supabase database schema to resolve critical Row Level Security (RLS) bypasses and prevent JWT context leakages.',
          'Implemented background task queues using BullMQ and Redis to manage high-throughput messaging campaigns smoothly.'
        ],
        arabicChallenges: [
          'تصميم نظام مطابقة حالات الحركات المالية لمنع العمليات المكررة (Double-Spend) وحماية الـ Webhooks من هجمات الإعادة (Replay Attacks).',
          'تحصين قواعد بيانات Supabase وحل ثغرات تخطي نظام الأمان (RLS) لمنع تسريب بيانات مستندات JWT للعملاء.',
          'إدارة طوابير المهام الخلفية بالاعتماد على BullMQ و Redis لمعالجة الحمل العالي للمراسلات دون توقف.'
        ],
        architecture: [
          'Stateful Transaction Reconciliation Engine',
          'Flow-based Interactive Visual Builder (React Canvas)',
          'Redis-backed Message Queuing System',
          'HMAC SHA-256 signature verification'
        ],
        arabicArchitecture: [
          'محرك تسوية الحركات المالية وإدارة الحالة المستمرة',
          'مطور تدفقات بصري تفاعلي (React Canvas)',
          'نظام طوابير رسائل مدعوم بـ Redis',
          'نظام تحقق من التواقيع الرقمية باستخدام HMAC SHA-256'
        ]
      }
    },
    {
      id: '3',
      slug: 'bank-of-agents',
      title: 'Bank of Agents',
      arabicTitle: 'مصرف الوكلاء',
      subtitle: 'Neobanking Infrastructure for Autonomous AI Agents',
      arabicSubtitle: 'بنية تحتية مالية رقمية لوكلاء الذكاء الاصطناعي',
      description: 'A dedicated neobanking prototype giving AI agents their own wallets, enabling them to make payments, manage transactions, and execute approval flows.',
      arabicDescription: 'نموذج بنكي متكامل يمنح وكلاء الذكاء الاصطناعي محافظ رقمية خاصة بهم لإجراء الدفعات المالية، وإدارة المعاملات، وتشغيل مسارات موافقة خاضعة للرقابة البشرية.',
      icon: <Building2 className="w-6 h-6" />,
      class: 'bank',
      tech: ['React', 'Express', 'Prisma', 'PostgreSQL', 'JWT', 'TypeScript'],
      liveUrl: 'https://bank.aiandthings.tech',
      githubUrl: 'https://github.com/Prudctual/bank-of-agents',
      stats: [
        { label: 'Database', value: 'Prisma' },
        { label: 'API Latency', value: '<50ms' },
        { label: 'Language', value: 'TypeScript' }
      ],
      details: {
        overview: 'Bank of Agents provides the financial plumbing for agentic workflows. Agents authenticate using secure custom headers, check their credit balances, query transaction limits, and queue payments that require human permission.',
        arabicOverview: 'يوفر مصرف الوكلاء البنية الأساسية للمعاملات المالية لوكلاء الذكاء الاصطناعي. يصادق الوكلاء باستخدام ترويسات برمجية مخصصة للتحقق من الأرصدة، والاستعلام عن حدود الصرف، وجدولة الدفعات التي تتطلب تأكيداً بشرياً.',
        challenges: [
          'Designed dynamic transaction rules checking daily spending bounds and per-transaction limits in real-time.',
          'Built human-in-the-loop (HITL) approval interfaces with secure tokenized links, ensuring agents cannot self-approve over-budget requests.',
          'Created highly scalable ledger structures managing account relationships and multi-agent wallets with complete relational integrity.'
        ],
        arabicChallenges: [
          'تصميم محرك ديناميكي يفحص حدود الصرف اليومية وحد العملية الواحدة بشكل لحظي قبل تمرير المعاملات.',
          'بناء واجهات موافقة تفاعلية للمستخدم البشري بروابط آمنة، تضمن عدم قيام الوكلاء باعتماد طلبات خارج نطاق ميزانيتهم.',
          'تطوير قاعدة بيانات نقدية مرنة لإدارة علاقات الحسابات والمحافظ المتعددة للوكلاء مع ضمان سلامة البيانات الترابطية بالكامل.'
        ],
        architecture: [
          'Prisma ORM with structured transactional locks',
          'Role-Based Express API validation layers',
          'Human-in-the-Loop (HITL) approval queues',
          'Dynamic spending limit rules engine'
        ],
        arabicArchitecture: [
          'طبقة بيانات Prisma ORM مع أقفال حركات مهيكلة',
          'طبقات مصادقة وصلاحيات متطورة عبر Express API',
          'طوابير مراجعة وتأكيد من قبل المنسق البشري',
          'محرك قواعد لتحديد سقوف الإنفاق الديناميكية للعملاء'
        ]
      }
    },
    {
      id: '4',
      slug: 'sufrah',
      title: 'Sufrah',
      arabicTitle: 'سفرة',
      subtitle: 'On-Demand Local Food-Delivery Marketplace',
      arabicSubtitle: 'سوق إلكتروني متكامل لتوصيل الطعام محلياً',
      description: 'A multi-vendor marketplace application connecting local restaurants with delivery drivers and customers, incorporating localized payment gateways.',
      arabicDescription: 'منصة تسوق رقمية متعددة البائعين تربط المطاعم المحلية بسائقين التوصيل والزبائن، مدمجة بنظام تسوية ودفع فوري محلي.',
      icon: <Layers className="w-6 h-6" />,
      class: 'sufrah',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Zain Cash API'],
      liveUrl: 'https://sufrah.aiandthings.tech',
      githubUrl: 'https://github.com/Prudctual/SumerSend', // Using main repo reference
      stats: [
        { label: 'Architecture', value: 'Monolithic' },
        { label: 'Payments', value: 'Zain Cash' },
        { label: 'Frontend', value: 'React' }
      ],
      details: {
        overview: 'Sufrah is a production-focused local delivery system. It manages menus, order workflows, dispatch queues, and customer wallets with mobile-centric designs tailored for local Iraqi market requirements.',
        arabicOverview: 'يمثل مشروع سفرة نظام توصيل طعام محلي متكامل، يدعم إدارة قوائم الأطعمة، تدفق الطلبات، طوابير التوزيع على السائقين، ومحافظ العملاء الرقمية المصممة للهواتف لتلائم متطلبات السوق العراقي.',
        challenges: [
          'Integrated Zain Cash mobile payment webhook reconciliation for instant order confirmation.',
          'Built flexible multi-tenant structures allowing vendors to manage menus, custom options, and pricing independently.',
          'Designed mobile-first responsive interfaces optimized for slow network connections and caching strategies.'
        ],
        arabicChallenges: [
          'دمج واجهات وبوابات دفع زين كاش لتسوية وتأكيد الطلبات تلقائياً وفوراً.',
          'تطوير هيكلية مرنة متعددة المستأجرين (Multi-tenant) تتيح لأصحاب المطاعم التحكم بالقوائم والأسعار بشكل مستقل.',
          'تصميم واجهات متجاوبة مخصصة للهواتف ومحسنة للعمل بأقل سرعات الإنترنت المتاحة مع تفعيل خوارزميات التخزين المؤقت.'
        ],
        architecture: [
          'RESTful Backend Services (Node.js/Express)',
          'Relational database design (PostgreSQL)',
          'Secure mobile gateway checkout flows',
          'Tailored modular state management'
        ],
        arabicArchitecture: [
          'خدمات خلفية برمجية متكاملة (Node.js/Express)',
          'تصميم قاعدة بيانات علائقية محكمة (PostgreSQL)',
          'تدفقات دفع وحساب آمنة مخصصة للموبايل',
          'إدارة حالة نمطية ومرنة تلائم توسع النظام'
        ]
      }
    }
  ];

  return (
    <>
      <div className="grid-bg" />
      <div className="radial-glow" />

      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo">
            ai & things <span className="logo-accent">// showcase</span>
          </a>
          <div className="status-pill">
            <span className="status-dot" />
            SYSTEMS_OPERATIONAL
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag font-mono">
            <Terminal className="w-3.5 h-3.5 mr-2 inline" /> CREATIVE SOFTWARE & SECURITY RESEARCH
          </div>
          <h1 className="arabic-heading">
            واجهة عرض الأعمال <br />
            <span className="text-zinc-500">والحلول البرمجية الفائقة</span>
          </h1>
          <p className="hero-subtitle">
            نطور بنية تحتية برمجية آمنة، بوابات مراسلات ذكية، وأنظمة دفع تلقائية مصممة لتلبية متطلبات الأسواق الرقمية واقتصاد الذكاء الاصطناعي.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-val">4</div>
              <div className="stat-lbl">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">100%</div>
              <div className="stat-lbl">Secure</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">3</div>
              <div className="stat-lbl">Subdomains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="section-title arabic-heading">
            <Layers className="w-5 h-5 text-zinc-400" /> المشاريع الأساسية
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`project-card ${project.class}`}
                onClick={() => setActiveProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div className="card-header">
                    <div className="card-icon-container">
                      {project.icon}
                    </div>
                    <div className="card-links" onClick={(e) => e.stopPropagation()}>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="View Source">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="Visit Site">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="card-body text-right">
                    <div className="project-title arabic-heading justify-end">
                      {project.arabicTitle} <span className="text-sm font-mono text-zinc-500 font-normal">/ {project.title}</span>
                    </div>
                    <div className="project-subtitle arabic-heading">{project.arabicSubtitle}</div>
                    <p className="project-desc">{project.arabicDescription}</p>
                  </div>
                </div>

                <div className="card-footer">
                  {project.tech.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                  {project.tech.length > 3 && <span className="tech-tag">+{project.tech.length - 3}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Profile Section */}
      <section className="creator-section">
        <div className="container">
          <div className="creator-card">
            <div className="creator-avatar">
              JK
            </div>
            <div className="creator-info text-right">
              <h3 className="creator-name arabic-heading">جاسم كريم بدوي</h3>
              <div className="creator-role font-mono">Software & Security Engineer</div>
              <p className="creator-bio">
                مطور برمجيات وباحث أمني متخصص في بناء البنى التحتية البرمجية المعقدة، بوابات الدفع الرقمية، وأدوات الحماية المالية لوكلاء الذكاء الاصطناعي. أركز على تقديم تجارب مستخدم عالية الأداء ومصممة بدقة لتلائم البيئات التشغيلية والإنتاجية الصارمة.
              </p>
              <div className="creator-actions">
                <a 
                  href="https://github.com/Prudctual" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary font-mono"
                >
                  <GithubIcon className="w-4 h-4" /> GITHUB
                </a>
                <a 
                  href="/Jasim_Kareem_Badawi_Resume.pdf" 
                  download 
                  className="btn btn-primary arabic-heading"
                >
                  <Download className="w-4 h-4" /> تحميل السيرة الذاتية
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div>
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لجاسم كريم.
          </div>
          <div className="footer-links">
            <a href="https://github.com/Prudctual" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://agmoney.aiandthings.tech" target="_blank" rel="noopener noreferrer" className="footer-link">Agmoney</a>
            <a href="https://sumersend.aiandthings.tech" target="_blank" rel="noopener noreferrer" className="footer-link">SumerSend</a>
            <a href="https://bank.aiandthings.tech" target="_blank" rel="noopener noreferrer" className="footer-link">Bank of Agents</a>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)}>
              <X className="w-4 h-4" />
            </button>

            <div className="modal-header text-right">
              <div className="modal-title-area justify-end">
                <div className="modal-header-text">
                  <h2 className="arabic-heading">{activeProject.arabicTitle}</h2>
                  <div className="text-sm font-mono text-zinc-500">{activeProject.title} &mdash; {activeProject.subtitle}</div>
                </div>
                <div className="modal-icon-container">
                  {activeProject.icon}
                </div>
              </div>

              <div className="modal-link-bar justify-end">
                <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  <GithubIcon className="w-4 h-4" /> Source Code
                </a>
                <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn primary">
                  <ExternalLink className="w-4 h-4" /> Launch App
                </a>
              </div>
            </div>

            <div className="modal-body text-right">
              <div className="modal-section">
                <div className="modal-section-title arabic-heading">نظرة عامة على المشروع</div>
                <p className="modal-text">{activeProject.details.arabicOverview}</p>
              </div>

              <div className="modal-section">
                <div className="modal-section-title arabic-heading">التحديات البرمجية والحلول</div>
                <ul className={`modal-bullets ${activeProject.class}-bullets`}>
                  {activeProject.details.arabicChallenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <div className="modal-section-title arabic-heading">البنية والهندسة البرمجية</div>
                <div className="flex flex-wrap gap-2 justify-end mt-2">
                  {activeProject.tech.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
