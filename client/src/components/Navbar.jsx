import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = { name: "Swagat" };

  const logoutUser = () => {
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">

        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}</p>
          <button onClick={logoutUser}
            className="bg-white hover:bg-slate-100 border border-gray-300 px-5 py-1.5 rounded-full active:scale-95 transition-all">
            Logout</button>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
