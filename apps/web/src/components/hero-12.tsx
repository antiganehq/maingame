"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { tagline1, tagline2 } from "@maingame/brand";

export function Hero12() {
  const buttonText = "Become Pro Now";
  return (
    <section className="relative w-full bg-[var(--color-surface)] dark:bg-[var(--color-section)] overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1400px] mx-auto w-full h-full relative min-h-[600px]">
        <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
          <video
            src="https://res.cloudinary.com/dcf3oktvs/video/upload/v1743225301/hb1b0kqgmkjlpy9qglzy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[var(--color-overlay-dim)] dark:bg-[var(--color-overlay)] lg:bg-transparent" />
        </div>

        <div className="absolute top-0 left-0 z-10 w-full max-w-2xl flex flex-col items-start pointer-events-none">
          <div className="bg-[var(--color-surface)] dark:bg-[var(--color-section)] w-fit p-4 relative rounded-br-4xl pointer-events-auto">
            <h1 className="whitespace-nowrap text-2xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[var(--color-surface-foreground)] dark:text-[var(--color-section-foreground)] leading-[1.1]">
              {tagline1}
            </h1>
            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -right-10 rotate-180 text-[var(--color-surface)] dark:text-[var(--color-section)]"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="bg-[var(--color-surface)] dark:bg-[var(--color-section)] w-fit p-4 relative rounded-br-4xl pointer-events-auto">
            <h1 className="whitespace-nowrap text-2xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[var(--color-surface-foreground)] dark:text-[var(--color-section-foreground)] leading-[1.1]">
              {tagline2}
            </h1>

            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -right-10 rotate-180 text-[var(--color-surface)] dark:text-[var(--color-section)]"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>

            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-10 left-0 rotate-180 text-[var(--color-surface)] dark:text-[var(--color-section)]"
            >
              <path
                d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Mobile Button - Below Text */}
          <div className="mt-8 ml-4 lg:hidden">
            <motion.button
              className="px-6 py-3 rounded-full bg-[var(--color-surface)] text-[var(--color-surface-foreground)] font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-surface-hover)] transition-colors shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <motion.button
            className="px-6 py-3 rounded-2xl bg-[var(--color-surface)] text-[var(--color-surface-foreground)] font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-surface-hover)] transition-colors shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {buttonText}

            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
