// src/components/AnimatedCodeBlock.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import Prism from 'prismjs';
import { useTheme } from 'next-themes';

// ... (Prism language imports remain the same) ...
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface DisplayedLine {
  id: string;
  highlightedHtml: string;
}

interface AnimatedCodeBlockProps {
  codeLines: string[];
  language?: string;
  fileName?: string;
  lineDelay?: number;
  infinite?: boolean;
  codeAreaHeight?: string;
  scrollDuration?: number;
}

const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};

const AnimatedCodeBlock: React.FC<AnimatedCodeBlockProps> = ({
  codeLines,
  language = "javascript",
  fileName = "code.ts",
  lineDelay = 300,
  infinite = true,
  codeAreaHeight = "h-60",
  scrollDuration = 700,
}) => {
  const { resolvedTheme } = useTheme();
  // ... (useState, useRef, variants, and other hooks remain the same) ...
  const [displayedLines, setDisplayedLines] = useState<DisplayedLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const codeDisplayAreaRef = useRef<HTMLPreElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const containerVariants: Variants = {};
  const codeAreaWrapperVariants: Variants = {};

  containerVariants.hidden = { opacity: 0, scale: 0.90, y: 30 };
  containerVariants.visible = {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20, duration: 0.7, delay: 0.2 },
  };
  codeAreaWrapperVariants.hidden = { opacity: 0 };
  codeAreaWrapperVariants.visible = { opacity: 1, transition: { duration: 0.5, delay: 0.7 } };


  const glowBoxShadow = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return '0 0 25px rgba(59, 130, 246, 0.35), 0 0 50px rgba(59, 130, 246, 0.25), 0 0 75px rgba(59, 130, 246, 0.15)';
    } else {
      return '0 0 20px rgba(107, 114, 128, 0.15), 0 0 40px rgba(107, 114, 128, 0.1), 0 0 60px rgba(107, 114, 128, 0.05)';
    }
  }, [resolvedTheme]);

  const startCustomSmoothScroll = useCallback(
    (element: HTMLElement, to: number, duration: number) => {
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
      const start = element.scrollTop;
      const change = to - start;
      let startTime: number | null = null;
      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        element.scrollTop = easeInOutCubic(timeElapsed, start, change, duration);
        if (timeElapsed < duration) {
          scrollAnimationRef.current = requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
          scrollAnimationRef.current = null;
        }
      };
      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    },
    []
  );

  useEffect(() => setIsComponentVisible(true), []);

  useEffect(() => {
    // ... (line appearance logic remains the same) ...
    if (!isComponentVisible) return;
    if (currentLineIndex >= codeLines.length) {
      if (infinite) {
        const resetTimer = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          if (codeDisplayAreaRef.current) {
            startCustomSmoothScroll(codeDisplayAreaRef.current, 0, scrollDuration);
          }
        }, lineDelay * 5);
        return () => clearTimeout(resetTimer);
      }
      return;
    }
    const lineTimer = setTimeout(() => {
      const rawLine = codeLines[currentLineIndex];
      let highlightedHtmlLine = rawLine;
      if (Prism.languages[language]) {
        try {
          highlightedHtmlLine = Prism.highlight(rawLine, Prism.languages[language], language);
        } catch (e) { console.error("Prism.js highlighting error:", e); }
      } else { console.warn(`Prism.js language '${language}' not loaded.`); }
      const newLine: DisplayedLine = {
        id: `${currentLineIndex}-${new Date().getTime()}`,
        highlightedHtml: highlightedHtmlLine,
      };
      setDisplayedLines((prev) => [...prev, newLine]);
      setCurrentLineIndex((prev) => prev + 1);
    }, lineDelay);
    return () => clearTimeout(lineTimer);
  }, [
    isComponentVisible, currentLineIndex, codeLines, language,
    lineDelay, infinite, startCustomSmoothScroll, scrollDuration,
  ]);

  useEffect(() => {
    // ... (auto-scroll logic remains the same) ...
    if (codeDisplayAreaRef.current && displayedLines.length > 0) {
      startCustomSmoothScroll(
        codeDisplayAreaRef.current,
        codeDisplayAreaRef.current.scrollHeight,
        scrollDuration
      );
    }
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
    };
  }, [displayedLines, startCustomSmoothScroll, scrollDuration]);


  const maskStyle: React.CSSProperties = { /* ... (same) ... */ };
  maskStyle.maskImage = 'linear-gradient(to bottom, transparent 0%, black 24px, black 100%)';
  // @ts-ignore
  maskStyle.WebkitMaskImage = 'linear-gradient(to bottom, transparent 0%, black 24px, black 100%)';
  maskStyle.scrollbarGutter = 'stable both-edges';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isComponentVisible ? 'visible' : 'hidden'}
      className="relative overflow-hidden bg-white shadow-2xl dark:bg-slate-800 rounded-xl"
      style={{ boxShadow: glowBoxShadow }}
    >
      {/* Header - Updated for a more refined Glassmorphism in Dark Mode */}
      <div
        className={`
          px-4 py-3 flex items-center border-b 
          bg-slate-100 border-slate-200  /* Light mode styles */
          dark:bg-black/40 dark:border-slate-700/50 dark:backdrop-blur-[5px] /* Dark mode glass effect */
          transition-colors duration-300 ease-in-out
        `}
      >
        <div className="flex mr-4 space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        {fileName && (
          <span 
            className={`
              text-xs px-3 py-1 rounded-md
              bg-slate-200 text-slate-600 /* Light mode filename tab */
              dark:bg-white/10 dark:text-slate-300 /* Dark mode filename tab - subtle glass */
            `}
          >
            {fileName}
          </span>
        )}
      </div>

      <motion.div
        variants={codeAreaWrapperVariants}
        initial="hidden"
        animate={isComponentVisible ? 'visible' : 'hidden'}
        className="p-6" // This padding ensures the <pre> content doesn't go under the header
      >
        <pre
          ref={codeDisplayAreaRef}
          className={`${codeAreaHeight} overflow-y-auto 
            font-mono text-sm leading-relaxed block animated-code-scrollbar 
            whitespace-pre-wrap 
            text-slate-700 dark:text-slate-300`} // Base text colors
          style={maskStyle}
          aria-live="polite"
        >
          {displayedLines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              dangerouslySetInnerHTML={{ __html: line.highlightedHtml }}
            />
          ))}
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCodeBlock;