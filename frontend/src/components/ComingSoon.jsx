import React, { useState } from "react";
import axios from "axios";
import { Podcast, Rss } from "lucide-react";

export const ComingSoon = () => {
  // Podcast Form State
  const [podcastEmail, setPodcastEmail] = useState("");
  const [podcastSuccess, setPodcastSuccess] = useState(false);
  const [podcastError, setPodcastError] = useState("");
  const [podcastLoading, setPodcastLoading] = useState(false);

  // Blog Form State
  const [blogEmail, setBlogEmail] = useState("");
  const [blogSuccess, setBlogSuccess] = useState(false);
  const [blogError, setBlogError] = useState("");
  const [blogLoading, setBlogLoading] = useState(false);

  // Submit Newsletter
  const handleNewsletterSubmit = async (e, source, setEmail, setSuccess, setError, setLoading) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return;

    setLoading(true);
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/waitlist`, {
        email: email,
        source: source
      });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="coming-soon" className="py-20 sm:py-32 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            CONTENT HUB
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] leading-tight">
            Building Anticipation.
          </h2>
          <p className="font-sans text-base text-[#0A1628]/70 leading-relaxed">
            Analytical investor knowledge, engineered with military program management standards. Launching soon.
          </p>
        </div>

        {/* Two side by side Teaser Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Everyday Estate Podcast */}
          <div className="bg-[#0A1628] text-white border border-white/5 p-8 sm:p-12 flex flex-col justify-between group hover:border-[#C9A84C]/50 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 text-[#C9A84C] flex items-center justify-center">
                <Podcast className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-montserrat font-extrabold text-2xl text-white">Everyday Estate Podcast</h3>
                <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                  LAUNCHING SOON
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                For everyday real estate investors holding 3–20 units. No fluff interviews or fitness chats—just hard tactics on cashflow, optimization, and scaling standard property assets safely.
              </p>
            </div>

            {/* Email form */}
            <div className="pt-8">
              {podcastSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-300 text-xs font-semibold" data-testid="podcast-success">
                  Successfully subscribed! We will notify you when our first episode drops.
                </div>
              ) : (
                <form 
                  onSubmit={(e) => handleNewsletterSubmit(e, "podcast", setPodcastEmail, setPodcastSuccess, setPodcastError, setPodcastLoading)} 
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your professional email"
                      value={podcastEmail}
                      onChange={(e) => setPodcastEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] placeholder-slate-500"
                      data-testid="podcast-email"
                    />
                    <button
                      type="submit"
                      disabled={podcastLoading}
                      className="bg-[#C9A84C] text-[#0A1628] hover:bg-white hover:text-[#0A1628] font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors disabled:opacity-50 whitespace-nowrap"
                      data-testid="podcast-submit"
                    >
                      {podcastLoading ? "Sending..." : "Notify Me"}
                    </button>
                  </div>
                  {podcastError && <p className="text-red-400 text-xs font-semibold">{podcastError}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Card 2: The Blog */}
          <div className="bg-[#0A1628] text-white border border-white/5 p-8 sm:p-12 flex flex-col justify-between group hover:border-[#C9A84C]/50 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 text-[#C9A84C] flex items-center justify-center">
                <Rss className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-montserrat font-extrabold text-2xl text-white">The Blog</h3>
                <span className="inline-block bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                  COMING SOON
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Insights bridging real estate systems, military program management discipline, and scalable wealth building designed around an already packed professional calendar.
              </p>
            </div>

            {/* Email form */}
            <div className="pt-8">
              {blogSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-300 text-xs font-semibold" data-testid="blog-success">
                  Successfully subscribed! We will notify you once our blog launches.
                </div>
              ) : (
                <form 
                  onSubmit={(e) => handleNewsletterSubmit(e, "blog", setBlogEmail, setBlogSuccess, setBlogError, setBlogLoading)} 
                  className="space-y-3"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your professional email"
                      value={blogEmail}
                      onChange={(e) => setBlogEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] placeholder-slate-500"
                      data-testid="blog-email"
                    />
                    <button
                      type="submit"
                      disabled={blogLoading}
                      className="bg-[#C9A84C] text-[#0A1628] hover:bg-white hover:text-[#0A1628] font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors disabled:opacity-50 whitespace-nowrap"
                      data-testid="blog-submit"
                    >
                      {blogLoading ? "Sending..." : "Notify Me"}
                    </button>
                  </div>
                  {blogError && <p className="text-red-400 text-xs font-semibold">{blogError}</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
