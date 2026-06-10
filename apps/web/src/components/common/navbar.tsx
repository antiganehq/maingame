"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
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

  const menuItems = {
    products: [
      { name: "Analytics Dashboard", href: "#" },
      { name: "Marketing Suite", href: "#" },
      { name: "CRM Platform", href: "#" },
      { name: "Email Automation", href: "#" },
      { name: "Sales Tracking", href: "#" },
      { name: "Team Collaboration", href: "#" },
      { name: "Project Management", href: "#" },
    ],
    solutions: [
      { name: "For Startups", href: "#" },
      { name: "For Enterprise", href: "#" },
      { name: "For Agencies", href: "#" },
      { name: "For Freelancers", href: "#" },
      { name: "For E-commerce", href: "#" },
    ],
  };

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
            <Link href="/" className="text-xl font-medium z-50 font-display">
              maingame
            </Link>

            {/* Navigation Items */}
            <div className="hidden items-center gap-1 lg:flex">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("products")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {activeMenu === "products" && (
                    <>
                      {/* Invisible bridge to prevent flickering */}
                      <div className="absolute left-0 top-full h-2 w-full" />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-lg"
                      >
                        <div className="p-2">
                          {menuItems.products.map((item, index) => (
                            <motion.a
                              key={item.name}
                              href={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.03,
                              }}
                              className="block px-4 py-2.5 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                            >
                              {item.name}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("solutions")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
                  Solutions
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {activeMenu === "solutions" && (
                    <>
                      {/* Invisible bridge to prevent flickering */}
                      <div className="absolute left-0 top-full h-2 w-full" />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-lg"
                      >
                        <div className="p-2">
                          {menuItems.solutions.map((item, index) => (
                            <motion.a
                              key={item.name}
                              href={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.03,
                              }}
                              className="block px-4 py-2.5 text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                            >
                              {item.name}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple Link - Pricing */}
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] no-underline"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop: Theme Toggle */}
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

            {/* Desktop: Sign In Button */}
            <button className="hidden border border-[var(--color-border-light)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)] lg:block">
              Sign In
            </button>

            {/* Desktop: Get Pro Account Button */}
            <button className="hidden bg-[var(--color-foreground)] px-5 py-2 text-sm font-medium text-[var(--color-background)] hover:opacity-80 lg:block">
              Get Pro Account
            </button>

            {/* Mobile: Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center bg-[var(--color-foreground)] text-[var(--color-background)] lg:hidden z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
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
            {/* Spacer for consistent layout */}
            <div className="h-[73px] border-b border-[var(--color-border-light)]" />

            <div className="mx-auto flex h-[calc(100%-73px)] max-w-[1400px] flex-col px-6">
              {/* Menu Content */}
              <div className="flex flex-1 flex-col gap-8 overflow-y-auto py-8 pb-0">
                {/* Products Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <button
                    onClick={() =>
                      setMobileAccordion(
                        mobileAccordion === "products" ? null : "products",
                      )
                    }
                    className="flex w-full items-center justify-between text-left text-2xl font-medium text-[var(--color-foreground)]"
                  >
                    Products
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${mobileAccordion === "products" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "products" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-4">
                          {menuItems.products.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 text-base text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Solutions Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <button
                    onClick={() =>
                      setMobileAccordion(
                        mobileAccordion === "solutions" ? null : "solutions",
                      )
                    }
                    className="flex w-full items-center justify-between text-left text-2xl font-medium text-[var(--color-foreground)]"
                  >
                    Solutions
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${mobileAccordion === "solutions" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "solutions" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-4">
                          {menuItems.solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 text-base text-[var(--color-muted-foreground)] hover:bg-[var(--color-neutral-100)] no-underline"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pricing Link */}
                <motion.a
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-2xl font-medium text-[var(--color-foreground)] no-underline"
                >
                  Pricing
                </motion.a>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col gap-3 border-t border-[var(--color-border-light)] py-6">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="w-full border border-[var(--color-border-light)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)]"
                >
                  Sign In
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="w-full bg-[var(--color-foreground)] px-4 py-3 text-sm font-medium text-[var(--color-background)] hover:opacity-80"
                >
                  Get Pro Account
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
