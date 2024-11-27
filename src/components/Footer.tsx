import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-[#0f0f0f] text-white py-6">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; {new Date().getFullYear()} Stockio. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="/" className="hover:text-indigo-400">
          Home
        </a>
        <a href="/#features" className="hover:text-indigo-400">
          Featured
        </a>
        <a href="/search" className="hover:text-indigo-400">
          Search
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
