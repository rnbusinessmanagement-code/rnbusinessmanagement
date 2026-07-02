import React from "react";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-white border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Blurb (Left) */}
        <div className="md:col-span-6 space-y-4">
          <span className="font-montserrat font-extrabold text-lg tracking-tight text-white block">
            RN BUSINESS MANAGEMENT
          </span>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Led by Rafael Norat, former U.S. Army Engineer and Program Manager, we translate military-grade discipline into structured real estate portfolio systems built for busy analytical professionals.
          </p>
          <span className="block text-xs font-semibold tracking-widest text-[#C9A84C] uppercase font-montserrat">
            &quot;Engineered for investors. Built for the busy.&quot;
          </span>
        </div>

        {/* Quick Links / Socials (Right) */}
        <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-8 md:space-y-0">
          
          <div className="space-y-4 md:text-right">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">DIRECT INQUIRIES</span>
            <a 
              href="mailto:rnbusinessmanagement@gmail.com" 
              className="text-lg font-semibold hover:text-[#C9A84C] transition-colors text-white block"
              data-testid="footer-email-link"
            >
              rnbusinessmanagement@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] flex items-center justify-center transition-colors"
              data-testid="footer-social-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] flex items-center justify-center transition-colors"
              data-testid="footer-social-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] flex items-center justify-center transition-colors"
              data-testid="footer-social-facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>&copy; {currentYear} RN Business Management. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#hero" className="hover:text-white transition-colors">Back to Top</a>
          <span className="text-slate-700">|</span>
          <a href="/admin" className="hover:text-white transition-colors">Admin Access</a>
        </div>
      </div>
    </footer>
  );
};
