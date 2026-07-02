import React, { useState } from "react";
import axios from "axios";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        name,
        email,
        what_are_you_working_on: message
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Pitch Info (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
              TACTICAL CONSULTATION
            </span>
            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Stop Guessing. Build Your System.
            </h2>
            <p className="font-sans text-base text-slate-300 leading-relaxed">
              Let&apos;s align your real estate portfolio scaling with strict program management discipline. We evaluate your current portfolio gaps, financial bottlenecks, and build an execution plan.
            </p>

            <div className="border-t border-white/10 pt-8 mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-sm font-semibold text-white">rnbusinessmanagement@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-sm text-slate-300">Response within 24 business hours guaranteed.</span>
              </div>
            </div>
          </div>

          {/* Contact Form Box (Right) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] text-[#0A1628] p-8 sm:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-12 transform -translate-y-1/2 bg-[#C9A84C] text-[#0A1628] font-bold text-xs tracking-widest uppercase px-4 py-2">
              FREE STRATEGY BRIEF
            </div>
            
            <h3 className="font-montserrat font-extrabold text-2xl text-[#0A1628] mb-6">Brief Rafael on Your Operations</h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-500/20 p-6 text-emerald-800 text-sm font-semibold rounded-none" data-testid="contact-success">
                <h4 className="font-montserrat font-bold text-lg mb-1">Message Transmitted</h4>
                Your operational details have been sent to Rafael. Expect a response directly in your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60 block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                    data-testid="contact-name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60 block">Professional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. david@vanceholdings.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                    data-testid="contact-email"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60 block">What are you working on?</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Briefly describe your current portfolio size, goals, or operational friction points..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors resize-none"
                    data-testid="contact-message"
                  />
                </div>

                {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0A1628] text-white font-bold text-xs uppercase tracking-widest py-4 hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="contact-submit"
                >
                  {loading ? "Transmitting..." : "Send My Message"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
