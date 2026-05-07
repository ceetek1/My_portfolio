import {
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const profile = {
  name: "Charles Chukwurah",
  firstName: "charles",
  title: "Software Engineering Student",
  school: "Pan-Atlantic University",
  email: "charles.chukwurah@pau.edu.ng",
  github: "https://github.com/ceetek1",
  linkedin: "https://www.linkedin.com/in/chukwurah-charles-652775377",
  avatar: "https://github.com/ceetek1.png",
};

const navItems = [
  { label: "home", href: "#top" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "Languages",
    icon: Layers3,
    skills: ["Python", "JavaScript", "Rust","HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    title: "Tools",
    icon: Terminal,
    skills: ["Git", "GitHub","npm", "VS Code", "Figma"],
  },
  {
    title: "Focus",
    icon: Code2,
    skills: ["Software Engineering", "UI Development", "Problem Solving", "Clean Code"],
  },
];

const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A responsive React portfolio for presenting my background, skills, projects, and contact links in one focused place.",
    tech: ["React", "Tailwind CSS", "Vite"],
    github: profile.github,
    live: "#top",
  },
  {
    title: "JavaScript Learning Projects",
    description:
      "Small browser-based projects and exercises that help me practice core JavaScript, DOM interactions, and UI behavior.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: profile.github,
    live: "#",
  },
  {
    title: "University Coursework",
    description:
      "Programming assignments, documentation, and collaborative software engineering work from Pan-Atlantic University.",
    tech: ["Software Engineering", "GitHub", "Documentation"],
    github: profile.github,
    live: "#",
  },
];

const highlights = [
  "Building practical software engineering foundations through coursework and real projects.",
  "Focused on Python, JavaScript, React, clean interfaces, and responsive frontend development.",
  "Interested in turning small ideas into useful, Website , apps and software that make live easier.",
];

function InteractiveBackdrop() {
  const backdropRef = useRef(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return undefined;

    let frame = 10;
    let pointerX = 0.22;
    let pointerY = 0.34;
    let scrollY = window.scrollY;

    const update = () => {
      frame = 0;
      backdrop.style.setProperty("--cursor-x", `${pointerX * 100}%`);
      backdrop.style.setProperty("--cursor-y", `${pointerY * 100}%`);
      backdrop.style.setProperty("--drift-x", `${(pointerX - 0.5) * 34}px`);
      backdrop.style.setProperty("--drift-y", `${(pointerY - 0.5) * 26}px`);
      backdrop.style.setProperty("--reverse-drift-x", `${(pointerX - 0.5) * -24}px`);
      backdrop.style.setProperty("--reverse-drift-y", `${(pointerY - 0.5) * -12}px`);
      backdrop.style.setProperty("--scroll-shift", `${scrollY * -0.045}px`);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
      scheduleUpdate();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      scheduleUpdate();
    };

    update();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={backdropRef} className="interactive-backdrop" aria-hidden="true" />;
}

function SectionHeader({ kicker, title }) {
  return (
    <div className="section-header">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function DesktopNavigation() {
  return (
    <aside className="fixed right-9 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <nav aria-label="Section navigation">
        <ul className="grid gap-3 text-right">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link inline-flex justify-end text-sm font-bold text-mint transition hover:translate-x-1 hover:text-[#ccd6f6]"
              >
                /{item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SocialRail() {
  return (
    <aside className="fixed bottom-7 right-9 z-40 hidden md:block">
      <div className="flex items-center gap-3 text-mint">
        <a
          href={`mailto:${profile.email}`}
          className="icon-link"
          aria-label="Email Charles"
        >
          <Mail size={18} />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="icon-link"
          aria-label="Charles on GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="icon-link"
          aria-label="Charles on LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </aside>
  );
}

function Typewriter({ text, speed = 80, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, started]);

  return <span>{displayedText}</span>;
}

function TiltPortrait({ children }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="portrait-wrap mb-8 animate-fade-in-up opacity-0"
    >
      {children}
    </div>
  );
}

function ScrollReveal({ children, className = "", id }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      id={id}
      ref={domRef}
      className={`${className} reveal ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell min-h-screen overflow-hidden bg-navy text-slate-light">
      <InteractiveBackdrop />
      <DesktopNavigation />
      <SocialRail />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-line bg-[#0a192f]/90 backdrop-blur md:hidden">
        <nav className="flex items-center justify-between px-5 py-4">
          <a
            href="#top"
            className="font-mono text-sm font-bold text-mint"
            onClick={closeMenu}
          >
            charles.chukwurah
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded border border-[#64ffda]/50 text-mint"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-slate-line bg-navy px-5 py-3">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded px-3 py-3 font-mono text-sm font-bold text-mint hover:bg-[#112240]"
                  onClick={closeMenu}
                >
                  /{item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main id="top" className="relative z-10">
        <section className="hero-section mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-28 md:px-12 md:pb-24 md:pt-24 lg:px-20">
          <div className="max-w-4xl">
            <TiltPortrait>
              <div className="portrait-glow" aria-hidden="true" />
              <img
                src={profile.avatar}
                alt="Charles Chukwurah"
                className="portrait-image"
              />
            </TiltPortrait>

            <p className="mb-3 font-mono text-base text-mint sm:text-lg animate-fade-in-up delay-100 opacity-0">hi,</p>
            <h1 className="hero-title text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.98] text-slate-light animate-fade-in-up delay-200 opacity-0">
              <span className="text-mint">
                <Typewriter text={profile.firstName} delay={1000} />
              </span>{" "}
              <Typewriter text="here." delay={1800} />
              <span className="typing-caret" aria-hidden="true" />
            </h1>
            <p className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none text-slate animate-fade-in-up delay-300 opacity-0">
              <Typewriter text="I build stuff sometimes." delay={2800} speed={50} />
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate animate-fade-in-up delay-500 opacity-0">
              I am a {profile.title.toLowerCase()} at {profile.school}, currently growing my
              foundations in Python, JavaScript, React, interface design, and practical software
              engineering.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-700 opacity-0">
              <a href={`mailto:${profile.email}`} className="primary-action">
                <Mail size={18} />
                Say hello
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                <Github size={18} />
                View GitHub
              </a>
            </div>
          </div>
        </section>

        <ScrollReveal id="about" className="content-section">
          <SectionHeader kicker="01. about" title="A student engineer with a builder's rhythm." />
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-5 text-lg leading-8 text-slate">
              <p>
                I am Charles Chukwurah, a software engineering student at Pan-Atlantic University.
                I am using this portfolio to document the projects, coursework, and practice that
                are shaping how I write software.
              </p>
              <p>
                Right now I am focused on frontend development, clean UI implementation, and the
                discipline of turning small ideas into reliable, readable code.
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <article key={item} className="feature-card">
                  <Sparkles className="text-mint" size={20} />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal id="skills" className="content-section">
          <SectionHeader kicker="02. skills" title="Tools and concepts I keep sharpening." />
          <div className="grid gap-5 md:grid-cols-3">
            {skillGroups.map(({ title, icon: Icon, skills }) => (
              <article key={title} className="skill-card">
                <div className="mb-6 flex items-center justify-between">
                  <Icon className="text-mint" size={26} />
                  <span className="font-mono text-sm text-slate">/{title.toLowerCase()}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-light">{title}</h3>
                <ul className="mt-6 grid gap-3">
                  {skills.map((skill) => (
                    <li key={skill} className="skill-item">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal id="projects" className="content-section">
          <SectionHeader kicker="03. projects" title="Software creations and practice work." />
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="mb-7 flex items-center justify-between text-mint">
                  <BookOpen size={30} />
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-link"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={18} />
                    </a>
                    {project.live !== "#" ? (
                      <a
                        href={project.live}
                        className="icon-link"
                        aria-label={`${project.title} live view`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    ) : null}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-light">{project.title}</h3>
                <p className="mt-4 min-h-32 text-base leading-7 text-slate">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-slate">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal id="education" className="content-section">
          <SectionHeader kicker="04. education" title="Academic foundation and current focus." />
          <article className="education-panel">
            <div className="grid h-14 w-14 place-items-center rounded bg-mint text-navy">
              <GraduationCap size={30} />
            </div>
            <div>
              <p className="font-mono text-sm text-mint">currently studying</p>
              <h3 className="mt-3 text-3xl font-bold text-slate-light">{profile.school}</h3>
              <p className="mt-2 text-xl font-semibold text-slate">{profile.title}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
                Coursework and self-directed practice are helping me build a stronger foundation in
                programming, software design, collaboration, documentation, and modern web
                development.
              </p>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal id="contact" className="content-section pb-28 text-center">
          <p className="font-mono text-base text-mint">05. contact</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-slate-light sm:text-5xl">
            Let us build something useful.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate">
            I am open to student projects, internships, and conversations around frontend
            development or software engineering practice.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`mailto:${profile.email}`} className="primary-action">
              <Send size={18} />
              Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="secondary-action"
            >
              <Linkedin size={18} />
              Connect
              <ArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>
      </main>

      <footer className="relative z-10 border-t border-slate-line px-6 py-8 text-center font-mono text-sm text-slate">
        <p>Built by Charles Chukwurah with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
