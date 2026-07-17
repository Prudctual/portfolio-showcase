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
              <svg viewBox="0 0 32 24" className="cat-svg">
                {/* Tail (Smooth S-curve) */}
                <path d="M 6,12.5 C 4,12.5 1.5,9.5 2,5.5 C 2.3,3.5 3.3,3.5 3,5.5 C 2.5,7.8 3.5,10.8 6,10.8 Z" fill="#f97316" className="cat-tail" />
                <path d="M 5.8,11.5 C 4.3,11.5 2,9.2 2.5,6.5 C 2.8,5.2 3.3,5.2 3,6.2 C 2.5,8 3.5,9.8 5.8,9.8 Z" fill="#ea580c" className="cat-tail-stripe" />

                {/* Back Left Leg (Inner, Darker Ginger) */}
                <g className="cat-leg cat-leg-back-inner">
                  <path d="M 7.5,13.5 C 7.5,13.5 6.5,15 6.5,17 C 6.5,19 7,20 8,20 C 8.5,20 8.5,19 8.5,17.5 C 8.5,15.5 9,14 9,13.5 Z" fill="#ea580c" />
                  <path d="M 6.5,19 C 6.5,19.6 7.2,20.2 8,20.2 C 8.5,20.2 8.8,19.6 8.8,19 C 8.8,18.8 6.5,18.8 6.5,19 Z" fill="#ffffff" />
                </g>

                {/* Front Left Leg (Inner, Darker Ginger) */}
                <g className="cat-leg cat-leg-front-inner">
                  <path d="M 18,13.5 C 18,13.5 17.2,15 17.2,17 C 17.2,19 17.5,20 18.5,20 C 19,20 19,19 19,17.5 C 19,15.5 19.5,14 19.5,13.5 Z" fill="#ea580c" />
                  <path d="M 17.2,19 C 17.2,19.6 17.9,20.2 18.5,20.2 C 19,20.2 19.3,19.6 19.3,19 C 19.3,18.8 17.2,18.8 17.2,19 Z" fill="#ffffff" />
                </g>

                {/* Body (Refined Organic Curve with Tabby Stripes) */}
                <path d="M 5.8,10.5 C 5.8,10.5 7.8,7.5 12.5,7.5 C 17.5,7.5 20.5,10.5 20.5,13 C 20.5,15 17.5,16.5 12.5,16.5 C 7.8,16.5 5.8,14 5.8,10.5 Z" fill="#f97316" className="cat-body" />
                <path d="M 9.5,16.5 C 11.5,16.5 13.5,15 15.5,15 C 17,15 18,15.5 18,16.5 Z" fill="#ffffff" className="cat-belly" />
                
                {/* Striping (Cute Curved M-stripes on Back) */}
                <path d="M 9.5,8.5 C 9.2,10.2 9,11.5 8.2,12.5 M 12.8,8 C 12.5,10.2 12,12 11.2,13 M 15.5,8.2 C 15.2,10.5 14.8,12 13.8,13.2" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                {/* Back Right Leg (Outer, Bright Ginger) */}
                <g className="cat-leg cat-leg-back">
                  <path d="M 9.5,13.5 C 9.5,13.5 8.5,15 8.5,17 C 8.5,19 9,20 10,20 C 10.5,20 10.5,19 10.5,17.5 C 10.5,15.5 11,14 11,13.5 Z" fill="#f97316" />
                  <path d="M 8.5,19 C 8.5,19.6 9.2,20.2 10,20.2 C 10.5,20.2 10.8,19.6 10.8,19 C 10.8,18.8 8.5,18.8 8.5,19 Z" fill="#ffffff" />
                </g>

                {/* Front Right Leg (Outer, Bright Ginger) */}
                <g className="cat-leg cat-leg-front">
                  <path d="M 16,13.5 C 16,13.5 15.2,15 15.2,17 C 15.2,19 15.5,20 16.5,20 C 17,20 17,19 17,17.5 C 17,15.5 17.5,14 17.5,13.5 Z" fill="#f97316" />
                  <path d="M 15.2,19 C 15.2,19.6 15.9,20.2 16.5,20.2 C 17,20.2 17.3,19.6 17.3,19 C 17.3,18.8 15.2,18.8 15.2,19 Z" fill="#ffffff" />
                </g>

                {/* Head with Cheeks & Neck */}
                <path d="M 17,11.5 C 17.5,10 19,8 21.8,8 C 24.8,8 26.2,10 26.2,12 C 26.2,14.2 24.2,15.2 21.8,15.2 C 19,15.2 17.8,13 17,11.5 Z" fill="#f97316" className="cat-head" />
                
                {/* Ears with Curves */}
                <path d="M 20,8 C 19.5,6.5 19.2,3 21,3.5 C 21.8,4.2 21.8,6 21.8,8 Z" fill="#f97316" />
                <path d="M 20.3,7.5 C 19.9,6.5 19.7,4.5 20.7,4.8 C 21.2,5.2 21.2,6.5 21.2,7.5 Z" fill="#fda4af" />
                
                <path d="M 23.5,8 C 24,6.5 24.8,3 25.5,3.5 C 25.2,4.8 25,6.5 25,8 Z" fill="#f97316" />
                <path d="M 23.8,7.5 C 24.1,6.5 24.6,4.5 25,4.8 C 24.8,5.5 24.7,6.5 24.7,7.5 Z" fill="#fda4af" />

                {/* Cute Cat Eyes (Big and Slanted) */}
                <ellipse cx="23.2" cy="10.2" rx="1.2" ry="1.7" fill="#84cc16" />
                <line x1="23.2" y1="8.8" x2="23.2" y2="11.6" stroke="#000000" strokeWidth="0.8" />
                
                <ellipse cx="25.5" cy="10.2" rx="1.2" ry="1.7" fill="#84cc16" />
                <line x1="25.5" y1="8.8" x2="25.5" y2="11.6" stroke="#000000" strokeWidth="0.8" />

                {/* Whiskers Pad and Pink Nose */}
                <circle cx="24.1" cy="12" r="1.5" fill="#fef08a" opacity="0.8" />
                <circle cx="25.1" cy="12" r="1.5" fill="#fef08a" opacity="0.8" />
                <polygon points="24.4,11.5 24.8,11.5 24.6,12" fill="#f43f5e" />

                {/* Whiskers */}
                <path d="M 23,12 L 20,11 M 23,12.5 L 19.5,12.5 M 26.2,12 L 29.2,11 M 26.2,12.5 L 29.7,12.5" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
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
