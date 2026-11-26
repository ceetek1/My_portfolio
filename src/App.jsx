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
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
    skills: ["Python", "JavaScript", "Rust", "HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    title: "Tools",
    icon: Terminal,
    skills: ["Git", "GitHub", "npm", "VS Code", "Figma"],
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
    tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
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
  "Interested in turning small ideas into useful websites, apps, and software that make life easier.",
];

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.tagName.toLowerCase() === "button" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mint mix-blend-difference md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(126, 253, 223, 1)" : "transparent",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint mix-blend-difference md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}

function InteractiveBackdrop() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-navy">
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
}

function GlowCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-xl border border-slate-line/50 bg-[#112240]/80 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-mint/30 hover:shadow-mint/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 255, 218, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function SectionHeader({ kicker, title }) {
  return (
    <div className="mb-10">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-2 font-mono text-sm font-semibold text-mint"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-5 text-3xl font-bold text-slate-light md:text-4xl lg:text-5xl"
      >
        {title}
        <span className="h-px flex-1 bg-slate-line/50"></span>
      </motion.h2>
    </div>
  );
}

function DesktopNavigation() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <aside className="fixed right-9 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <nav aria-label="Section navigation" className="relative flex items-center gap-6">
        <ul className="grid gap-4 text-right">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <a
                href={item.href}
                className="group flex items-center justify-end gap-3 font-mono text-xs font-semibold text-slate transition-colors hover:text-mint"
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">/{item.label}</span>
                <span className="h-2 w-2 rounded-full border border-slate transition-all group-hover:border-mint group-hover:bg-mint" />
              </a>
            </motion.li>
          ))}
        </ul>
        <div className="relative h-64 w-px bg-slate-line/30">
          <motion.div
            className="absolute top-0 w-full bg-mint"
            style={{ height }}
          />
        </div>
      </nav>
    </aside>
  );
}

function SocialRail() {
  return (
    <aside className="fixed bottom-0 left-9 z-40 hidden xl:block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col items-center gap-6 text-slate after:h-24 after:w-px after:bg-slate-line"
      >
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="transition-transform hover:-translate-y-1 hover:text-mint"
          aria-label="Charles on GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="transition-transform hover:-translate-y-1 hover:text-mint"
          aria-label="Charles on LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="transition-transform hover:-translate-y-1 hover:text-mint"
          aria-label="Email Charles"
        >
          <Mail size={20} />
        </a>
      </motion.div>
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

function ScrollReveal({ children, className = "", id }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mx-auto w-full max-w-5xl px-6 py-24 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative min-h-screen bg-navy font-sans text-slate selection:bg-mint/30 selection:text-slate-light">
      <CustomCursor />
      <InteractiveBackdrop />
      <DesktopNavigation />
      <SocialRail />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-line/30 bg-[#0a192f]/80 px-6 py-4 backdrop-blur-md md:hidden">
        <nav className="flex items-center justify-between">
          <a
            href="#top"
            className="font-mono text-sm font-bold text-mint"
            onClick={closeMenu}
          >
            charles.chukwurah
          </a>
          <button
            type="button"
            className="text-mint focus:outline-none"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-[#0a192f]"
            >
              <div className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-mono text-sm font-medium text-slate transition-colors hover:text-mint"
                    onClick={closeMenu}
                  >
                    /{item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-20 pt-28 md:flex-row md:items-center md:justify-between md:px-12 lg:px-20 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl md:pr-8"
          >
            <p className="mb-5 font-mono text-base text-mint sm:text-lg">hi,</p>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.1] text-slate-light">
              <span className="text-mint">
                <Typewriter text={profile.firstName} delay={500} />
              </span>{" "}
              <Typewriter text="here." delay={1000} />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1 inline-block h-[0.8em] w-[0.1em] bg-mint align-baseline"
              />
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-4 text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight text-slate"
            >
              I build stuff sometimes.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-slate"
            >
              I am a <span className="text-mint">{profile.title.toLowerCase()}</span> at {profile.school}, currently growing my
              foundations in Python, JavaScript, React, interface design, and practical software engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="mt-12 flex flex-wrap items-center gap-5"
            >
              <a
                href={`mailto:${profile.email}`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded border border-mint bg-transparent px-8 py-4 font-mono text-sm font-semibold text-mint transition-all hover:bg-mint/10"
              >
                <Mail size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                <span>Say hello</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded border border-slate/30 bg-transparent px-8 py-4 font-mono text-sm font-semibold text-slate-light transition-all hover:border-slate-light hover:bg-slate-light/5"
              >
                <Github size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                <span>View GitHub</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 100 }}
            className="relative mt-12 flex shrink-0 justify-center md:mt-0"
          >
            <div className="group relative h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full border-2 border-mint transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-slate-line/50 bg-[#112240] transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover mix-blend-luminosity transition-all duration-500 group-hover:mix-blend-normal group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-mint/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>
            </div>
          </motion.div>
        </section>

        <ScrollReveal id="about">
          <SectionHeader kicker="01. about" title="A student engineer." />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                I am <span className="text-mint">Charles Chukwurah</span>, a software engineering student at Pan-Atlantic University.
                I am using this portfolio to document the projects, coursework, and practice that
                are shaping how I write software.
              </p>
              <p>
                Right now I am focused on frontend development, clean UI implementation, and the
                discipline of turning small ideas into reliable, readable code.
              </p>
            </div>
            <div className="grid gap-4">
              {highlights.map((item, i) => (
                <GlowCard key={i} className="flex gap-4 p-5">
                  <Sparkles className="shrink-0 text-mint" size={24} />
                  <p className="text-base text-slate-light">{item}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal id="skills">
          <SectionHeader kicker="02. skills" title="Tools & concepts." />
          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map(({ title, icon: Icon, skills }, i) => (
              <GlowCard key={title}>
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-lg bg-mint/10 p-3">
                    <Icon className="text-mint" size={24} />
                  </div>
                  <span className="font-mono text-xs text-mint">0{i + 1}.</span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-light">{title}</h3>
                <ul className="grid gap-3">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <span className="text-mint">▹</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal id="projects">
          <SectionHeader kicker="03. projects" title="Selected work." />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <GlowCard key={project.title} className="flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <BookOpen size={36} className="text-mint" />
                  <div className="flex items-center gap-4 text-slate">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-mint"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={20} />
                    </a>
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        className="transition-colors hover:text-mint"
                        aria-label={`${project.title} live view`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-light group-hover:text-mint">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-slate-light">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal id="education">
          <SectionHeader kicker="04. education" title="Academic foundation." />
          <GlowCard className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10 p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-mint/10 text-mint">
              <GraduationCap size={32} />
            </div>
            <div>
              <p className="mb-2 font-mono text-sm text-mint">currently studying</p>
              <h3 className="text-2xl font-bold text-slate-light md:text-3xl">{profile.school}</h3>
              <p className="mt-2 text-lg text-slate">{profile.title}</p>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Coursework and self-directed practice are helping me build a stronger foundation in
                programming, software design, collaboration, documentation, and modern web
                development.
              </p>
            </div>
          </GlowCard>
        </ScrollReveal>

        <ScrollReveal id="contact" className="pb-32 text-center">
          <p className="mb-4 font-mono text-sm text-mint">05. What's Next?</p>
          <h2 className="mb-6 text-4xl font-bold text-slate-light md:text-5xl">Get In Touch</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-slate">
            I am open to student projects, internships, and conversations around frontend
            development or software engineering practice. My inbox is always open.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded border border-mint bg-transparent px-8 py-4 font-mono text-sm font-semibold text-mint transition-all hover:bg-mint/10"
            >
              <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <span>Say Hello</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded border border-slate/30 bg-transparent px-8 py-4 font-mono text-sm font-semibold text-slate-light transition-all hover:border-slate-light hover:bg-slate-light/5"
            >
              <Linkedin size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <span>Connect</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </main>

      <footer className="relative z-10 border-t border-slate-line/30 py-8 text-center font-mono text-xs text-slate">
        <a
          href={profile.github}
          className="transition-colors hover:text-mint"
        >
          Built by Charles Chukwurah
        </a>
      </footer>
    </div>
  );
}

export default App;
