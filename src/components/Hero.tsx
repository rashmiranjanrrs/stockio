import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/assets/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 text-white px-6">
        <h1 className="text-5xl font-bold mb-4">
          Access Financial Data Seamlessly
        </h1>
        <p className="text-xl mb-8">
          Real-time and historical data at your fingertips.
        </p>
        <a
          href="#search"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
