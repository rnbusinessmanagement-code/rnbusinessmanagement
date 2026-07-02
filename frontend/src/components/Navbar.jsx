import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "hero", testId: "nav-link-home" },
    { name: "About", id: "about", testId: "nav-link-about" },
    { name: "Services", id: "services", testId: "nav-link-services" },
    { name: "Financial Clarity Tool", id: "financial-clarity-tool", testId: "nav-link-tool" },
    { name: "Contact", id: "contact", testId: "nav-link-contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F5F5F0]/90 border-b border-[#0A1628]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scroll("hero"); }} 
          className="flex flex-col items-start select-none"
          data-testid="navbar-brand"
        >
          <span className="font-montserrat font-extrabold text-xl tracking-tight text-[#0A1628]">
            RN BUSINESS MANAGEMENT
          </span>
          <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C] -mt-1">
            Engineered for Investors
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scroll(link.id)}
              className="text-sm font-semibold tracking-wide text-[#0A1628]/80 hover:text-[#C9A84C] transition-colors relative group py-2"
              data-testid={link.testId}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <a
            href="/admin"
            className="text-xs font-semibold tracking-widest uppercase text-[#0A1628]/40 hover:text-[#C9A84C] transition-colors ml-4"
            data-testid="nav-link-admin"
          >
            Admin
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => scroll("contact")}
            className="bg-[#C9A84C] text-[#0A1628] font-bold text-sm tracking-wider uppercase px-6 py-3 hover:bg-[#b09240] transition-colors flex items-center gap-2"
            data-testid="navbar-cta-button"
          >
            Strategy Call <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#0A1628] p-2 hover:text-[#C9A84C] transition-colors"
          data-testid="navbar-mobile-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#F5F5F0] border-b border-[#0A1628]/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scroll(link.id)}
                className="text-left font-montserrat font-bold text-xl tracking-tight text-[#0A1628] hover:text-[#C9A84C] transition-colors"
                data-testid={`${link.testId}-mobile`}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-[#0A1628]/10" />
            <a
              href="/admin"
              className="text-sm font-semibold tracking-widest uppercase text-[#0A1628]/60 hover:text-[#C9A84C]"
              data-testid="nav-link-admin-mobile"
            >
              Admin Dashboard
            </a>
            <button
              onClick={() => scroll("contact")}
              className="bg-[#0A1628] text-[#F5F5F0] font-bold text-sm tracking-wider uppercase py-4 hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors text-center w-full"
              data-testid="navbar-cta-button-mobile"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
