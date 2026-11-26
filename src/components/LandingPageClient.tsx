"use client";

import { useEffect, useRef, useState } from "react";
import { AiInvoiceDemo } from "@/components/AiInvoiceDemo";
import { ComparisonSection } from "@/components/ComparisonSection";
import {
  FaqAndContactSection,
  sectorOptions,
} from "@/components/FaqAndContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { SectorsSection } from "@/components/SectorsSection";
import { WhyUsBento } from "@/components/WhyUsBento";

export function LandingPageClient() {
  const [selectedSector, setSelectedSector] = useState<string>(
    sectorOptions[0]
  );
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const prefersMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    if (!prefersMotion) return;

    // Fallback for browsers without native animation-timeline: scroll()
    let onScroll: (() => void) | null = null;
    if (!CSS.supports("animation-timeline", "scroll()")) {
      onScroll = () => {
        const el = progressRef.current;
        if (!el) return;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
        el.style.transform = `scaleX(${pct})`;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Fallback for browsers without native animation-timeline: view()
    let observer: IntersectionObserver | null = null;
    if (
      !CSS.supports("(animation-timeline: view()) and (animation-range: entry)")
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12 }
      );

      document
        .querySelectorAll(".scroll-reveal, .scroll-reveal-card")
        .forEach((el) => observer?.observe(el));
    }

    return () => {
      if (onScroll) window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#eeede9] text-[#1b1b1b]">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="scroll-progress-bar"
      />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PortfolioShowcase />
        <AiInvoiceDemo />
        <WhyUsBento />
        <ComparisonSection />
        <SectorsSection onSelectSector={(name) => setSelectedSector(name)} />
        <FaqAndContactSection
          sector={selectedSector}
          onSectorChange={setSelectedSector}
        />
      </main>
      <Footer />
    </div>
  );
}
