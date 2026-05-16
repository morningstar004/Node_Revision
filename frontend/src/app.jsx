import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar.jsx";
import Posts from "./pages/Posts.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <BrowserRouter>
        {/* The Navbar is sticky, so we place it here */}
        <NavBar />
        
        {/* Main Content Area */}
        <main className="relative">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/posts"
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Default redirect for unknown paths */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}