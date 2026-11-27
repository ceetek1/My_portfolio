import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Terminal,
  X,
} from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Bob from "./components/Bob.jsx";
import { highlights, marquee, navItems, profile, projects, skillGroups, tourStops } from "./data.js";
import useScrollScene, { useReducedMotion } from "./hooks/useScrollScene.js";

const ICONS = { layers: Layers3, terminal: Terminal, code: Code2 };

/* Shared SVG filters and gradients used by every painted stroke. */
function PaintDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <filter id="paint" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016 0.045" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="24" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="paint-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.09  0 0 0 0 0.08  0 0 0 0 0.07  1.3 0 0 0 -0.5" />
        </filter>
        <Gradient id="g-orange" from="#E8501A" to="#F7B32B" />
        <Gradient id="g-tone" from="#B8380B" to="#F7A15E" />
        <Gradient id="g-teal" from="#0F6E78" to="#2BB3B1" />
        <Gradient id="g-blue" from="#2D4BB0" to="#2BB3B1" />
        <Gradient id="g-gold" from="#F7B32B" to="#F26B1D" diagonal />
      </defs>
    </svg>
  );
}

function Gradient({ id, from, to, diagonal = false }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2={diagonal ? "1" : "0"}>
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

function Stroke({ d, color, width, opacity, className, delay, ...rest }) {
  return (
    <path
      className={className}
      pathLength={className ? 1 : undefined}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      filter="url(#paint)"
      opacity={opacity}
      style={delay ? { "--d": delay } : undefined}
      {...rest}
    />
  );
}

/* ---------- Nav: full glass bar that tightens into a pill on scroll ---------- */
function TopBar({ section, compact }) {
  const linksRef = useRef(null);
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const link = linksRef.current?.querySelector(`a[href="#${section}"]`);
      setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [section]);

  return (
    <header className={`glass topbar${compact ? " is-compact" : ""}`}>
      <a href="#top" className="brand">
        <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
          <path d="M20,3 C30,3 37,10 37,20 C37,30 30,37 20,37 C10,37 3,30 3,20 C3,10 10,3 20,3 Z" fill="url(#g-orange)" filter="url(#paint-soft)" />
          <circle cx="16" cy="19" r="2.4" fill="#161513" />
          <circle cx="24" cy="19" r="2.4" fill="#161513" />
        </svg>
        <span className="display brand-name">
          Charles<span className="brand-dot">.</span>
        </span>
      </a>
      <nav className="nav-links" aria-label="Sections" ref={linksRef}>
        <span
          className={`nav-ind${indicator ? " is-on" : ""}`}
          aria-hidden="true"
          style={indicator ? { "--ind-x": `${indicator.x}px`, "--ind-w": `${indicator.w}px` } : undefined}
        />
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} aria-current={section === item.id ? "true" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="btn-ink small">
        <span>Say hi</span>
      </a>
    </header>
  );
}

function Wave({ talking }) {
  return (
    <span className={`wave${talking ? " is-talking" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

/* ---------- Hero ---------- */
function Hero({ motion }) {
  return (
    <section id="top" data-stop="hero" className="hero">
      <svg className="paint-art hero-art drift paint-layer" viewBox="0 0 900 800" aria-hidden="true">
        <Stroke className="stroke-in" delay=".2s" d="M60,560 C210,330 420,200 640,160 C770,136 850,170 890,220" color="url(#g-orange)" width="130" />
        <Stroke className="stroke-in" delay=".4s" d="M60,560 C210,330 420,200 640,160 C770,136 850,170 890,220" color="#FFFFFF" width="110" opacity=".16" strokeDasharray="0.004 0.02" />
        <Stroke className="stroke-in" delay=".6s" d="M180,720 C360,580 570,540 880,580" color="url(#g-tone)" width="58" opacity=".9" />
        <Stroke className="stroke-in" delay=".9s" d="M380,110 C500,80 620,100 730,50" color="#F7A15E" width="16" opacity=".75" />
        {[
          [300, 250, 16, "#F26B1D", "1.1s"],
          [258, 292, 7, "#F26B1D", "1.15s"],
          [820, 420, 22, "#F7A15E", "1.2s"],
          [772, 470, 8, "#B8380B", "1.25s"],
          [520, 420, 5, "#E8501A", "1.3s"],
          [680, 330, 11, "#F7A15E", "1.35s"],
          [150, 420, 6, "#B8380B", "1.4s"],
        ].map(([cx, cy, r, fill, d]) => (
          <circle key={`${cx}-${cy}`} className="pop" cx={cx} cy={cy} r={r} fill={fill} style={{ "--d": d }} />
        ))}
      </svg>

      <div className="container">
        <div className="hero-row">
          <div className="hero-copy">
            <h1 className="display hero-title">
              <span className="rise" style={{ "--d": ".1s" }}>Small ideas,</span>
              <span className="rise" style={{ "--d": ".22s" }}>painted into</span>
              <span className="rise" style={{ "--d": ".34s" }}>
                <span className="underlined">
                  <em className="serif accent">useful</em>
                  <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                    <path className="stroke-in" pathLength="1" d="M6,20 C70,8 160,6 294,16" fill="none" strokeWidth="9" strokeLinecap="round" filter="url(#paint-soft)" style={{ "--d": "1s" }} />
                  </svg>
                </span>{" "}
                software.
              </span>
            </h1>
            <p className="rise hero-intro" style={{ "--d": ".5s" }}>
              I'm a Software Engineering student building websites, apps and tools with Python, JavaScript and React — clean interfaces that make life a little easier.
            </p>
            <div className="rise hero-actions" style={{ "--d": ".62s" }}>
              <a href="#projects" className="btn-ink">
                <span>See my work</span>
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn-glass glass">Say hi</a>
            </div>
            <div className="rise hero-social" style={{ "--d": ".74s" }}>
              <a href={profile.github} className="icon-link" aria-label="Charles on GitHub"><Github size={22} strokeWidth={1.8} /></a>
              <a href={profile.linkedin} className="icon-link" aria-label="Charles on LinkedIn"><Linkedin size={22} strokeWidth={1.8} /></a>
              <a href={`mailto:${profile.email}`} className="icon-link" aria-label="Email Charles"><Mail size={22} strokeWidth={1.8} /></a>
            </div>
          </div>

          <div className="hero-guide">
            <div className="glass rise hello" style={{ "--d": "1.2s" }}>
              <div className="hello-head">
                <span className="mono" style={{ fontSize: 12 }}>Bob · your guide</span>
                <Wave talking />
              </div>
              <p>Hey — I'm Bob, a drop of paint that slipped off Charles's canvas. Come along, I'll show you around.</p>
              <a href="#about" className="text-link" style={{ fontSize: 15 }}>
                Show me around
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="rise hero-bob" style={{ "--d": ".9s" }}>
              <Bob mood="hero" size={300} motion={motion} />
              <div className="drip-cue" aria-hidden="true">
                <span className="drip-trail" />
                <svg className="drip-drop" viewBox="0 0 22 30" aria-hidden="true">
                  <path d="M11,1 C14,8 20,14 20,20 C20,25.5 16,29 11,29 C6,29 2,25.5 2,20 C2,14 8,8 11,1 Z" fill="#E8501A" />
                  <path d="M7,18 C7,15 8.5,13 10,11.5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track display">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <span className={item.style === "outline" ? "outline" : item.style === "serif" ? "serif" : undefined}>{item.text}</span>
            <span className="marquee-dot" style={{ background: item.dot }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <section id="about" data-stop="about" className="section about">
      <svg className="paint-art about-art drift-up paint-layer" viewBox="0 0 700 600" aria-hidden="true">
        <Stroke d="M40,420 C180,300 330,330 470,220 C560,150 640,140 680,160" color="url(#g-orange)" width="96" />
        <Stroke d="M120,540 C260,480 380,520 560,430" color="url(#g-tone)" width="22" opacity=".8" />
        <circle cx="600" cy="300" r="14" fill="#F7A15E" />
        <circle cx="560" cy="330" r="6" fill="#F7A15E" />
      </svg>
      <div className="container">
        <p className="mono reveal" style={{ margin: "0 0 28px" }}>01 — About</p>
        <div className="about-row">
          <div className="about-main">
            <h2 className="display reveal about-statement">
              I'm Charles. I study Software Engineering at Pan-Atlantic University, and I like turning <em className="serif accent">small ideas</em> into websites, apps and software that make life easier.
            </h2>
            <div className="glass reveal facts">
              {highlights.map((text, i) => (
                <div className="fact" key={text}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <p>{text}</p>
                </div>
              ))}
              <div className="fact-grid">
                <div><p className="mono label">Studying</p><p className="value">{profile.school}</p></div>
                <div><p className="mono label">Focus</p><p className="value">Frontend &amp; UI</p></div>
                <div><p className="mono label">Stack</p><p className="value">Python · JS · React</p></div>
              </div>
            </div>
          </div>
          <div className="reveal portrait-col">
            <figure className="glass lift portrait">
              <div className="portrait-frame">
                <svg className="art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <Stroke d="M-20,140 C90,60 220,120 420,40" color="url(#g-orange)" width="110" />
                  <Stroke d="M-30,330 C120,270 240,380 430,300" color="url(#g-teal)" width="140" />
                  <Stroke d="M40,470 C160,430 260,480 380,440" color="#2D4BB0" width="40" opacity=".85" />
                  <circle cx="300" cy="200" r="18" fill="#D6336C" />
                  <circle cx="90" cy="230" r="8" fill="#F7B32B" />
                </svg>
                {photoOk && (
                  <img src={profile.avatar} alt={`Portrait of ${profile.name}`} loading="lazy" onError={() => setPhotoOk(false)} />
                )}
              </div>
              <figcaption>
                <span className="display portrait-name">{profile.name}</span>
                <span className="mono" style={{ fontSize: 11 }}>SWE Student</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" data-stop="skills" className="section skills">
      <svg className="paint-art skills-art drift paint-layer" viewBox="0 0 800 500" aria-hidden="true">
        <Stroke d="M60,300 C200,160 380,120 560,180 C660,214 730,200 790,150" color="url(#g-orange)" width="120" />
        <Stroke d="M200,440 C340,380 500,420 760,360" color="#B8380B" width="34" opacity=".8" />
        <circle cx="140" cy="140" r="12" fill="#F7A15E" />
        <circle cx="110" cy="176" r="5" fill="#F7A15E" />
      </svg>
      <div className="container">
        <p className="mono reveal kicker">02 — Toolbox</p>
        <h2 className="display reveal big-title">
          The brushes I <em className="serif accent">paint</em> with.
        </h2>
        <div className="skill-grid">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.icon];
            return (
              <article className="glass lift reveal skill-card" key={group.title}>
                <div className="skill-card-head">
                  <span className="skill-badge" style={{ background: group.badge.color, borderRadius: group.badge.radius }}>
                    <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="mono" style={{ fontSize: 11 }}>{String(group.skills.length).padStart(2, "0")} items</span>
                </div>
                <h3 className="display">{group.title}</h3>
                <div className="chips">
                  {group.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
// A screenshot of the live app in a glass browser window, laid over two paint strokes.
function ProjectCover({ cover, title }) {
  const [first, second] = cover.strokes;
  return (
    <div className="project-cover" style={{ background: cover.tint }}>
      <div className="art">
        <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <Stroke d="M-40,300 C120,160 300,120 640,140" color={first} width="150" />
          <Stroke d="M-20,420 C180,360 380,400 640,330" color={second} width="70" />
          <circle cx="520" cy="70" r="18" fill={cover.dots} /><circle cx="560" cy="100" r="7" fill={cover.dots} />
        </svg>
        <div className="glass shot-frame">
          <div className="shot-bar">
            {["#E8501A", "#F7B32B", "#2BB3B1"].map((c) => <span key={c} className="shot-dot" style={{ background: c }} />)}
            <span className="shot-url">{cover.url}</span>
          </div>
          <img className="shot" src={cover.image} alt={`${title} sign-in screen`} loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" data-stop="projects" className="section projects">
      <div className="container">
        <p className="mono reveal kicker">03 — Selected work</p>
        <h2 className="display reveal big-title">
          Things I've <em className="serif accent">made</em>.
        </h2>
        <div className="project-list">
          {projects.map((project, i) => (
            <article className={`project glass lift reveal${i % 2 ? " flip" : ""}`} key={project.title}>
              <ProjectCover cover={project.cover} title={project.title} />
              <div className="project-body">
                <div className="project-head">
                  <span className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mono project-tag">{project.tag}</span>
                </div>
                <h3 className="display">{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-features">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="chips">
                  {project.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href} className="text-link" target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */
function Education() {
  const details = [
    { label: "Years", value: profile.years },
    { label: "Programme", value: profile.degree },
  ].filter((d) => d.value);
  return (
    <section id="education" data-stop="education" className="section education">
      <svg className="paint-art edu-art drift-up paint-layer" viewBox="0 0 900 400" aria-hidden="true">
        <Stroke d="M40,260 C220,120 420,300 620,170 C720,110 820,120 880,150" color="url(#g-orange)" width="110" />
        <circle cx="140" cy="110" r="14" fill="#F26B1D" />
      </svg>
      <div className="container">
        <p className="mono reveal" style={{ margin: "0 0 28px" }}>04 — Education</p>
        <article className="glass reveal edu-card">
          <span className="edu-badge">
            <GraduationCap size={52} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="edu-main">
            <p className="mono" style={{ margin: 0, color: "#2D4BB0" }}>Currently studying</p>
            <h3 className="display">{profile.school}</h3>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{profile.programme}</p>
            <p style={{ margin: "14px 0 0", maxWidth: 560, fontSize: 18, color: "#3D3A34" }}>
              Programming assignments, documentation and collaborative software engineering projects — the foundations under everything else on this page.
            </p>
          </div>
          {details.length > 0 && (
            <div className="edu-side">
              {details.map((d) => (
                <div key={d.label}>
                  <p className="mono label">{d.label}</p>
                  <p className="value" style={{ fontSize: 18 }}>{d.value}</p>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" data-stop="contact" className="section contact">
      <svg className="paint-art contact-art drift paint-layer" viewBox="0 0 900 700" aria-hidden="true">
        <Stroke d="M80,520 C260,300 440,420 600,240 C700,130 800,110 880,140" color="url(#g-orange)" width="140" />
        <Stroke d="M240,660 C420,560 600,620 880,500" color="url(#g-tone)" width="54" />
        <circle cx="200" cy="300" r="18" fill="#F7A15E" /><circle cx="240" cy="340" r="7" fill="#F7A15E" /><circle cx="760" cy="380" r="10" fill="#B8380B" />
      </svg>
      <div className="container">
        <p className="mono reveal" style={{ margin: "0 0 24px" }}>05 — Contact</p>
        <h2 className="display reveal contact-title">
          Let's make<br />something <em className="serif accent">vivid</em>.
        </h2>
        <p className="reveal" style={{ margin: "36px 0 0", maxWidth: 520, fontSize: 20, color: "#3D3A34" }}>
          Got an idea, a role, or just want to talk code? My inbox is open.
        </p>
        <a href={`mailto:${profile.email}`} className="mail-link display reveal contact-email">{profile.email}</a>
        <div className="reveal hero-actions">
          <a href={profile.github} className="btn-glass glass"><Github size={20} strokeWidth={1.8} aria-hidden="true" />GitHub</a>
          <a href={profile.linkedin} className="btn-glass glass"><Linkedin size={20} strokeWidth={1.8} aria-hidden="true" />LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="btn-ink"><span>Send an email</span></a>
        </div>
        <footer className="footer">
          <span className="mono" style={{ fontSize: 12 }}>© {new Date().getFullYear()} {profile.name}</span>
          <span className="mono" style={{ fontSize: 12 }}>Painted &amp; coded with React</span>
          <a href="#top" className="text-link" style={{ fontSize: 15 }}>
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}

/* ---------- Bob's tour: the corner guide that narrates each section ---------- */
function Guide({ section, motion }) {
  const [minimized, setMinimized] = useState(false);
  const [talking, setTalking] = useState(false);
  const stop = tourStops[section] || tourStops.hero;

  useEffect(() => {
    if (section === "hero") return undefined;
    setTalking(true);
    const t = window.setTimeout(() => setTalking(false), 2200);
    return () => window.clearTimeout(t);
  }, [section]);

  const classes = ["guide", section !== "hero" && "is-on", minimized && "is-min"].filter(Boolean).join(" ");
  return (
    <aside className={classes} aria-label="Bob, your tour guide" aria-live="polite">
      <button className="guide-bob" type="button" onClick={() => setMinimized(false)} aria-label="Show Bob's tour note">
        <Bob mood={section} size={96} motion={motion} />
      </button>
      <div className="guide-bubble glass">
        <div className="guide-head">
          <span className="mono" style={{ fontSize: 11, flex: 1 }}>Bob · stop {stop.step} of 5</span>
          <Wave talking={talking} />
          <button className="guide-x" type="button" onClick={() => setMinimized(true)} aria-label="Hide Bob's tour note">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="guide-line">{stop.line}</p>
        <a href={stop.next} className="text-link" style={{ fontSize: 14 }}>
          {stop.nextLabel}
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

export default function App() {
  const { section, compact } = useScrollScene();
  const motion = !useReducedMotion();

  return (
    <div className="site">
      <a className="skip-link" href="#about">Skip to content</a>
      <PaintDefs />
      <TopBar section={section} compact={compact} />
      <main>
        <Hero motion={motion} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Guide section={section} motion={motion} />
      <svg className="grain" aria-hidden="true">
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
