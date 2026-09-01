import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/authContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="w-full h-16 px-6 bg-green-500 shadow-md">
      <div className="h-full flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          Todo Manager
        </Link>
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white px-4 py-2
                         rounded-lg text-blue-700 font-semibold
                         hover:bg-blue-50 transition"
            >
              <User size={18} />
              <span>{user.name}</span>
              <ChevronDown
                size={17}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white
                              rounded-lg shadow-lg border border-blue-100
                              overflow-hidden z-50"
              >
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-blue-700
                             hover:bg-blue-50 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3
                             text-green-600 hover:bg-green-50 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
