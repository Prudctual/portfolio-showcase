import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  MessageSquare, 
  Building2, 
  ExternalLink, 
  Terminal, 
  Download, 
  X,
  Layers,
  Github
} from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  class: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string }[];
  details: {
    overview: string;
    challenges: string[];
    architecture: string[];
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

  // Parallax Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero) {
        // Slow down the hero movement (parallax) and fade it out
        hero.style.transform = `translateY(${scrolled * 0.35}px)`;
        hero.style.opacity = `${Math.max(1 - scrolled / 500, 0)}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      slug: 'agmoney',
      title: 'Agmoney',
      subtitle: 'Financial Spend Firewall for AI Agents',
      description: 'A Cloudflare Worker + Hono secure proxy acting as a financial firewall to restrict runaway spend for AI agents. Encrypts provider keys at rest using AES-256-GCM.',
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
        challenges: [
          'Implemented a secure cryptographic vault utilizing user-specific salts (PBKDF2) to decrypt API keys ephemerally in Worker memory.',
          'Built custom stream-decoding parsers to inspect tokens in real-time server-sent events (SSE) and calculate billing.',
          'Created fail-closed authorization flows preventing any data leakages or runaway requests if database connectivity drops.'
        ],
        architecture: [
          'Edge Computing Proxy (Hono Framework)',
          'Web Crypto API for cryptographic operations',
          'Supabase Realtime for instant budget updates',
          'Ephemerally decrypted Master Keys'
        ]
      }
    },
    {
      id: '2',
      slug: 'sumersend',
      title: 'SumerSend',
      subtitle: 'Visual Messaging Gateway & Transactional Automation',
      description: 'An advanced visual workspace automating customer messaging workflows, integrating local Iraqi mobile payment gateways (Zain Cash, AsiaHawala) with cryptographic signature validation.',
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
        challenges: [
          'Engineered state reconciliation guards to protect payment webhooks against double-spending and replay attacks.',
          'Hardened Supabase database schema to resolve critical Row Level Security (RLS) bypasses and prevent JWT context leakages.',
          'Implemented background task queues using BullMQ and Redis to manage high-throughput messaging campaigns smoothly.'
        ],
        architecture: [
          'Stateful Transaction Reconciliation Engine',
          'Flow-based Interactive Visual Builder (React Canvas)',
          'Redis-backed Message Queuing System',
          'HMAC SHA-256 signature verification'
        ]
      }
    },
    {
      id: '3',
      slug: 'bank-of-agents',
      title: 'Bank of Agents',
      subtitle: 'Neobanking Infrastructure for Autonomous AI Agents',
      description: 'A dedicated neobanking prototype giving AI agents their own wallets, enabling them to make payments, manage transactions, and execute approval flows.',
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
        challenges: [
          'Designed dynamic transaction rules checking daily spending bounds and per-transaction limits in real-time.',
          'Built human-in-the-loop (HITL) approval interfaces with secure tokenized links, ensuring agents cannot self-approve over-budget requests.',
          'Created highly scalable ledger structures managing account relationships and multi-agent wallets with complete relational integrity.'
        ],
        architecture: [
          'Prisma ORM with structured transactional locks',
          'Role-Based Express API validation layers',
          'Human-in-the-Loop (HITL) approval queues',
          'Dynamic spending limit rules engine'
        ]
      }
    },
    {
      id: '4',
      slug: 'sufrah',
      title: 'Sufrah',
      subtitle: 'On-Demand Local Food-Delivery Marketplace',
      description: 'A multi-vendor marketplace application connecting local restaurants with delivery drivers and customers, incorporating localized payment gateways.',
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
        challenges: [
          'Integrated Zain Cash mobile payment webhook reconciliation for instant order confirmation.',
          'Built flexible multi-tenant structures allowing vendors to manage menus, custom options, and pricing independently.',
          'Designed mobile-first responsive interfaces optimized for slow network connections and caching strategies.'
        ],
        architecture: [
          'RESTful Backend Services (Node.js/Express)',
          'Relational database design (PostgreSQL)',
          'Secure mobile gateway checkout flows',
          'Tailored modular state management'
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
            Jasim Kareem
          </a>
          <div className="cat-track">
            <div className="walking-cat">
              <svg viewBox="0 0 24 24" className="cat-svg">
                {/* Tail */}
                <path d="M5,14 C3,14 1,11 2,7 C2.5,5 3.5,6 3,8 C2.5,10 3.5,12 5,12 Z" fill="currentColor" className="cat-tail" />
                {/* Body */}
                <rect x="5" y="10" width="11" height="6" rx="3" fill="currentColor" />
                {/* Neck & Head */}
                <circle cx="15" cy="8" r="3.5" fill="currentColor" />
                {/* Ears */}
                <polygon points="12.5,6 14,2 14.5,5" fill="currentColor" />
                <polygon points="14.5,5 16,2 17.5,6" fill="currentColor" />
                {/* Legs */}
                <rect x="6" y="15" width="1.5" height="4" rx="0.5" fill="currentColor" className="cat-leg cat-leg-back" />
                <rect x="8.5" y="15" width="1.5" height="4" rx="0.5" fill="currentColor" className="cat-leg cat-leg-back-inner" />
                <rect x="11.5" y="15" width="1.5" height="4" rx="0.5" fill="currentColor" className="cat-leg cat-leg-front" />
                <rect x="14" y="15" width="1.5" height="4" rx="0.5" fill="currentColor" className="cat-leg cat-leg-front-inner" />
              </svg>
            </div>
          </div>
          <nav className="header-nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#works" className="nav-link">Works</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag font-mono">
            <Terminal className="w-3.5 h-3.5 mr-2 inline" /> CREATIVE SOFTWARE & SECURITY RESEARCH
          </div>
          <h1>
            Showcase of Works <br />
            <span className="text-zinc-500">and Advanced Engineering Solutions</span>
          </h1>
          <p className="hero-subtitle">
            Designing secure neobanking APIs, transaction automation engines, and edge financial firewalls for the agentic economy and digital payment spaces.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-val">4</div>
              <div className="stat-lbl">Systems Deployed</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">4</div>
              <div className="stat-lbl">Fintech Gateways</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="works" className="projects-section">
        <div className="container">
          <div className="section-title">
            <Layers className="w-5 h-5 text-zinc-400" /> Core Projects
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
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link-btn" title="Visit Site">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="project-title">
                      {project.title}
                    </div>
                    <div className="project-subtitle">{project.subtitle}</div>
                    <p className="project-desc">{project.description}</p>
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
      <section id="about" className="creator-section">
        <div className="container">
          <div className="creator-card">
            <div className="creator-avatar-container">
              <div className="creator-avatar-glow" />
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="creator-avatar-svg">
                <circle cx="50" cy="50" r="48" fill="url(#avatar-grad)" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>
                <path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 70C38.97 70 30 61.03 30 50C30 38.97 38.97 30 50 30C61.03 30 70 38.97 70 50C70 61.03 61.03 70 50 70Z" fill="var(--accent-cyan)" />
                <path d="M50 35C41.72 35 35 41.72 35 50C35 58.28 41.72 65 50 65C58.28 65 65 58.28 65 50C65 41.72 58.28 35 50 35Z" fill="url(#avatar-grad-inner)" opacity="0.8"/>
                <path d="M44 46L48 50L56 42" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="avatar-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#141416" />
                    <stop offset="1" stopColor="#09090b" />
                  </linearGradient>
                  <linearGradient id="avatar-grad-inner" x1="35" y1="35" x2="65" y2="65" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--accent-cyan)" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="var(--accent-purple)" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="creator-info">
              <h3 className="creator-name">Jasim Kareem Badawi</h3>
              <div className="creator-role font-mono">SOFTWARE & SECURITY ENGINEER</div>
              <p className="creator-bio">
                Software engineer and security researcher focused on building resilient financial plumbing, payment gateways, and guardrail proxies for autonomous AI systems. Dedicated to delivering high-performance, polished developer experiences tailored for production environments.
              </p>
              <div className="creator-actions">
                <a 
                  href="https://github.com/Prudctual" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary font-mono"
                >
                  <Github className="w-4 h-4" /> GITHUB
                </a>
                <a 
                  href="/Jasim_Kareem_Badawi_Resume.pdf" 
                  download 
                  className="btn btn-primary"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
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

            <div className="modal-header">
              <div className="modal-title-area">
                <div className="modal-icon-container">
                  {activeProject.icon}
                </div>
                <div className="modal-header-text">
                  <h2>{activeProject.title}</h2>
                  <div className="text-sm font-mono text-zinc-500">{activeProject.subtitle}</div>
                </div>
              </div>

              <div className="modal-link-bar">
                <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  <Github className="w-4 h-4" /> Source Code
                </a>
                <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn primary">
                  <ExternalLink className="w-4 h-4" /> Launch App
                </a>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Overview</div>
                <p className="modal-text">{activeProject.details.overview}</p>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">Engineering Challenges & Solutions</div>
                <ul className={`modal-bullets ${activeProject.class}-bullets`}>
                  {activeProject.details.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">System Architecture & Tech</div>
                <div className="flex flex-wrap gap-2 mt-2">
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
