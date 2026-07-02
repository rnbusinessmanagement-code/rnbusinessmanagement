import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { LogOut, Trash2, Mail, Calendar, Sparkles, FolderLock } from "lucide-react";

export default function AdminDashboard() {
  const { user, loading, login, logout } = useAuth();
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [submissions, setSubmissions] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [activeTab, setActiveTab] = useState("submissions"); // submissions, waitlist
  const [dataError, setDataError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setDataError("");
    const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
    try {
      const [subsRes, wlRes] = await Promise.all([
        axios.get(`${API}/admin/submissions`, { withCredentials: true }),
        axios.get(`${API}/admin/waitlist`, { withCredentials: true })
      ]);
      setSubmissions(subsRes.data);
      setWaitlist(wlRes.data);
    } catch (e) {
      setDataError("Failed to fetch dashboard data. Please check authorization.");
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchDashboardData();
    }
  }, [user]);

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoginLoading(true);
    setLoginError("");
    try {
      await login(email, password);
    } catch (err) {
      setLoginError(err.response?.data?.detail || "Invalid admin credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Status Update for Contact Submission
  const handleStatusChange = async (subId, newStatus) => {
    const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
    try {
      await axios.patch(
        `${API}/admin/submissions/${subId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update local state
      setSubmissions(
        submissions.map((sub) => (sub._id === subId ? { ...sub, status: newStatus } : sub))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Handle Delete Contact Submission
  const handleDeleteSubmission = async (subId) => {
    if (!window.confirm("Are you sure you want to delete this contact submission?")) return;
    const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
    try {
      await axios.delete(`${API}/admin/submissions/${subId}`, { withCredentials: true });
      setSubmissions(submissions.filter((sub) => sub._id !== subId));
    } catch (err) {
      alert("Failed to delete submission");
    }
  };

  // Handle Delete Waitlist Entry
  const handleDeleteWaitlist = async (wlId) => {
    if (!window.confirm("Are you sure you want to delete this waitlist entry?")) return;
    const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
    try {
      await axios.delete(`${API}/admin/waitlist/${wlId}`, { withCredentials: true });
      setWaitlist(waitlist.filter((wl) => wl._id !== wlId));
    } catch (err) {
      alert("Failed to delete waitlist entry");
    }
  };

  // Format dates cleanly
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (_) {
      return dateStr;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#0A1628] border-t-[#C9A84C] animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-[#0A1628]/60 uppercase tracking-widest">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  // Login View if not logged in
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#0A1628]/10 p-8 sm:p-12 shadow-2xl relative">
          <div className="absolute top-0 left-12 transform -translate-y-1/2 bg-[#0A1628] text-[#C9A84C] border border-[#C9A84C]/30 font-bold text-xs tracking-widest uppercase px-4 py-2 flex items-center gap-2">
            <FolderLock className="w-4 h-4" /> SECURE GATEWAY
          </div>
          
          <div className="text-center mb-8">
            <h1 className="font-montserrat font-extrabold text-2xl text-[#0A1628]">Admin Access</h1>
            <p className="text-xs text-[#0A1628]/60 mt-1">Authorized personnel only. Sessions are fully audited.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                placeholder="rafael.norat@rnbusiness.com"
                data-testid="admin-login-email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#0A1628]/60 block">Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#0A1628]/20 focus:border-[#C9A84C] focus:outline-none py-2 text-sm text-[#0A1628] placeholder-[#0A1628]/30 transition-colors"
                placeholder="••••••••"
                data-testid="admin-login-password"
              />
            </div>

            {loginError && (
              <p className="text-red-600 text-xs font-semibold" data-testid="admin-login-error">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#0A1628] text-white font-bold text-xs uppercase tracking-widest py-4 hover:bg-[#C9A84C] hover:text-[#0A1628] transition-colors disabled:opacity-50"
              data-testid="admin-login-submit"
            >
              {loginLoading ? "Authorizing..." : "Authenticate"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-xs text-[#0A1628]/60 hover:text-[#C9A84C] underline">Return to public site</a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      
      {/* Top Banner Bar */}
      <header className="bg-[#0A1628] text-white border-b border-white/5 py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C9A84C]" />
            <div>
              <span className="font-montserrat font-extrabold text-sm tracking-tight text-white block">
                RN BUSINESS COMMAND
              </span>
              <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">
                Administrator: {user.name} ({user.email})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs text-slate-300 hover:text-[#C9A84C] transition-colors">Public Site</a>
            <button
              onClick={logout}
              className="bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              data-testid="admin-logout-btn"
            >
              Log Out <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Panel */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="space-y-8">
          
          {/* Section heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-montserrat font-extrabold text-3xl text-[#0A1628]">Lead Operations Panel</h2>
              <p className="text-xs text-[#0A1628]/60 mt-1">Reviewing incoming consulting briefs and software waitlist registrations.</p>
            </div>
            {/* Quick stats banner */}
            <div className="flex gap-4">
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 px-4 py-2 text-center">
                <span className="block text-2xl font-montserrat font-bold text-[#0A1628]">{submissions.length}</span>
                <span className="text-[9px] uppercase font-bold text-[#0A1628]/50 tracking-wider">Submissions</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#0A1628]/10 px-4 py-2 text-center">
                <span className="block text-2xl font-montserrat font-bold text-[#0A1628]">{waitlist.length}</span>
                <span className="text-[9px] uppercase font-bold text-[#0A1628]/50 tracking-wider">Waitlists</span>
              </div>
            </div>
          </div>

          {dataError && (
            <div className="bg-red-50 border border-red-500/20 p-4 text-red-800 text-sm font-semibold rounded-none">
              {dataError}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#0A1628]/10">
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-6 py-3 font-montserrat font-bold text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "submissions"
                  ? "border-[#C9A84C] text-[#0A1628]"
                  : "border-transparent text-[#0A1628]/40 hover:text-[#0A1628]"
              }`}
              data-testid="admin-nav-submissions"
            >
              Contact Briefs ({submissions.length})
            </button>
            <button
              onClick={() => setActiveTab("waitlist")}
              className={`px-6 py-3 font-montserrat font-bold text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "waitlist"
                  ? "border-[#C9A84C] text-[#0A1628]"
                  : "border-transparent text-[#0A1628]/40 hover:text-[#0A1628]"
              }`}
              data-testid="admin-nav-waitlist"
            >
              Software Waitlists ({waitlist.length})
            </button>
          </div>

          {/* Tab Contents: Submissions */}
          {activeTab === "submissions" && (
            <div className="bg-[#FFFFFF] border border-[#0A1628]/10 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs" data-testid="submissions-table">
                <thead>
                  <tr className="bg-[#0A1628] text-white font-montserrat uppercase tracking-wider font-bold">
                    <th className="p-4">Contact</th>
                    <th className="p-4">Operational Brief / Message</th>
                    <th className="p-4">Submitted At</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1628]/10 text-[#0A1628]">
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-[#0A1628]/40 italic">
                        No contact submissions found in database.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-[#F5F5F0]/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-sm">{sub.name}</div>
                          <div className="text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#C9A84C]" /> {sub.email}
                          </div>
                        </td>
                        <td className="p-4 max-w-md">
                          <p className="whitespace-pre-wrap leading-relaxed text-[#0A1628]/80 text-[13px]">{sub.what_are_you_working_on}</p>
                        </td>
                        <td className="p-4 text-slate-500">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" /> {formatDate(sub.created_at)}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <select
                            value={sub.status || "new"}
                            onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                            className="bg-[#F5F5F0] border border-[#0A1628]/10 px-3 py-1.5 font-semibold text-xs text-[#0A1628] focus:border-[#C9A84C] focus:outline-none"
                            data-testid={`submission-status-select-${sub._id}`}
                          >
                            <option value="new">🆕 New Brief</option>
                            <option value="in-progress">⚡ In Review</option>
                            <option value="completed">✅ Resolved</option>
                            <option value="archived">📁 Archived</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteSubmission(sub._id)}
                            className="text-red-500 hover:text-white hover:bg-red-600 border border-transparent hover:border-red-600 px-3 py-2 transition-all duration-200"
                            data-testid="delete-submission-btn"
                            title="Delete submission"
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
          )}

          {/* Tab Contents: Waitlist */}
          {activeTab === "waitlist" && (
            <div className="bg-[#FFFFFF] border border-[#0A1628]/10 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs" data-testid="waitlist-table">
                <thead>
                  <tr className="bg-[#0A1628] text-white font-montserrat uppercase tracking-wider font-bold">
                    <th className="p-4">Subscriber Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Origin Hub Source</th>
                    <th className="p-4">Registered At</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1628]/10 text-[#0A1628]">
                  {waitlist.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-[#0A1628]/40 italic">
                        No waitlist signups found in database.
                      </td>
                    </tr>
                  ) : (
                    waitlist.map((wl) => (
                      <tr key={wl._id} className="hover:bg-[#F5F5F0]/30 transition-colors">
                        <td className="p-4 font-bold text-sm">
                          {wl.name || <span className="text-[#0A1628]/40 italic">— (Anonymous)</span>}
                        </td>
                        <td className="p-4">
                          <div className="text-[#0A1628] flex items-center gap-1.5 font-bold">
                            <Mail className="w-3.5 h-3.5 text-[#C9A84C]" /> {wl.email}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block bg-[#0A1628]/5 border border-[#0A1628]/10 text-[#0A1628] text-[10px] font-extrabold tracking-widest uppercase px-3 py-1">
                            {wl.source === "financial-clarity-tool" ? "📊 Clarity Tool" : wl.source === "podcast" ? "🎙️ Podcast" : "✍️ The Blog"}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" /> {formatDate(wl.created_at)}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteWaitlist(wl._id)}
                            className="text-red-500 hover:text-white hover:bg-red-600 border border-transparent hover:border-red-600 px-3 py-2 transition-all duration-200"
                            data-testid="delete-waitlist-btn"
                            title="Delete waitlist entry"
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
          )}

        </div>
      </main>
    </div>
  );
}
