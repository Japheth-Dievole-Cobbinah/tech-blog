import React, { useRef } from "react";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) setInput(query);
  };

  const handleClear = () => {
    setInput("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <header className="relative mx-8 sm:mx-16 xl:mx-24">
      {/* Top Highlight Banner */}
      <div className="text-center mt-28 mb-8">
        <div
          className="inline-flex items-center justify-center gap-3 px-5 py-1.5 mb-4 
          border border-primary/40 bg-primary/10 rounded-full text-sm text-primary font-medium"
        >
          <p>✨ New: AI Feature Integrated</p>
          <img src={assets.star_icon} className="w-3" alt="star icon" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-[1.15] text-gray-800">
          Your own <span className="text-primary">blogging</span>
          <br className="hidden sm:block" /> platform.
        </h1>

        {/* Subtext */}
        <p className="my-6 sm:my-8 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
          This is your space to think out loud, share what matters, and write without filters.
          Whether it’s one word or a thousand, your voice finds a home here.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-between items-center max-w-lg mx-auto 
          border border-gray-300 bg-white rounded-full overflow-hidden shadow-sm 
          focus-within:ring-2 focus-within:ring-primary/40 transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            defaultValue={input}
            className="flex-1 pl-5 pr-3 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-full m-1.5 hover:bg-primary/90 hover:scale-105 
            transition-transform duration-200 text-sm sm:text-base font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Clear Button */}
      {input && (
        <div className="text-center">
          <button
            onClick={handleClear}
            className="mt-3 border border-gray-200 bg-white hover:bg-gray-100 
            text-gray-600 text-xs sm:text-sm py-1 px-3 rounded shadow-sm transition-all"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Background Gradient */}
      <img
        src={assets.gradientBackground}
        alt="decorative gradient background"
        className="absolute -top-40 left-0 w-full -z-10 opacity-50 pointer-events-none select-none"
      />
    </header>
  );
};

export default Header;
