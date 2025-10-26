import assets from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <nav className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="QuickBlog logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* Login / Dashboard button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-primary/90 text-white px-10 py-2.5 transition-all"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="arrow icon" className="w-3" />
      </button>
    </nav>
  );
};

export default Navbar;
