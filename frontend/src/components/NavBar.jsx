import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-extrabold tracking-tight text-slate-900 hover:opacity-80 transition-opacity"
        >
          Node<span className="text-indigo-600">Revision</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <Link 
                to="/posts" 
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Posts
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px]">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                {user.username}
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}