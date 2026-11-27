export const profile = {
  name: "Charles Chukwurah",
  title: "Software Engineering Student",
  school: "Pan-Atlantic University",
  programme: "Software Engineering",
  email: "charles.chukwurah@pau.edu.ng",
  github: "https://github.com/ceetek1",
  linkedin: "https://www.linkedin.com/in/chukwurah-charles-652775377",
  avatar: "https://github.com/ceetek1.png",
  // Fill these in to show them on the Education card; empty values stay hidden.
  years: "",
  degree: "",
};

export const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export const highlights = [
  "Building practical software engineering foundations through coursework and real projects.",
  "Focused on Python, JavaScript, React, clean interfaces and responsive frontend development.",
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "layers",
    badge: { color: "#E8501A", radius: "46% 54% 42% 58%" },
    skills: ["Python", "JavaScript", "Rust", "HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    title: "Tools",
    icon: "terminal",
    badge: { color: "#0F6E78", radius: "54% 46% 58% 42%" },
    skills: ["Git", "GitHub", "npm", "VS Code", "Figma"],
  },
  {
    title: "Focus",
    icon: "code",
    badge: { color: "#2D4BB0", radius: "42% 58% 46% 54%" },
    skills: ["Software Engineering", "UI Development", "Problem Solving", "Clean Code"],
  },
];

// Each cover is a screenshot of the live app, framed in glass over two paint strokes.
export const projects = [
  {
    title: "OfficeLog",
    tag: "Company system",
    description:
      "A daily attendance log for a company's workers. Staff clock in by scanning a QR code on the entrance TV and confirming with Face ID; the day's status works itself out.",
    features: [
      "Rotating QR code + Face ID (passkey) check-in from the worker's own phone",
      "Automatic on-time, late, left-early and absent status, with a manager → MD approval flow for reasons",
      "Records are never edited — corrections are added, and every action lands in an activity log",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "React", "TypeScript", "WebAuthn"],
    cover: {
      image: "/projects/officelog.jpg",
      url: "officelog-production.up.railway.app",
      tint: "#F4DCCB",
      strokes: ["url(#g-orange)", "url(#g-teal)"],
      dots: "#D6336C",
    },
    links: [
      { label: "Live site", href: "https://officelog-production.up.railway.app/" },
      { label: "View code", href: "https://github.com/ceetek1/officelog" },
    ],
  },
  {
    title: "BundoPay",
    tag: "PayPal Hackathon",
    description:
      "Helps PayPal sellers look after their money. Gemini drafts, code decides, the owner approves — and it all runs on the PayPal sandbox, so no real money moves.",
    features: [
      "Bundo, an AI assistant, drafts dispute replies; small ones are refunded automatically",
      "Jars set money aside for tax, disputes and ads, checked against limits the seller chooses",
      "A tamper-evident, signed record of every action",
    ],
    tech: ["Next.js", "FastAPI", "Supabase", "PayPal APIs", "Gemini"],
    cover: {
      image: "/projects/bundopay.jpg",
      url: "bundo-pay.vercel.app",
      tint: "#DDE2F5",
      strokes: ["url(#g-blue)", "#F7B32B"],
      dots: "#E8501A",
    },
    links: [
      { label: "Live site", href: "https://bundo-pay.vercel.app/" },
      { label: "View code", href: "https://github.com/KYNETIC3/bundoPay" },
    ],
  },
  {
    title: "Tasktion",
    tag: "Planner app",
    description:
      "A private task app for a group of friends: hand each other tasks, see who's doing what, and get a reminder before anything is due.",
    features: [
      "Invite-only friends group with Google or email sign-in",
      "An email reminder about 24 hours before each deadline",
      "Installs to the iPhone home screen, with a morning plan and evening review by email",
    ],
    tech: ["FastAPI", "PostgreSQL", "Supabase", "React", "TypeScript"],
    cover: {
      image: "/projects/tasktion.jpg",
      url: "tasktion-production.up.railway.app",
      tint: "#D5ECE9",
      strokes: ["url(#g-gold)", "#0F6E78"],
      dots: "#2D4BB0",
    },
    links: [
      { label: "Live site", href: "https://tasktion-production.up.railway.app/" },
      { label: "View code", href: "https://github.com/ceetek1/Tasktion_App" },
    ],
  },
];

export const marquee = [
  { text: "Python", style: "solid", dot: "#F26B1D" },
  { text: "JavaScript", style: "outline", dot: "#1C8C93" },
  { text: "Rust", style: "solid", dot: "#F2A516" },
  { text: "React", style: "outline", dot: "#D6336C" },
  { text: "Tailwind CSS", style: "solid", dot: "#2D4BB0" },
  { text: "clean code", style: "serif", dot: "#F26B1D" },
];

// What Bob says at each stop of the tour.
export const tourStops = {
  hero: { step: 0, line: "Hey — I'm Bob. Come along, I'll show you around.", next: "#about", nextLabel: "Start the tour" },
  about: { step: 1, line: "This is the human behind the paint. Charles studies Software Engineering at Pan-Atlantic University.", next: "#skills", nextLabel: "Next stop: his toolbox" },
  skills: { step: 2, line: "His brushes. Python, JavaScript and React do most of the painting around here.", next: "#projects", nextLabel: "Next stop: the work" },
  projects: { step: 3, line: "The good stuff — a hackathon build, a system a real company runs on, and a planner. All live, go poke them!", next: "#education", nextLabel: "Next stop: school" },
  education: { step: 4, line: "Where the foundations get poured, one assignment at a time.", next: "#contact", nextLabel: "Last stop" },
  contact: { step: 5, line: "End of the tour! If something caught your eye, Charles would love to hear from you.", next: "#top", nextLabel: "Back to the start" },
};

// The page's single paint colour at each section. Paint is drawn in orange and
// shifted with a CSS filter; accent is the matching text-safe ink colour.
export const paintStops = {
  hero: { hue: 0, sat: 1, bright: 1, accent: [217, 72, 15], tint: [242, 107, 29] },
  about: { hue: 161, sat: 1.15, bright: 0.86, accent: [15, 110, 120], tint: [28, 140, 147] },
  skills: { hue: 10, sat: 1.1, bright: 1.04, accent: [154, 98, 6], tint: [242, 165, 22] },
  projects: { hue: -43, sat: 1.05, bright: 0.95, accent: [194, 37, 92], tint: [214, 51, 108] },
  education: { hue: -156, sat: 1.25, bright: 0.8, accent: [45, 75, 176], tint: [45, 75, 176] },
  contact: { hue: -6, sat: 1, bright: 1, accent: [217, 72, 15], tint: [232, 80, 26] },
};
