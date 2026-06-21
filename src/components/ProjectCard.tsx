import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../data/portfolioData";

interface ProjectCardProps {
  project: Project;
  onSelect: (proj: Project) => void;
  accent: {
    from: string;
    to: string;
    text: string;
    glow: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, accent }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to the element (from 0 to width/height)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Map mouse position to key rotation ranges [-10deg, 10deg]
    const rX = ((height / 2 - mouseY) / (height / 2)) * 8;
    const rY = ((mouseX - width / 2) / (width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s ease-out" : "none",
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-4 backdrop-blur-md shadow-lg transition-shadow hover:shadow-2xl hover:shadow-slate-500/10 dark:hover:border-slate-700 h-full flex flex-col justify-between"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        {/* Card Image Area with visual overlays */}
        <div className="relative mb-5 h-48 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply transition-opacity group-hover:opacity-0" />
          
          {/* Subtle Accent Glow Border */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Link reveal circle */}
          <div className="absolute bottom-3 right-3 translate-x-1 translate-y-1 opacity-0 group-hover:translate-0 group-hover:opacity-100 transition-all duration-300">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white border border-white/20 shadow-md`}>
              <ArrowUpRight className={`w-4.5 h-4.5 ${accent.text}`} />
            </span>
          </div>
        </div>

        {/* Tech tags list */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 self-center">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Card text content */}
        <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
          ROLE: {project.role}
        </span>
        <span className={`text-xs font-medium font-mono flex items-center gap-1 ${accent.text} group-hover:translate-x-1 transition-transform`}>
          View Specs &rarr;
        </span>
      </div>
    </motion.div>
  );
};
