import React from "react";
import { ShieldCheck, ShieldAlert, Target, ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center bg-[#0A1628] text-white overflow-hidden py-24 sm:py-32"
    >
      {/* Background with Dark Navy overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1706164971309-fb4785fe6ceb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZWFsJTIwZXN0YXRlJTIwaG91c2UlMjBleHRlcmlvciUyMGR1c2t8ZW58MHx8fHwxNzgyMjQ5NDg2fDA&ixlib=rb-4.1.0&q=85" 
          alt="Modern Real Estate Dusk" 
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-[#0A1628]/85 mix-blend-multiply"></div>
        {/* Subtle grid visual patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
            <Target className="w-4 h-4 text-[#C9A84C]" /> Engineered for investors. Built for the busy.
          </div>
          
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white max-w-3xl">
            Your Real Estate Portfolio, <span className="text-[#C9A84C]">Built with Military Precision.</span>
          </h1>
          
          <p className="font-sans text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            No hype, no guesswork. We bridge Army Engineering discipline with real-world real estate portfolio systems. Engineered for busy analytical professionals ready to scale wealth safely.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={scrollToContact}
              className="bg-[#C9A84C] text-[#0A1628] font-bold tracking-wider uppercase px-8 py-5 hover:bg-[#b09240] hover:translate-y-[-2px] active:translate-y-[0] transition-all flex items-center justify-center gap-3 font-montserrat text-sm"
              data-testid="hero-cta-button"
            >
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("financial-clarity-tool");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white/20 text-white font-bold tracking-wider uppercase px-8 py-5 hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-3 font-montserrat text-sm"
              data-testid="hero-secondary-button"
            >
              View Financial Tool
            </button>
          </div>
        </div>

        {/* Feature side metrics */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full pt-8 lg:pt-0">
          <div className="bg-[#FFFFFF]/5 backdrop-blur-md border border-white/10 p-6 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#C9A84C] shrink-0" />
            <div>
              <h4 className="font-montserrat font-bold text-lg text-white">Military Precision</h4>
              <p className="text-sm text-slate-300 mt-1">Applying strict Program Management standards (cost, schedule, performance) to every transaction.</p>
            </div>
          </div>
          <div className="bg-[#FFFFFF]/5 backdrop-blur-md border border-white/10 p-6 flex items-start gap-4">
            <Target className="w-8 h-8 text-[#C9A84C] shrink-0" />
            <div>
              <h4 className="font-montserrat font-bold text-lg text-white">Systems-Driven Scaling</h4>
              <p className="text-sm text-slate-300 mt-1">We don&apos;t gamble. We treat portfolio expansion as an optimized technical process built for busy experts.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
