import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Guard clause in case user data hasn't loaded yet
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", { email: user.email });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      // Still logout locally if API fails
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-slate-50/50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          {/* Decorative Header Background */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-violet-600"></div>

          <div className="px-8 pb-10">
            {/* Avatar - Positioned to overlap the header */}
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-slate-50">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* User Info Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-slate-900">{user.username}</h2>
              <p className="text-slate-500 text-sm font-medium">Verified Account</p>
            </div>

            {/* Details List */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                  <p className="text-slate-700 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Member Since</p>
                  <p className="text-slate-700 font-medium">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl font-bold hover:bg-rose-600 hover:text-white transition-all duration-300 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout from Account
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <button className="text-slate-400 text-sm font-medium hover:text-indigo-600 transition-colors">
                Need help with your account?
            </button>
        </div>
      </div>
    </div>
  );
}