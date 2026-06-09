
import { useState, useEffect, useRef } from "react";

import "./App.css";


/* ─── DATA ──────────────────────────────────────────────────── */

const SKILLS = {

  "Cloud & DevOps": ["Docker","Kubernetes","GCP","Azure","Terraform","OpenTofu","Minikube","Helm","GitOps","CI/CD (GitLab)"],

  "AI / ML": ["Machine Learning","Deep Learning","NLP","RAG","PyTorch","TensorFlow","HuggingFace","spaCy","Ollama","Stable Baselines 3","MLFlow","DVC","PPO · SAC · DQN","Grad-CAM","MCTS"],

  "Backend & Architecture": ["Spring Boot","FastAPI","REST APIs","Microservices","Event Sourcing","DDD","Hexagonal Arch","RabbitMQ","Keycloak","SOLID Principles"],

  "Frontend": ["React","TypeScript","React Query","React Hook Form","HTML/CSS","Tailwind","Bootstrap"],

  "Languages": ["Java","Python","JavaScript/TypeScript","SQL","Haskell","C","C++","VB.NET"],

  "Databases & Tools": ["PostgreSQL","MongoDB","Supabase","TensorBoard","Prometheus","Grafana","PowerBI","Figma"],

};



const EXPERIENCE = [

  {

    role: "End-to-End Platform Developer",

    company: "SquadAssist",

    location: "Leuven, Belgium",

    period: "Mar 2026 – Jun 2026",

    type: "Internship",

    bullets: [

      "Football analytics startup serving professional clubs across Europe",

      "Built new Scouting Platform from scratch and enhanced existing analytics web app — both shipped to live clients",

      "Co-designed REST API contracts with the CTO; collaborated with CEO on product decisions and UX",

    ],

  },

  {

    role: "AI Observability Researcher",

    company: "FlowFactor",

    location: "Remote",

    period: "Feb 2026 – Mar 2026",

    type: "Industry Lab",

    bullets: [

      "Deployed AI-enhanced observability stack on Kubernetes (HolmesGPT + Prometheus + Grafana + Alertmanager)",

      "Automated alert triage: system generates root cause analyses before an engineer intervenes",

      "Full IaC with Terraform + Helm; security-evaluated LLM access to live production data",

      "Presented findings to 100+ industry professionals",

    ],

  },

];



const PROJECTS = [

  {

    title: "BanditGames",

    subtitle: "AI-Powered Board Game Platform",

    tags: ["Full-stack","AI/ML","Microservices","Team"],

    desc: "Competitive board game platform with a full AI intelligence layer: MCTS opponent with dynamic difficulty, RAG chatbot, ML models for move prediction and win probability, and a self-play data pipeline.",

    tech: "Spring Boot · React · MCTS · RAG · MLFlow · DVC · FastAPI · RabbitMQ · Docker",

    accent: "#c8a96e",

  },

  {

    title: "HolmesGPT on K8s",

    subtitle: "AI-Assisted Incident Response",

    tags: ["DevOps","AI Observability","FlowFactor"],

    desc: "AI-enhanced observability stack that automatically investigates Kubernetes alerts, gathers logs/cluster state, and generates root cause analyses before a human engineer intervenes.",

    tech: "Kubernetes · Terraform · Helm · Prometheus · Grafana · Alertmanager · IaC · GitOps",

    accent: "#7eb8a4",

  },

  {

    title: "Keep Dishes Going",

    subtitle: "Food Ordering Marketplace",

    tags: ["Full-stack","Event Sourcing","DDD","Team"],

    desc: "Production-grade marketplace using DDD, Hexagonal Architecture, and Event Sourcing. Real-time order tracking, scheduled menu publishing, and price range evolution graphing.",

    tech: "Spring Boot · React · TypeScript · Event Sourcing · RabbitMQ · Keycloak · PostgreSQL",

    accent: "#a8886a",

  },

  {

    title: "Multi-Agent Story Writer",

    subtitle: "Collaborative LLM Pipeline",

    tags: ["Agentic AI","Local LLMs","Team"],

    desc: "Four specialized LLM agents (Plot, Character, Scene, Editor) collaborate to produce coherent 1000–1500 word stories. Runs entirely on local Ollama models with iterative refinement loops.",

    tech: "Ollama · Local LLMs · Python · FastAPI · Multi-agent architecture · Prompt engineering",

    accent: "#8a9bb5",

  },

  {

    title: "eVALeBike",

    subtitle: "E-Bike Test Bench System",

    tags: ["Cloud","IoT","Real Client"],

    desc: "Cloud-based management system for a physical e-bike diagnostic test bench. Role-based UIs for technicians/admins/customers, live sensor streaming, automated test reports.",

    tech: "React · Google Cloud · OPC UA · ADS Protocol · PostgreSQL · PDF reports",

    accent: "#7a9e7e",

  },

  {

    title: "NLP Sentiment Pipeline",

    subtitle: "Transformer-based Analysis",

    tags: ["NLP","HuggingFace","ML"],

    desc: "Sentiment analysis pipeline using HuggingFace transformer models and spaCy. Sentence extraction, tokenization, entity recognition, and positive/negative sentiment classification.",

    tech: "HuggingFace · Transformers · spaCy · NLP · Python",

    accent: "#b5a07a",

  },

  {

    title: "DL Vision Classifier",

    subtitle: "Transfer Learning Study",

    tags: ["Computer Vision","ML","Team"],

    desc: "Fine-tuned ResNet, VGG, and EfficientNet on real-world image classification. Systematic hyperparameter experiments, Grad-CAM explainability, benchmarked vs CNN from scratch.",

    tech: "PyTorch · ResNet · EfficientNet · Grad-CAM · TensorBoard · Google Colab",

    accent: "#9e8ab0",

  },

  {

    title: "EnviroAlert",

    subtitle: "IoT Smoke & Air Quality Monitor",

    tags: ["IoT","Arduino","Hardware"],

    desc: "End-to-end IoT system with Arduino sensors for real-time smoke and air quality monitoring. Live sensor graphs, multi-device support across apartment spaces, end-user management dashboard.",

    tech: "Arduino · C++ · IoT · Real-time graphs · Web dashboard · Multi-device",

    accent: "#6e9aaa",

  },

];



const EDUCATION = [

  {

    degree: "Applied Computer Science (Professional Bachelor)",

    school: "Karel de Grote Hogeschool",

    location: "Antwerp, Belgium",

    period: "2023 – 2026",

  },

  {

    degree: "Computer Science",

    school: "Jacobs University",

    location: "Bremen, Germany",

    period: "2022 – 2023",

  },

  {

    degree: "GCE A-Levels — Computer Science",

    school: "Roots School System",

    location: "Islamabad, Pakistan",

    period: "2020 – 2022",

  },

];



/* ─── HOOKS ─────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {

  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const obs = new IntersectionObserver(

        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },

        { threshold }

    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();

  }, [threshold]);

  return { ref, visible };

}



/* ─── COMPONENTS ────────────────────────────────────────────── */

function GlassCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {

  return (

      <div className={`glass-card ${className}`} style={style}>

        {children}

      </div>

  );

}



function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {

  const { ref, visible } = useInView();

  return (

      <div

          ref={ref}

          className={`anim-section ${visible ? "anim-visible" : ""} ${className}`}

          style={{ transitionDelay: `${delay}ms` }}

      >

        {children}

      </div>

  );

}



function HeroSection() {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });



  useEffect(() => {

    const handle = (e: MouseEvent) => {

      setMousePos({

        x: (e.clientX / window.innerWidth - 0.5) * 20,

        y: (e.clientY / window.innerHeight - 0.5) * 20,

      });

    };

    window.addEventListener("mousemove", handle);

    return () => window.removeEventListener("mousemove", handle);

  }, []);



  return (

      <section className="hero">

        <div
            className="hero-bg-parallax"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
            }}
        />

        <div className="hero-content">

          <div className="hero-eyebrow">Applied Computer Science · KdG Antwerp</div>

          <h1 className="hero-name">

            <span className="hero-name-line hero-name-line-2">Abdul Momin</span>



          </h1>

          <p className="hero-tagline">

            Full-Stack Developer, AI/ML Engineer &amp; DevOps

          </p>

          <div className="hero-links">

            <a href="mailto:abdulmominam7@gmail.com" className="hero-link">Email</a>

            <a href="https://www.linkedin.com/in/abdul-momin-1561b8203" target="_blank" rel="noreferrer" className="hero-link">LinkedIn</a>

            <a
                href="https://docs.google.com/document/d/1WuUsIvcECETVdtYV854zA-mKcKp2Ifv8UbReYrCFlM0/export?format=pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-link hero-link-resume"
            >
              ↓ Resume
            </a>

          </div>

        </div>

        <div className="hero-quote">
          “Great developers aren’t born — they’re built through mistakes, learning, and persistence.”</div>

        <div className="hero-scroll-hint">

          <span>scroll</span>

          <div className="scroll-line" />

        </div>

      </section>

  );

}



function ExperienceSection() {

  return (

      <section className="section" id="experience">

        <AnimatedSection>

          <div className="section-header">

            <span className="section-number">01</span>

            <h2 className="section-title">Experience</h2>

          </div>

        </AnimatedSection>

        <div className="experience-list">

          {EXPERIENCE.map((exp, i) => (

              <AnimatedSection key={i} delay={i * 100}>

                <GlassCard className="exp-card">

                  <div className="exp-top">

                    <div>

                      <div className="exp-role">{exp.role}</div>

                      <div className="exp-company">{exp.company} <span className="exp-location">· {exp.location}</span></div>

                    </div>

                    <div className="exp-right">

                      <span className="exp-type">{exp.type}</span>

                      <span className="exp-period">{exp.period}</span>

                    </div>

                  </div>

                  <ul className="exp-bullets">

                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}

                  </ul>

                </GlassCard>

              </AnimatedSection>

          ))}

        </div>

      </section>

  );

}



function ProjectsSection() {

  return (

      <section className="section" id="projects">

        <AnimatedSection>

          <div className="section-header">

            <span className="section-number">02</span>

            <h2 className="section-title">Projects</h2>

          </div>

        </AnimatedSection>

        <div className="projects-grid">

          {PROJECTS.map((p, i) => (

              <AnimatedSection key={i} delay={(i % 3) * 80}>

                <GlassCard className="proj-card">

                  <div className="proj-tags">

                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}

                  </div>

                  <h3 className="proj-title">{p.title}</h3>

                  <p className="proj-subtitle">{p.subtitle}</p>

                  <p className="proj-desc">{p.desc}</p>

                  <div className="proj-tech">{p.tech}</div>

                </GlassCard>

              </AnimatedSection>

          ))}

        </div>

      </section>

  );

}



function SkillsSection() {

  return (

      <section className="section" id="skills">

        <AnimatedSection>

          <div className="section-header">

            <span className="section-number">03</span>

            <h2 className="section-title">Skills</h2>

          </div>

        </AnimatedSection>

        <div className="skills-grid">

          {Object.entries(SKILLS).map(([cat, items], i) => (

              <AnimatedSection key={cat} delay={i * 60}>

                <GlassCard className="skill-card">

                  <h3 className="skill-cat">{cat}</h3>

                  <div className="skill-tags">

                    {items.map(item => <span key={item} className="skill-tag">{item}</span>)}

                  </div>

                </GlassCard>

              </AnimatedSection>

          ))}

        </div>

      </section>

  );

}



function EducationSection() {

  return (

      <section className="section" id="education">

        <AnimatedSection>

          <div className="section-header">

            <span className="section-number">04</span>

            <h2 className="section-title">Education</h2>

          </div>

        </AnimatedSection>

        <div className="education-list">

          {EDUCATION.map((e, i) => (

              <AnimatedSection key={i} delay={i * 100}>

                <GlassCard className="edu-card">
                  <div className="edu-degree" title={e.degree}>
                    {e.degree}
                  </div>

                  <div className="edu-school" title={e.school}>
                    {e.school}
                  </div>

                  <div className="edu-meta" title={`${e.location} · ${e.period}`}>
                    {e.location} · {e.period}
                  </div>
                </GlassCard>

              </AnimatedSection>

          ))}

        </div>

      </section>

  );

}


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [["Experience","#experience"],["Projects","#projects"],["Skills","#skills"],["Education","#education"]];

  return (
      <>
        <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
          <div className="nav-inner">
            <div className="nav-logo">AM</div>
            {/* Desktop links */}
            <div className="nav-links-desktop">
              {links.map(([label, href]) => (
                  <a key={label} href={href} className="nav-link">{label}</a>
              ))}
            </div>
            <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile overlay — lives outside <nav> so fixed positioning works correctly */}
        {menuOpen && (
            <div className="nav-mobile-overlay">
              <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label="close menu">✕</button>
              {links.map(([label, href]) => (
                  <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
            </div>
        )}
      </>
  );
}



export default function App() {

  return (

      <div className="app">

        <Nav />

        <HeroSection />

        <main className="main">

          <ExperienceSection />

          <ProjectsSection />

          <SkillsSection />

          <EducationSection />

        </main>

        <footer className="footer">

          <p>Abdul Momin · Applied Computer Science · KdG Antwerp · 2026</p>

        </footer>

      </div>

  );

}