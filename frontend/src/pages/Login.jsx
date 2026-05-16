import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Added Link for better routing

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error before trying
    try {
      const res = await api.post("/users/login", form);
      login(res.data.user);
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-slate-50/50 px-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 mt-2">
            Please enter your details to sign in to your account.
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

            <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
        
        {/* Footer info (optional) */}
        <p className="text-center mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} NodeRevision. All rights reserved.
        </p>
      </div>
    </div>
  );
}