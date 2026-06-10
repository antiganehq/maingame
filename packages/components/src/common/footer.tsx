"use client";
import { SquarePen } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <div className="w-full flex flex-col">
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col space-y-6">
            <h3 className="text-xs font-medium tracking-tight text-[var(--color-muted)] uppercase">
              Explore
            </h3>
            <ul className="flex flex-col space-y-4">
              {["Playground", "Showcase", "Docs"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-2xl font-medium tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-xs font-medium tracking-tight text-[var(--color-muted)] uppercase">
              Studio
            </h3>
            <ul className="flex flex-col space-y-4">
              {["Experiments", "Prototypes"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-2xl font-medium tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-xs font-medium tracking-tight text-[var(--color-muted)] uppercase">
              Community
            </h3>
            <ul className="flex flex-col space-y-4">
              {["Discussion", "Events", "Hackathons"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-2xl font-medium tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="text-xs font-medium tracking-tight text-[var(--color-muted)] uppercase">
              Connect
            </h3>
            <a
              href="mailto:hello@maingame.fun"
              className="text-2xl font-medium tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors break-words"
            >
              hello@maingame.fun
            </a>
          </div>
        </div>
      </section>

      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-[var(--color-section)]">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 select-none">
            <span className="text-xl text-[var(--color-section-foreground)] font-display uppercase">
              maingame
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <span className="text-sm font-medium tracking-tight text-[var(--color-section-foreground)]">
              © 2025 maingame - All Rights Reserved
            </span>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-[var(--color-section-foreground)] hover:text-[var(--color-muted)] transition-colors"
              >
                <FaLinkedin className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="text-[var(--color-section-foreground)] hover:text-[var(--color-muted)] transition-colors"
              >
                <FaTwitter className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="text-[var(--color-section-foreground)] hover:text-[var(--color-muted)] transition-colors"
              >
                <SquarePen className="w-5 h-5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
