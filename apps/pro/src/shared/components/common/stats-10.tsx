"use client";

import { useEffect, useRef, useMemo } from "react";
import { animate, motion } from "motion/react";

export type StatFormat = "integer" | "decimal" | "percentage";

export interface StatCardData {
  value: number;
  format?: StatFormat;
  suffix?: string;
  prefix?: string;
  label: string;
  bg?: string;
  fg?: string;
}

function formatValue(
  value: number,
  format: StatFormat,
  prefix?: string,
  suffix?: string,
): string {
  const p = prefix ?? "";
  const s = suffix ?? "";
  switch (format) {
    case "decimal":
      return `${p}${value.toFixed(1)}${s}`;
    case "percentage":
      return `${p}${Math.round(value)}${s}%`;
    case "integer":
    default:
      return `${p}${Math.round(value)}${s}`;
  }
}

function CountUp({
  to,
  format,
  prefix,
  suffix,
  duration = 2.4,
}: {
  to: number;
  format: StatFormat;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        el.textContent = formatValue(v, format, prefix, suffix);
      },
    });
    return () => controls.stop();
  }, [to, duration, format, prefix, suffix]);

  return <span ref={ref}>{formatValue(0, format, prefix, suffix)}</span>;
}

const DEFAULT_COLORS = [
  { bg: "#e4f1e8", fg: "#0e2a18" },
  { bg: "#122018", fg: "#c7e8d4" },
  { bg: "#dcd0f5", fg: "#1e163d" },
  { bg: "#ffd4b8", fg: "#3a1a08" },
  { bg: "#cde8f7", fg: "#0a1e2f" },
  { bg: "#f5e4d0", fg: "#3d1e08" },
];

export default function Stats10({ cards }: { cards: StatCardData[] }) {
  const displayCards = useMemo(
    () =>
      cards.map((c, i) => ({
        ...c,
        format: c.format ?? "integer",
        bg: c.bg ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length].bg,
        fg: c.fg ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length].fg,
      })),
    [cards],
  );

  return (
    <section className="w-full flex items-start sm:items-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1]"
        >
          Where games
          <br />
          meet their{" "}
          <span className="font-display text-(--color-brand)">audience</span>
        </motion.h2>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[240px]"
              style={{ backgroundColor: c.bg, color: c.fg }}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight tabular-nums">
                <CountUp
                  to={c.value}
                  format={c.format}
                  prefix={c.prefix}
                  suffix={c.suffix}
                />
              </span>
              <span className="text-sm sm:text-base leading-snug max-w-[220px]">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
