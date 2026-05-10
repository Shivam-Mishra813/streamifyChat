import React from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, User } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    /* lg:flex: Sirf bade screens par flexbox banega.
       w-64: Fixed width for desktop.
       border-r: Right side border for separation.
    */
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 z-40">
      
      {/* BRAND LOGO SECTION */}
      <div className="p-6 border-b border-base-300">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <ShipWheelIcon className="size-8 text-primary shrink-0" />
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-tighter">
            Streamify
          </span>
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="text-[10px] uppercase font-bold text-base-content/40 px-3 mb-2 tracking-widest">Menu</p>
        
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 normal-case transition-all ${
            currentPath === "/" ? "btn-active bg-primary/10 text-primary" : "hover:bg-base-300"
          }`}
        >
          <HomeIcon className="size-5 shrink-0" />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 normal-case transition-all ${
            currentPath === "/friends" ? "btn-active bg-primary/10 text-primary" : "hover:bg-base-300"
          }`}
        >
          <UsersIcon className="size-5 shrink-0" />
          <span className="font-medium">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 normal-case transition-all ${
            currentPath === "/notifications" ? "btn-active bg-primary/10 text-primary" : "hover:bg-base-300"
          }`}
        >
          <BellIcon className="size-5 shrink-0" />
          <span className="font-medium">Notifications</span>
        </Link>

        <Link
          to="/profile"
          className={`btn btn-ghost justify-start w-full gap-4 px-4 normal-case transition-all ${
            currentPath === "/profile" ? "btn-active bg-primary/10 text-primary" : "hover:bg-base-300"
          }`}
        >
          <User className="size-5 shrink-0" />
          <span className="font-medium">My Profile</span>
        </Link>
      </nav>

      {/* USER PROFILE FOOTER SECTION */}
      <Link 
        to="/profile" 
        className="p-4 border-t border-base-300 mt-auto hover:bg-base-300 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1 group-hover:ring-primary/50 transition-all">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate text-base-content">{authUser?.fullName}</p>
            <p className="text-[10px] text-success flex items-center gap-1 font-medium">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              Active Now
            </p>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;