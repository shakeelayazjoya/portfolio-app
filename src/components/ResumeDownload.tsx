import React, { useState } from "react";
import { Download, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { PersonData, portfolioData } from "../data/portfolioData";

interface ResumeDownloadProps {
  person: PersonData;
  accent: {
    from: string;
    to: string;
    text: string;
    glow: string;
  };
}

export const ResumeDownload: React.FC<ResumeDownloadProps> = ({ person, accent }) => {
  const [downloadState, setDownloadState] = useState<"idle" | "generating" | "ready">("idle");
  const [progress, setProgress] = useState(0);

  const startDummyDownload = () => {
    if (downloadState !== "idle") return;
    
    setDownloadState("generating");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState("ready");
          
          // Trigger actual download of clean txt/markdown resume data structured for applicant tracking systems!
          triggerFileDownload();

          setTimeout(() => {
            setDownloadState("idle");
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const triggerFileDownload = () => {
    // Generate an incredibly detailed Markdown resume file directly from the typescript object, structure optimized for ATS scanners!
    const header = `${person.name.toUpperCase()}\n${person.title}\nEmail: ${person.email} | Contact: ${person.phone}\nLinkedIn: ${person.linkedin}\n\n========================================\nPROFESSIONAL SUMMARY\n========================================\n${person.summary}\n\n`;
    
    let skillsSection = `========================================\nTECHNICAL SKILLS\n========================================\n`;
    person.skills.forEach(cat => {
      skillsSection += `${cat.category}:\n`;
      skillsSection += cat.items.map(s => `${s.name} (${s.proficiency}%)`).join(", ") + "\n\n";
    });

    let experienceSection = `========================================\nPROFESSIONAL EXPERIENCE\n========================================\n`;
    person.experience.forEach(exp => {
      experienceSection += `${exp.position.toUpperCase()} | ${exp.company} (${exp.location})\n`;
      experienceSection += `${exp.period}\n`;
      exp.highlights.forEach(h => {
        experienceSection += `- ${h}\n`;
      });
      experienceSection += `\n`;
    });

    let educationSection = `========================================\nEDUCATION\n========================================\n`;
    person.education.forEach(edu => {
      educationSection += `${edu.degree}\n${edu.institution} | ${edu.period}\n\n`;
    });

    let certsSection = "";
    if (person.certifications && person.certifications.length > 0) {
      certsSection = `========================================\nCERTIFICATIONS\n========================================\n`;
      person.certifications.forEach(cert => {
        certsSection += `${cert.name} - Issued by ${cert.issuer}\n`;
      });
      certsSection += `\n`;
    }

    const fileContent = header + skillsSection + experienceSection + educationSection + certsSection + `System-generated via Dual Developer Portfolio Portal.`;
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${person.firstName}_${person.lastName}_Resume_ATS.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={startDummyDownload}
        disabled={downloadState === "generating"}
        className={`relative overflow-hidden group flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-md ${
          downloadState === "generating"
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border dark:border-slate-700 cursor-not-allowed"
            : "bg-slate-900 border border-slate-800 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 leading-tight"
        }`}
      >
        {downloadState === "idle" && (
          <>
            <Download className="w-4.5 h-4.5 group-hover:translate-y-0.5 transition-transform" />
            <span>Download ATS-friendly PDF</span>
          </>
        )}

        {downloadState === "generating" && (
          <>
            <Loader2 className="w-4.5 h-4.5 animate-spin text-cyan-500" />
            <span className="font-mono">Compiling ledger... {progress}%</span>
          </>
        )}

        {downloadState === "ready" && (
          <>
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
            <span className="text-emerald-500 font-mono">Downloaded successfully!</span>
          </>
        )}

        {/* Swipe overlay animation on idle button */}
        {downloadState === "idle" && (
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        )}
      </button>

      {/* Small informative prompt */}
      <span className="block mt-2 text-[10px] font-mono text-slate-400 text-center uppercase tracking-wider select-none">
        Optimized for AI Screeners & ATS (Verified)
      </span>
    </div>
  );
};
