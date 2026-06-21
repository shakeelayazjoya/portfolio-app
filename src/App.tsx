import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Compass,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  CheckCircle,
  Code2,
  Sparkles,
  Link,
  Cpu
} from "lucide-react";

import { portfolioData, sampleProjects, Project } from "./data/portfolioData";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ThreeBackground } from "./components/ThreeBackground";
import { PageLoader } from "./components/PageLoader";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetailModal } from "./components/ProjectDetailModal";
import { ResumeDownload } from "./components/ResumeDownload";
import { ContactForm } from "./components/ContactForm";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  direction = "up",
  duration = 0.8 
}) => {
  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
  };

  const offset = directions[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay, 
        duration, 
        ease: [0.16, 1, 0.3, 1] // Custom luxury cubic-bezier ease out expo
      }}
    >
      {children}
    </motion.div>
  );
};

function MainAppContent() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activePerson, setActivePerson] = useState<"waqas" | "shakeel">("waqas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // Fetch target resume dataset
  const person = activePerson === "waqas" ? portfolioData.person1 : portfolioData.person2;
  const projects = sampleProjects[activePerson] || [];

  // Create beautiful dynamic theme highlights that adapt to the luxury mode requested
  const accent = theme === "dark"
    ? (activePerson === "waqas"
        ? {
            from: "from-[#ceab7c]",
            to: "to-[#f4ebe1]",
            text: "text-[#ceab7c]",
            glow: "shadow-[#ceab7c]/20",
          }
        : {
            from: "from-[#df9e82]",
            to: "to-[#fad1b8]",
            text: "text-[#df9e82]",
            glow: "shadow-[#df9e82]/20",
          }
      )
    : person.themeAccent;

  // Track active scrolls to highlight navigation sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSwitchPerson = (id: "waqas" | "shakeel") => {
    setActivePerson(id);
    setMobileMenuOpen(false);
    // Smooth scroll back to top on switch to reset experience flow
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Stagger custom layouts
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) {
    return <PageLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#07090e] font-sans text-slate-800 dark:text-slate-200 overflow-x-hidden antialiased">
      
      {/* 3D Immersive background scene */}
      <ThreeBackground activePerson={activePerson} theme={theme} />

      {/* --- STICKY DUAL-PORTFOLIO NAVIGATION HEADER --- */}
      <header className="sticky top-0 z-40 w-full bg-white/45 dark:bg-[#07090e]/45 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/40 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Main Logo & Initials badge */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 border border-slate-700/60 text-white dark:bg-white dark:text-slate-900 shadow-md font-mono font-extrabold text-sm select-none">
              {activePerson === "waqas" ? "MW" : "MS"}
            </span>
            <div className="hidden sm:block">
              <span className="text-xs font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase block select-none">
                SHARED PORTFOLIO PORTAL
              </span>
              <span className="text-sm font-bold tracking-tight text-slate-950 dark:text-white select-none">
                {activePerson === "waqas" ? "Muhammad Waqas" : "Muhammad Shakeel"}
              </span>
            </div>
          </div>

          {/* Desktop Nav menu items */}
          <nav className="hidden lg:flex items-center gap-1">
            {["about", "skills", "experience", "projects", "education", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeTab === item
                    ? "bg-slate-900/10 dark:bg-white/10 text-slate-950 dark:text-white font-semibold"
                    : "text-slate-400 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-white/5"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Quick theme toggles, person switcher controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* PERSON PIN SWTICHER TABS - The Dual Soul Selector */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200/50 dark:border-slate-800">
              <button
                onClick={() => handleSwitchPerson("waqas")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activePerson === "waqas"
                    ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Waqas (Web3)
              </button>
              <button
                onClick={() => handleSwitchPerson("shakeel")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activePerson === "shakeel"
                    ? "bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Shakeel (MERN)
              </button>
            </div>

            {/* Dark & Light slider */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title="Switch style color matrix"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-indigo-600" />}
            </button>
          </div>

          {/* Mobile Navigation trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-white dark:bg-[#07090e] border-b border-slate-200 dark:border-slate-800 p-6 shadow-xl block md:hidden"
          >
            <div className="space-y-4">
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Dual Soul Matrix Selector
              </span>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleSwitchPerson("waqas")}
                  className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    activePerson === "waqas"
                      ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Waqas (Web3)
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchPerson("shakeel")}
                  className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    activePerson === "shakeel"
                      ? "bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Shakeel (MERN)
                </button>
              </div>

              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase pt-2">
                INDEX NAVIGATION
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {["about", "skills", "experience", "projects", "education", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-center items-center text-xs font-mono font-medium uppercase tracking-wider py-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO / LANDING SECTION --- */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16"
      >
        {/* Abstract structural grid guidelines just for visual premium polish */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800/40 to-transparent" />
        
        {/* Crossfade entire core content on switching people for beautiful morph effects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePerson}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left information column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Floating metadata lineer and person label */}
              <div className="inline-flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r ${accent.from} ${accent.to} animate-pulse`} />
                <span className="text-[11px] font-mono tracking-widest text-slate-500 dark:text-[#ceab7c]/90 uppercase font-semibold">
                  WELCOME TO THE PREMIUM PORTFOLIO OF
                </span>
              </div>

              {/* Tagline header */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                  {person.firstName}
                  <span className={`bg-gradient-to-r ${accent.from} ${accent.to} bg-clip-text text-transparent ml-3`}>
                    {person.lastName}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-lg sm:text-xl font-medium text-slate-500 dark:text-cyan-400 font-mono tracking-tight"
                >
                  {person.role}
                </motion.p>
              </div>

              {/* Summary descriptor */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base text-slate-500 dark:text-slate-300 max-w-2xl leading-relaxed"
              >
                {person.summary}
              </motion.p>

              {/* Social link matrices */}
              <div className="flex flex-wrap items-center gap-5 pt-3">
                <div className="flex gap-3">
                  <a
                    href={`https://${person.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm hover:scale-110 active:scale-95 duration-200"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  {person.github && (
                    <a
                      href={`https://${person.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm hover:scale-110 active:scale-95 duration-200"
                      title="GitHub Ledger"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${person.email}`}
                    className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all shadow-sm hover:scale-110 active:scale-95 duration-200"
                    title={`Email Client`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-800" />

                {/* Direct Action triggers */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className={`px-5 py-2.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm`}
                  >
                    Active Assets
                  </a>
                  <a
                    href="#contact"
                    className="px-5 py-2.5 rounded-xl bg-white/75 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    Ping Message
                  </a>
                </div>
              </div>
            </div>

            {/* Right-side Visual Frame column */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-6">
              {/* Ambient radial halo backdrop */}
              <div className={`absolute h-72 w-72 rounded-full bg-gradient-to-r ${accent.from} ${accent.to} opacity-10 dark:opacity-20 blur-[60px] animate-pulse`} />
              
              {/* Photo Card with 3D shadow depth and frame alignment */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative h-72 w-72 sm:h-80 sm:w-80 overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-3"
              >
                {/* Tech brackets corners decoration */}
                <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-400/40 dark:border-slate-600/40`} />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-400/40 dark:border-slate-600/40" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-400/40 dark:border-slate-600/40" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-400/40 dark:border-slate-600/40" />

                <div className="relative w-full h-full rounded-xl overflow-hidden grayscaleContrast select-none">
                  <img
                    src={person.avatarUrl}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* High contrast visual overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll helper button indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest animate-pulse select-none">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4.5 h-4.5 text-slate-400 animate-bounce" />
        </div>
      </section>

      {/* --- ABOUT BIO SECTION --- */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              01 // PROFILE BIO
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Aesthetic Narrative & Core Ambition
            </h2>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <div key={activePerson} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Bio summary block */}
            <div className="lg:col-span-8 bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md">
              <ScrollReveal delay={0.1}>
                <h3 className={`text-lg font-mono font-semibold ${accent.text} mb-4`}>
                  &lt;Who is {person.name}?&gt;
                </h3>
                
                <div className="space-y-4 text-base text-slate-500 dark:text-slate-300 leading-relaxed">
                  <p>
                    I'm a seasoned developer deeply motivated by transforming sophisticated digital paradigms into accessible, visual experiences. My development practices anchor on neat typography, high-performance layouts, and consistent responsive structures.
                  </p>
                  <p>
                    Specializing in React systems, Web3 blockchain ledger pipelines, or robust API backends (MERN stack), I focus on reducing loading speeds, locking down site authorization channels, and building clean interfaces across all operational touchscreens.
                  </p>
                </div>

                {/* Achievements listing */}
                {person.achievements && (
                  <div className="mt-8 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                    <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">
                       Pillars of Impact:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {person.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle className={`w-4 h-4 mr-2 ${accent.text} mt-0.5 shrink-0`} />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>

            {/* Quick stats and direct details summary panel */}
            <div className="lg:col-span-4 bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md space-y-6">
              <ScrollReveal delay={0.2}>
                <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                  Direct Coordinates
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">EMAIL:</span>
                    <a href={`mailto:${person.email}`} className="hover:underline">{person.email}</a>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">PHONE:</span>
                    <span>{person.phone}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">LINKEDIN:</span>
                    <a href={`https://${person.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline text-[11px] truncate max-w-[170px]">{person.linkedin}</a>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">LANGUAGES:</span>
                    <span className="text-right">{person.languages.join(", ")}</span>
                  </div>
                </div>

                {/* Dynamic resume download trigger */}
                <div className="pt-4 flex justify-center">
                  <ResumeDownload person={person} accent={accent} />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </AnimatePresence>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              02 // REQUISITE SKILLS
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Technical Proficiency & Toolsets
            </h2>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <div
            key={activePerson}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            {person.skills.map((categoryList, cIdx) => (
              <motion.div
                key={categoryList.category}
                initial={{ opacity: 0, y: 30, x: cIdx % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: cIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <Cpu className={`w-5 h-5 ${accent.text}`} />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold">
                    {categoryList.category}
                  </h3>
                </div>

                {/* Staggered progress lines */}
                <div className="space-y-4">
                  {categoryList.items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <span className="font-mono text-slate-400 dark:text-slate-500">
                          {skill.proficiency}%
                        </span>
                      </div>
                      
                      {/* Spring indicator channel */}
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                          className={`h-full bg-gradient-to-r ${accent.from} ${accent.to}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* --- EXPERIENCE / TIMELINE SECTION --- */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              03 // CHRONOLOGICAL PATHWAY
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Professional Experience & Milestones
            </h2>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* Vertical progressive timeline */}
          <div key={activePerson} className="relative max-w-3xl mx-auto">
            {/* The structural connection wire (progress line) */}
            <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-12">
              {person.experience.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={`${exp.position}-${exp.company}-${idx}`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Floating Center Node Dot marker */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-[5px] sm:-translate-x-1.5 top-1.5 h-3 w-3 rounded-full bg-[#07090e] border-2 border-slate-200 dark:border-slate-700 z-10 flex items-center justify-center">
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${accent.from} ${accent.to}`} />
                    </div>

                    {/* Left/Right content bento bounds */}
                    <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-8">
                      <div className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-md shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                        
                        {/* Time label flag */}
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800 ${accent.text}`}>
                            {exp.period}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 self-center">
                            {exp.location}
                          </span>
                        </div>

                        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                          {exp.position}
                        </h3>
                        
                        <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-4 uppercase">
                          {exp.company}
                        </p>

                        <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 list-none font-sans">
                          {exp.highlights.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start">
                              <span className={`inline-block h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600 mr-2 shrink-0 mt-1.5`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Placeholder space for alignment opposite side */}
                    <div className="hidden sm:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatePresence>
      </section>

      {/* --- PROJECTS PORTFOLIO GRID SECTION --- */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              04 // PRODUCT SPECIFICATIONS
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Aesthetic Code Assets & Live Applications
            </h2>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <div
            key={activePerson}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onSelect={(proj) => {
                    setSelectedProject(proj);
                    setDetailModalOpen(true);
                  }}
                  accent={accent}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* --- EDUCATION & CERTIFICATIONS SECTION --- */}
      <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative font-sans">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              05 // ACADEMICS & CREDENTIALS
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Educational History & Training Blocks
            </h2>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <div key={activePerson} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Education column */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className={`w-5 h-5 ${accent.text}`} />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold">
                    Academic Trajectory
                  </h3>
                </div>

                <div className="space-y-4">
                  {person.education.map((edu, idx) => (
                    <div
                      key={edu.degree}
                      className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 rounded-2xl backdrop-blur-md"
                    >
                      <span className={`inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-800 ${accent.text} mb-3`}>
                        {edu.period}
                      </span>
                      
                      <h4 className="text-base font-bold text-slate-950 dark:text-white tracking-tight">
                        {edu.degree}
                      </h4>
                      
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase">
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Certifications column */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal delay={0.2}>
                <div className="flex items-center gap-2 mb-4">
                  <Award className={`w-5 h-5 ${accent.text}`} />
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold">
                    Credentials & Certifications
                  </h3>
                </div>

                {person.certifications && person.certifications.length > 0 ? (
                  <div className="space-y-4">
                    {person.certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-4 rounded-xl backdrop-blur-md flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-850 dark:text-slate-100">
                            {cert.name}
                          </h4>
                          <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                            ISSUER: {cert.issuer}
                          </p>
                        </div>
                        <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${accent.from} ${accent.to}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 rounded-xl backdrop-blur-md">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Strengths & Specialties
                    </h4>
                    
                    <div className="mt-4 space-y-3.5">
                      {person.strengths?.map((str) => (
                        <div key={str.title} className="text-xs">
                        <h5 className="font-mono font-semibold text-slate-800 dark:text-slate-300">
                          &bull; {str.title}
                        </h5>
                        <p className="text-slate-400 dark:text-slate-400 font-sans mt-0.5 pl-3 leading-relaxed">
                          {str.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </ScrollReveal>
            </div>

          </div>
        </AnimatePresence>
      </section>

      {/* --- CONTACT PACKET & FORM SECTION --- */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/50 dark:border-slate-800/20 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-semibold ${accent.text} uppercase tracking-wider`}>
              06 // DIRECT DISPATCH
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white mt-4">
              Initialize Project Coordination
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-mono">
          
          {/* Dispatch descriptions, coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-white/45 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md">
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2 tracking-tight flex items-center gap-2">
                  <Code2 className={`w-4 h-4 ${accent.text}`} />
                  Connect Directly
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-sans">
                  Ready to review technical scope, align deliverables, or integrate specialized contractors? Send an encrypted record directly via the portal.
                </p>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">OFFICIAL EMAIL</p>
                      <a href={`mailto:${person.email}`} className="hover:underline">{person.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">MOBILE PHONE WIRE</p>
                      <span>{person.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800">
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">GEOGRAPHIC ZONE</p>
                      <span>Punjab, Pakistan (Available for Global Remote)</span>
                    </div>
                  </div>
                </div>

                {/* Minimal coordinates illustration */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 animate-spin" />
                  <span>LOCATION // Punjab, Pakistan (UTC+5)</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <ContactForm accent={accent} />
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* --- FOOTER CARD BLOCK --- */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/20 bg-white/20 dark:bg-[#07090e]/30 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PORTFOLIO STATUS: ONLINE</span>
        </div>
        <p className="text-center font-sans text-xs">
          Designed with 3D Canvas rendering & Tailwind styling. Complete stack verified under React 19.
        </p>
        <div className="flex gap-4">
          <a href={`https://${portfolioData.person1.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400">M.Waqas</a>
          <a href={`https://${portfolioData.person2.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-violet-400">M.Shakeel</a>
        </div>
      </footer>

      {/* Render Project Spec Detail Dialog */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedProject(null);
        }}
        accent={accent}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
