"use client";

import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "sm" | "md" | "lg";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const;

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const smQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px)`);
    const mdQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`);
    const lgQuery = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);

    const updateBreakpoint = () => {
      if (lgQuery.matches) {
        setBreakpoint("lg");
      } else if (mdQuery.matches) {
        setBreakpoint("md");
      } else if (smQuery.matches) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("mobile");
      }
    };

    updateBreakpoint();

    smQuery.addEventListener("change", updateBreakpoint);
    mdQuery.addEventListener("change", updateBreakpoint);
    lgQuery.addEventListener("change", updateBreakpoint);

    return () => {
      smQuery.removeEventListener("change", updateBreakpoint);
      mdQuery.removeEventListener("change", updateBreakpoint);
      lgQuery.removeEventListener("change", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}
