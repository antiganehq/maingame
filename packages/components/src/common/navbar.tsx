"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type NavDropdownItem = { label: string; href: string };

type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "dropdown"; label: string; items: NavDropdownItem[] };

type NavAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export interface NavbarProps {
  brand: ReactNode;
  items: NavItem[];
  actions?: NavAction[];
  showThemeToggle?: boolean;
}

export function Navbar({
  brand,
  items,
  actions,
  showThemeToggle = true,
}: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  const safeActions = actions ?? [];

  return (
    <nav className="relative w-full px-6 py-4 border-b border-[var(--color-border-light)]">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Left Side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="z-50">{brand}</div>

            {/* Navigation Items */}
            <div className="hidden items-center gap-1 lg:flex">
              {items.map((item) => {
                if (item.kind === "link") {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] no-underline"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenu === item.label && (
                        <>
                          <div className="absolute left-0 top-full h-2 w-full" />
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-lg"
                          >
                            <div className="p-2">
                              {item.items.map((sub, subIndex) => (
                                <motion.a
                                  key={sub.label}
                                  href={sub.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: subIndex * 0.03,
                                  }}
                                  className="block px-4 py-2.5 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                                >
                                  {sub.label}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop: Theme Toggle */}
            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="hidden h-10 w-10 items-center justify-center text-[var(--color-muted-foreground)] lg:flex"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Desktop: Action Buttons */}
            {safeActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="hidden lg:block"
              >
                <Button variant={action.variant}>{action.label}</Button>
              </Link>
            ))}

            {/* Mobile: Menu Button */}
            <Button
              variant="primary"
              className="h-10 w-10 p-0 lg:hidden z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--color-background)] lg:hidden"
          >
            <div className="h-[73px] border-b border-[var(--color-border-light)]" />

            <div className="mx-auto flex h-[calc(100%-73px)] max-w-[1400px] flex-col px-6">
              {/* Menu Content */}
              <div className="flex flex-1 flex-col gap-8 overflow-y-auto py-8 pb-0">
                {items.map((item, idx) => {
                  if (item.kind === "link") {
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + idx * 0.1,
                        }}
                        className="text-2xl font-medium text-[var(--color-foreground)] no-underline"
                      >
                        {item.label}
                      </motion.a>
                    );
                  }

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + idx * 0.1,
                      }}
                    >
                      <button
                        onClick={() =>
                          setMobileAccordion(
                            mobileAccordion === item.label ? null : item.label,
                          )
                        }
                        className="flex w-full items-center justify-between text-left text-2xl font-medium text-[var(--color-foreground)]"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-6 w-6 transition-transform ${mobileAccordion === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileAccordion === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 pt-4">
                              {item.items.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className="block px-4 py-3 text-base text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              {safeActions.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-[var(--color-border-light)] py-6">
                  {safeActions.map((action, actIdx) => (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + (items.length + actIdx) * 0.1,
                      }}
                      className={
                        action.variant === "primary"
                          ? "btn-primary text-center text-sm no-underline"
                          : "btn-secondary text-center text-sm no-underline"
                      }
                    >
                      {action.label}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
