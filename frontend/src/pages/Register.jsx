import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-slate-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an account
          </h2>
          <p className="text-slate-500 mt-2">
            Join NodeRevision to start organizing your posts.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                placeholder="johndoe"
                type="text"
                required
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                placeholder="name@company.com"
                type="email"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                placeholder="••••••••"
                type="password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] mt-2">
              Get Started
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-xs text-slate-400">
          By registering, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
        </p>
      </div>
    </div>
  );
}