import React, { useState } from "react";
import { Plus, Trash2, ShieldCheck, Landmark } from "lucide-react";

export const FinancialClarity = () => {
  // Calculator local state
  const [properties, setProperties] = useState([
    { id: 1, name: "123 Maple Ave Duplex", rent: 2600, expenses: 1450 },
    { id: 2, name: "45 Broad St Triplex", rent: 4100, expenses: 2300 }
  ]);
  const [propName, setPropName] = useState("");
  const [propRent, setPropRent] = useState("");
  const [propExpenses, setPropExpenses] = useState("");

  // Waitlist form state
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const encode = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");

  // Add property to calculator
  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!propName || !propRent || !propExpenses) return;
    const rentVal = parseFloat(propRent);
    const expVal = parseFloat(propExpenses);
    if (isNaN(rentVal) || isNaN(expVal)) return;

    setProperties([
      ...properties,
      {
        id: Date.now(),
        name: propName,
        rent: rentVal,
        expenses: expVal
      }
    ]);
    setPropName("");
    setPropRent("");
    setPropExpenses("");
  };

  // Delete property from calculator
  const handleDeleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  // Calculate Net Cashflow
  const calculatePropertyNet = (p) => p.rent - p.expenses;
  const portfolioTotalNet = properties.reduce(
    (sum, p) => sum + calculatePropertyNet(p),
    0
  );

  // Handle Waitlist Signup
  const handleWaitlistSignup = async (e) => {
    e.preventDefault();
    if (!waitlistEmail) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "waitlist",
          name: waitlistName,
          email: waitlistEmail,
          source: "financial-clarity-tool"
        })
      });
      setSubmitted(true);
      setWaitlistName("");
      setWaitlistEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="financial-clarity-tool" className="py-20 sm:py-32 bg-[#F5F5F0] border-t border-[#0A1628]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Product Pitch & Waitlist Form (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
                FINANCIAL CLARITY TOOL
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] leading-tight">
                Know Your Number.
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#0A1628]/80 leading-relaxed">
                Property management software is too complicated. Real estate investment is built on one core equation: <strong className="font-bold text-[#0A1628]">What is your actual net cashflow?</strong>
              </p>
              <p className="font-sans text-sm sm:text-base text-[#0A1628]/70 leading-relaxed">
                The Financial Clarity Tool is designed specifically for investors with <strong className="font-bold">1–20 units</strong>. No steep learning curve. No expensive subscriptions. Just absolute, immediate clarity on your portfolio&apos;s performance.
              </p>
            </div>

            {/* Waitlist Box */}
            <div className="bg-[#FFFFFF] border border-[#0A1628]/10 p-8 sm:p-10 relative">
              <div className="absolute top-0 left-8 transform -translate-y-1/2 bg-[#C9A84C] text-[#0A1628] font-bold text-[10px] tracking-widest uppercase px-3 py-1">
                WAITLIST ACTIVE
              </div>
              <h4 className="font-montserrat font-bold text-lg text-[#0A1628] mb-2">Join the Launch Waitlist</h4>
              <p className="text-xs text-[#0A1628]/60 mb-6">Gain immediate access to our custom tool sheets and calculators upon live release.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-500/20 p-4 text-emerald-800 text-sm font-semibold" data-testid="waitlist-success">
                  Success! You have been successfully added to the Financial Clarity waitlist.
                </div>
              ) : (
                <form name="waitlist" method="POST" data-netlify="true" onSubmit={handleWaitlistSignup} className="space-y-4">
                  <input type="hidden" name="form-name" value="waitlist" />
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                      data-testid="waitlist-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                      data-testid="waitlist-email"
                    />
                  </div>
                  
                  {error && <p className="text-red-600 text-xs font-semibold">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0A1628] text-white font-bold text-xs uppercase tracking-widest py-4 hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors disabled:opacity-50"
                    data-testid="waitlist-submit"
                  >
                    {loading ? "Registering..." : "Reserve My Copy"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Interactive Demo Calculator (Right) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#0A1628]/10 p-8 sm:p-10 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="w-6 h-6 text-[#C9A84C]" />
              <div>
                <h3 className="font-montserrat font-bold text-xl text-[#0A1628]">Interactive Dashboard Mockup</h3>
                <p className="text-xs text-[#0A1628]/60">Try adding your current real estate assets below.</p>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end mb-8 bg-[#F5F5F0] p-4 border border-[#0A1628]/5">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-[#0A1628]/60">Property Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Main St Triplex"
                  value={propName}
                  onChange={(e) => setPropName(e.target.value)}
                  className="w-full bg-white border border-[#0A1628]/10 px-3 py-2 text-xs focus:border-[#C9A84C] focus:outline-none"
                  data-testid="calc-property-name"
                />
              </div>
              <div className="sm:col-span-3 space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-[#0A1628]/60">Monthly Rent ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="3000"
                  value={propRent}
                  onChange={(e) => setPropRent(e.target.value)}
                  className="w-full bg-white border border-[#0A1628]/10 px-3 py-2 text-xs focus:border-[#C9A84C] focus:outline-none"
                  data-testid="calc-monthly-rent"
                />
              </div>
              <div className="sm:col-span-3 space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-[#0A1628]/60">Expenses ($)</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="1800"
                  value={propExpenses}
                  onChange={(e) => setPropExpenses(e.target.value)}
                  className="w-full bg-white border border-[#0A1628]/10 px-3 py-2 text-xs focus:border-[#C9A84C] focus:outline-none"
                  data-testid="calc-monthly-expenses"
                />
              </div>
              <div className="sm:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-[#0A1628] hover:bg-[#C9A84C] hover:text-[#0A1628] text-white p-2 flex items-center justify-center transition-colors"
                  data-testid="calc-add-property"
                  title="Add Property"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Properties List Table */}
            <div className="border border-[#0A1628]/10 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0A1628] text-white font-montserrat uppercase tracking-wider font-semibold">
                    <th className="p-3">Property</th>
                    <th className="p-3 text-right">Gross Rent</th>
                    <th className="p-3 text-right">Total Expenses</th>
                    <th className="p-3 text-right">Net Cashflow</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1628]/10">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-[#0A1628]/40 italic">
                        No assets in mock portfolio. Add properties above to test.
                      </td>
                    </tr>
                  ) : (
                    properties.map((p) => (
                      <tr 
                        key={p.id} 
                        className="hover:bg-[#F5F5F0]/50 transition-colors"
                        data-testid="calc-property-row"
                      >
                        <td className="p-3 font-semibold text-[#0A1628]">{p.name}</td>
                        <td className="p-3 text-right text-[#0A1628]/80">${p.rent.toLocaleString()}</td>
                        <td className="p-3 text-right text-red-600">${p.expenses.toLocaleString()}</td>
                        <td className="p-3 text-right font-bold text-emerald-700">${calculatePropertyNet(p).toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteProperty(p.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Aggregate Portfolio Net Result Box */}
            <div className="mt-6 bg-[#0A1628] text-white p-6 flex flex-col sm:flex-row items-center justify-between border-l-4 border-[#C9A84C]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C9A84C]">CONSOLIDATED VALUE</span>
                <h4 className="font-montserrat font-extrabold text-xl">Your Monthly Portfolio Net</h4>
              </div>
              <div 
                className="text-3xl sm:text-4xl font-montserrat font-extrabold text-[#C9A84C] mt-2 sm:mt-0"
                data-testid="calc-net-cashflow"
              >
                ${portfolioTotalNet.toLocaleString()}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
