import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { Project } from "../data/portfolioData";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  accent: {
    from: string;
    to: string;
    text: string;
    glow: string;
  };
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  accent,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal content body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]"
          >
            {/* Visual Header / Image side */}
            <div className="relative w-full md:w-1/2 h-56 md:h-auto min-h-[220px] bg-slate-100 dark:bg-slate-950 overflow-hidden group">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900/80 text-white border border-white/10 mb-3`}>
                  <Sparkles className={`w-3 h-3 ${accent.text}`} />
                  {project.role}
                </span>
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  KEY ASSIGNMENT
                </p>
              </div>

              {/* Close Button on Image Side (visible on mobile) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-slate-950/60 backdrop-blur-sm text-white hover:bg-slate-950/80 transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details side */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between h-full">
              {/* Close button inside (visible on desktop) */}
              <div className="hidden md:flex justify-end absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 duration-150"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2">
                    PROJECT SUMMARY
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies used */}
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">
                    ARCHITECTURAL STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scope Highlights */}
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">
                    IMPACT & DELIVERABLES
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((hlt, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 mr-2.5 ${accent.text} mt-0.5 shrink-0`} />
                        <span>{hlt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTA links */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${accent.from} ${accent.to} text-slate-950 hover:opacity-90 font-medium text-sm transition-all duration-200 shadow-md ${accent.glow}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Deployment
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Ledger
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
