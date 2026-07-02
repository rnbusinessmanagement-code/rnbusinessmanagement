import React from "react";
import { CheckCircle2, Award, Building, Users } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column (Left) */}
          <div className="lg:col-span-5 relative group">
            {/* Subtle solid geometric accent boxes to convey engineering depth */}
            <div className="absolute -inset-4 border border-[#C9A84C]/30 bg-transparent pointer-events-none translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="absolute inset-0 bg-[#0A1628]/25 mix-blend-color group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
            <img
              src="https://images.pexels.com/photos/10041264/pexels-photo-10041264.jpeg"
              alt="Rafael Norat - Principal Consultant"
              className="w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 border border-[#0A1628]/10 shadow-lg relative z-0 aspect-[4/5]"
              data-testid="about-portrait"
            />
            {/* Badge overlay */}
            <div className="absolute bottom-6 right-6 bg-[#0A1628] text-white px-6 py-4 border border-[#C9A84C]/40 z-20 shadow-md">
              <span className="font-montserrat block font-extrabold text-2xl text-[#C9A84C]">Rafael Norat</span>
              <span className="text-[10px] uppercase font-bold tracking-widest block text-slate-300 mt-1">Managing Director</span>
            </div>
          </div>

          {/* Biography Column (Right) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
              THE FOUNDER&apos;S BRIEF
            </span>
            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] leading-tight">
              An Engineered Approach to Generational Wealth.
            </h2>
            
            <p className="font-sans text-base sm:text-lg text-[#0A1628]/80 leading-relaxed">
              Before becoming a full-time real estate investor, mentor, and consultant, Rafael Norat spent <strong className="text-[#0A1628] font-bold">17 years as a U.S. Army Engineer and Program Manager</strong> at Picatinny Arsenal, spearheading crucial defense programs. There, failure was not an option, and everything rested on rigorous planning: cost, schedule, and performance.
            </p>
            
            <p className="font-sans text-base sm:text-lg text-[#0A1628]/80 leading-relaxed">
              Since 2013, Rafael has translated that elite PM discipline into real estate. Treating property investment as a high-performing technical system rather than a financial gamble, he has structured, designed, and executed:
            </p>

            {/* Quick Metrics Bento grid */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 p-4">
                <span className="block font-montserrat text-2xl sm:text-3xl font-extrabold text-[#0A1628]">40+ Units</span>
                <span className="text-xs text-[#0A1628]/60 uppercase font-semibold tracking-wider">Acquired & Managed</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 p-4">
                <span className="block font-montserrat text-2xl sm:text-3xl font-extrabold text-[#0A1628]">15+ Flips</span>
                <span className="text-xs text-[#0A1628]/60 uppercase font-semibold tracking-wider">Executed with Precision</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 p-4">
                <span className="block font-montserrat text-2xl sm:text-3xl font-extrabold text-[#0A1628]">17 Years</span>
                <span className="text-xs text-[#0A1628]/60 uppercase font-semibold tracking-wider">Military PM Experience</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 p-4">
                <span className="block font-montserrat text-2xl sm:text-3xl font-extrabold text-[#0A1628]">65K+ Members</span>
                <span className="text-xs text-[#0A1628]/60 uppercase font-semibold tracking-wider">RE Wealth Institute</span>
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#0A1628]/80 leading-relaxed">
              As active Managing Director of RN Business Management and a core leading consultant with the Real Estate Wealth Institute, Rafael now consults busy, analytical professional-class investors who want premium assets without the operational friction.
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-sm sm:text-base font-bold text-[#0A1628]">No-nonsense advisory, zero hype</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-sm sm:text-base font-bold text-[#0A1628]">Built specifically for busy professionals who lack time</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
