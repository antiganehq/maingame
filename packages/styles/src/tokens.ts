/** Design tokens as typed constants. Mirrors tokens/colors.css, tokens/fonts.css, etc. */

export const colors = {
  white: "#ffffff",
  black: "#000000",

  brand: "#22c55e",
  brandForeground: "#ffffff",
  brandHover: "#16a34a",
  brandMuted: "rgba(34, 197, 94, 0.15)",

  neutral: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },

  success: "#22c55e",
  successForeground: "#ffffff",
  error: "#ef4444",
  errorForeground: "#ffffff",
  warning: "#f59e0b",
  warningForeground: "#000000",
  info: "#3b82f6",
  infoForeground: "#ffffff",

  background: "var(--color-background)",
  foreground: "var(--color-foreground)",
  section: "var(--color-section)",
  sectionForeground: "var(--color-section-foreground)",
  card: "var(--color-card)",
  cardForeground: "var(--color-card-foreground)",
  surface: "var(--color-surface)",
  surfaceForeground: "var(--color-surface-foreground)",
  surfaceHover: "var(--color-surface-hover)",
  muted: "var(--color-muted)",
  mutedForeground: "var(--color-muted-foreground)",
  border: "var(--color-border)",
  borderLight: "var(--color-border-light)",
  buttonSecondary: "var(--color-button-secondary)",
  buttonSecondaryHover: "var(--color-button-secondary-hover)",
  overlayDim: "var(--color-overlay-dim)",
  overlay: "var(--color-overlay)",
  overlayStrong: "var(--color-overlay-strong)",
} as const;

export const fontFamily = {
  sans: "var(--font-sans)",
  display: "var(--font-display)",
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
} as const;

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
} as const;

export const radii = {
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "arise-sm":
    "inset 2px 2px 5px rgba(0, 0, 0, 0.06), inset -2px -2px 5px rgba(255, 255, 255, 0.8), 2px 2px 5px rgba(0, 0, 0, 0.06), -2px -2px 5px rgba(255, 255, 255, 0.8)",
  "flat-sm":
    "3px 3px 6px rgba(0, 0, 0, 0.06), -3px -3px 6px rgba(255, 255, 255, 0.8)",
} as const;

export const zIndex = {
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 1000,
  toast: 1100,
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const durations = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;
