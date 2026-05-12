import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">Node Revision</span>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/posts" className="hover:underline">
              Posts
            </Link>
            <Link to="/profile" className="hover:underline">
              {user.username}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
