import React from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* LOGO - Desktop par hamesha, Mobile par sirf Chat page par ya as per logic */}
          <div className={`${isChatPage ? "flex" : "hidden lg:flex"} items-center`}>
            <Link to="/" className="flex items-center gap-2">
              <ShipWheelIcon className="size-7 sm:size-9 text-primary" />
              <span className="text-xl sm:text-2xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-1 sm:gap-4 ml-auto">
            
            {/* NOTIFICATIONS: Mobile par chhota button ya hide (agar bottom nav mein hai) */}
            <Link to={"/notifications"} className="sm:block">
              <button className="btn btn-ghost btn-circle btn-sm sm:btn-md">
                <BellIcon className="size-5 sm:size-6 text-base-content opacity-70" />
              </button>
            </Link>

            {/* THEME SELECTOR: Hamesha dikhega kyuki ye zaroori hai */}
            <ThemeSelector />

            {/* PROFILE AVATAR: Mobile par thoda chhota */}
            <Link to="/profile" className="avatar hover:opacity-80 transition-opacity">
              <div className="w-8 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <img 
                  src={authUser?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser?.fullName}`} 
                  alt="User Avatar" 
                />
              </div>
            </Link>

            {/* LOGOUT: Mobile par icon chhota rakha hai */}
            <button 
              className="btn btn-ghost btn-circle btn-sm sm:btn-md text-error" 
              onClick={logoutMutation}
              title="Logout"
            >
              <LogOutIcon className="size-5 sm:size-6 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;