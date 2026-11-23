"use client";

import { useState } from "react";
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

  return (
    <div className="flex min-h-screen flex-col bg-[#eeede9] text-[#1b1b1b]">
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
