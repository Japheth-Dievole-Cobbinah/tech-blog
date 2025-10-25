import React, { useRef } from "react";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef(null);

  // 🔍 Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (!query) return;
    setInput(query);
  };

  // ❌ Clear search input
  const handleClear = () => {
    setInput("");
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  };

  return (
    <header className="relative mx-8 sm:mx-16 xl:mx-24 overflow-hidden">
      {/* --- Top Highlight Banner --- */}
      <div className="text-center mt-28 mb-10">
        <div
          className="inline-flex items-center justify-center gap-2 px-5 py-1.5 mb-5
          border border-primary/30 bg-primary/10 rounded-full text-sm text-primary font-medium
          backdrop-blur-sm hover:bg-primary/20 transition-colors duration-200"
        >
          <p>✨ New: AI Feature Integrated</p>
          <img
            src={assets.star_icon}
            className="w-3 animate-spin-slow"
            alt="star icon"
          />
        </div>

        {/* --- Main Heading --- */}
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-tight text-gray-800">
          Your own <span className="text-primary">blogging</span>
          <br className="hidden sm:block" /> platform.
        </h1>

        {/* --- Subtext --- */}
        <p className="my-6 sm:my-8 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base leading-relaxed">
          This is your space to think out loud, share what matters, and write without filters.
          Whether it’s one word or a thousand, your voice finds a home here.
        </p>

        {/* --- Search Form --- */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center max-w-lg mx-auto border border-gray-300 bg-white
          rounded-full overflow-hidden shadow-sm transition-all
          focus-within:ring-2 focus-within:ring-primary/40"
        >
          <label htmlFor="search" className="sr-only">
            Search blogs
          </label>
          <input
            id="search"
            ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            defaultValue={input}
            className="flex-1 pl-5 pr-3 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-400 outline-none"
            aria-label="Search for blogs"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-full m-1.5 hover:bg-primary/90 hover:scale-[1.03]
            transition-transform duration-200 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Search
          </button>
        </form>
      </div>

      {/* --- Clear Button --- */}
      {input && (
        <div className="text-center">
          <button
            onClick={handleClear}
            className="mt-3 border border-gray-200 bg-white hover:bg-gray-100 
            text-gray-600 text-xs sm:text-sm py-1.5 px-4 rounded-md shadow-sm transition-all
            focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* --- Background Gradient --- */}
      <img
        src={assets.gradientBackground}
        alt=""
        aria-hidden="true"
        className="absolute -top-40 left-0 w-full -z-10 opacity-50 pointer-events-none select-none"
      />
    </header>
  );
};

export default Header;
