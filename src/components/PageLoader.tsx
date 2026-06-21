import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 800); // Allow fade out animation to finish
          }, 300);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090b11] text-white"
        >
          {/* Subtle grid background for the loader */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111625_1px,transparent_1px),linear-gradient(to_bottom,#111625_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* Glowing Aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute h-[350px] w-[350px] rounded-full bg-cyan-500 blur-[80px]"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Assembly Container */}
            <div className="relative mb-8 h-24 w-40 flex justify-center items-center">
              {/* Box outlines */}
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 border border-slate-700/60 rounded"
              />

              {/* Initials Assembly */}
              <div className="flex gap-4 text-4xl font-extrabold tracking-widest font-mono">
                <motion.span
                  initial={{ y: 20, opacity: 0, scale: 0.6 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                >
                  MW
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 0.4 }}
                  className="text-slate-600 font-light"
                >
                  &times;
                </motion.span>
                <motion.span
                  initial={{ y: -20, opacity: 0, scale: 0.6 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                  className="bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent"
                >
                  MS
                </motion.span>
              </div>

              {/* Corner brackets */}
              <span className="absolute top-1 left-2 text-[10px] text-cyan-500 font-mono select-none">SYS_INITIALIZE</span>
              <span className="absolute bottom-1 right-2 text-[10px] text-violet-500 font-mono select-none">v4.2.0</span>
            </div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-3 text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase"
            >
              Building Dual Developer Journey
            </motion.p>

            {/* Progress bar */}
            <div className="relative h-[2px] w-56 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Loading metrics */}
            <div className="mt-2 text-[10px] font-mono text-slate-500 flex justify-between w-56">
              <span>INITIAL_RESOURCES</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
