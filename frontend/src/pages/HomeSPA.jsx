import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { FinancialClarity } from "@/components/FinancialClarity";
import { ComingSoon } from "@/components/ComingSoon";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomeSPA() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen text-[#0A1628]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <FinancialClarity />
        <ComingSoon />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
