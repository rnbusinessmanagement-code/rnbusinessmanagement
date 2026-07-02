import React from "react";
import { FolderGit, CheckSquare, Award, ArrowRight, Tool, Sliders, Briefcase } from "lucide-react";

export const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTool = () => {
    const element = document.getElementById("financial-clarity-tool");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-32 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            SERVICE TEERS
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] leading-tight">
            How We Optimize Your Real Estate Operations.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0A1628]/70">
            A three-tier model engineered to support you at any stage—from foundational tools to complete fractional leadership.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Tier 1: Tools & Templates */}
          <div 
            className="lg:col-span-4 bg-[#F5F5F0] border border-[#0A1628]/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#C9A84C] hover:shadow-lg transition-all duration-300"
            data-testid="service-card-tools"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#0A1628] text-[#C9A84C] flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C9A84C]">Tier 01 // Low-Ticket</span>
                <h3 className="font-montserrat font-extrabold text-2xl text-[#0A1628]">Tools & Templates</h3>
              </div>
              <p className="text-sm text-[#0A1628]/80 leading-relaxed">
                Foundational analytical tools designed to cut through management software bloat and give you direct portfolio visibility.
              </p>
              <ul className="text-xs space-y-3 font-semibold text-[#0A1628]/70">
                <li className="flex items-center gap-2">• Financial Clarity Tool (&quot;Know Your Number&quot;)</li>
                <li className="flex items-center gap-2">• Custom Investment Calculators</li>
                <li className="flex items-center gap-2">• Professional Property Inspection Checklists</li>
              </ul>
            </div>
            
            <div className="pt-8">
              <button 
                onClick={scrollToTool}
                className="w-full text-center py-4 bg-transparent border border-[#0A1628] text-[#0A1628] font-bold text-xs uppercase tracking-widest hover:bg-[#0A1628] hover:text-[#F5F5F0] transition-colors"
                data-testid="service-cta-tools"
              >
                Access Tool
              </button>
            </div>
          </div>

          {/* Tier 2: Done-For-You Packages */}
          <div 
            className="lg:col-span-4 bg-[#F5F5F0] border border-[#0A1628]/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#C9A84C] hover:shadow-lg transition-all duration-300"
            data-testid="service-card-packages"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#0A1628] text-[#C9A84C] flex items-center justify-center">
                <FolderGit className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C9A84C]">Tier 02 // Mid-Tier</span>
                <h3 className="font-montserrat font-extrabold text-2xl text-[#0A1628]">Done-For-You Packages</h3>
              </div>
              <p className="text-sm text-[#0A1628]/80 leading-relaxed">
                Operational assets prepared with technical precision to secure institutional financing and project confidence.
              </p>
              <ul className="text-xs space-y-3 font-semibold text-[#0A1628]/70">
                <li className="flex items-center gap-2">• Lender / Refinance Pack Preparation</li>
                <li className="flex items-center gap-2">• High-Quality Investor Pitch Presentations</li>
                <li className="flex items-center gap-2">• Underwriting review & portfolio auditing</li>
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={scrollToContact}
                className="w-full text-center py-4 bg-transparent border border-[#0A1628] text-[#0A1628] font-bold text-xs uppercase tracking-widest hover:bg-[#0A1628] hover:text-[#F5F5F0] transition-colors"
                data-testid="service-cta-packages"
              >
                Inquire Pack
              </button>
            </div>
          </div>

          {/* Tier 3: Consulting Retainer (PREMIUM - Larger visual weight) */}
          <div 
            className="lg:col-span-4 bg-[#0A1628] text-white border-2 border-[#C9A84C]/20 p-8 sm:p-10 flex flex-col justify-between relative group hover:border-[#C9A84C] hover:shadow-2xl transition-all duration-300"
            data-testid="service-card-retainer"
          >
            {/* Visual absolute badge */}
            <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-[#C9A84C] text-[#0A1628] font-bold text-[10px] tracking-widest uppercase px-4 py-2">
              Fractional CSO
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#C9A84C] text-[#0A1628] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest uppercase text-[#C9A84C]">Tier 03 // Premium Retainer</span>
                <h3 className="font-montserrat font-extrabold text-2xl text-white">Consulting Retainer</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ongoing advisory acting as your Fractional Chief Strategic Officer. Perfect for busy professionals actively scaling.
              </p>
              <ul className="text-xs space-y-3 font-semibold text-slate-300">
                <li className="flex items-center gap-2 text-white">• Monthly Strategic Portfolio Guidance</li>
                <li className="flex items-center gap-2 text-white">• Direct PM cost/schedule analysis</li>
                <li className="flex items-center gap-2 text-white">• Live underwriting reviews & risk mitigation</li>
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={scrollToContact}
                className="w-full text-center py-4 bg-[#C9A84C] text-[#0A1628] font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#0A1628] transition-colors"
                data-testid="service-cta-retainer"
              >
                Retain Advisory
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
