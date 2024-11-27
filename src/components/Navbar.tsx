import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-black shadow fixed w-full z-30 top-0 left-0 h-16">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          STOCKIO
        </NavLink>
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-bold"
                : "text-white hover:text-indigo-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-bold"
                : "text-white hover:text-indigo-600"
            }
          >
            Search
          </NavLink>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-white focus:outline-none md:hidden"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            className="fixed top-16 left-0 w-full z-30 bg-[#272727]"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/search"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </NavLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
