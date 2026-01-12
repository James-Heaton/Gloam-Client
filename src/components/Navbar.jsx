import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-50 bg-black py-4 shadow-xl/60 w-full">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center relative">
        {/* App Name */}
        <div
          className="font-washington text-4xl text-stone-300">
          Gloam
        </div>

        {/* Burger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden bg-transparent border-none text-stone-300 text-3xl cursor-pointer hover:text-red-900 transition-colors duration-400"
        >
          ☰
        </button>

        {/* Nav Links */}
        <div
          className={`
            flex gap-8 items-center
            max-lg:absolute max-lg:top-full max-lg:right-0 
            max-lg:bg-black max-lg:flex-col max-lg:p-4 
            max-lg:shadow-xl/60 max-lg:min-w-[120px] max-lg:gap-4
            ${isOpen ? "max-lg:flex" : "max-lg:hidden"}
          `}
        >
          <Link
            to="/game"
            className="font-washington text-stone-300 hover:text-red-800 no-underline text-2xl transition-colors duration-400 max-lg:w-full max-lg:text-right"
            onClick={() => setIsOpen(false)}
          >
            Start Game
          </Link>
          <Link
            to="/characters"
            className="font-washington text-stone-300 hover:text-red-800 no-underline text-2xl transition-colors duration-400 max-lg:w-full max-lg:text-right"
            onClick={() => setIsOpen(false)}
          >
            Characters
          </Link>
          <Link
            to="/rules"
            className="font-washington text-stone-300 hover:text-red-800 no-underline text-2xl transition-colors duration-400 max-lg:w-full max-lg:text-right"
            onClick={() => setIsOpen(false)}
          >
            Rules
          </Link>
          <Link
            to="/about"
            className="font-washington text-stone-300 hover:text-red-800 no-underline text-2xl transition-colors duration-400 max-lg:w-full max-lg:text-right"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {/* <button
            onClick={handleLogout}
            className="font-washington bg-stone-700 hover:bg-red-800 text-stone-100 border-none py-2 px-4 rounded cursor-pointer text-xl transition-all duration-400 max-lg:w-full max-lg:text-center shadow-md hover:shadow-red-900/50"
          >
            Sign Out
          </button> */}
                    <button
            onClick={handleLogout}
            className="font-washington text-stone-300 hover:text-red-800 no-underline text-2xl transition-colors duration-400 max-lg:w-full max-lg:text-right"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};
