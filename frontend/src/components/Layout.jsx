import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router";
import { HomeIcon, UsersIcon, BellIcon, User } from "lucide-react";

const Layout = ({ children, showSidebar = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex flex-1">
        {/* SIDEBAR: Desktop par dikhega (lg:flex), mobile par hidden rahega */}
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          {/* NAVBAR: Isko sticky bana diya hai taaki scroll karne par upar hi rahe */}
          <div className="sticky top-0 z-30 w-full">
            <Navbar />
          </div>

          {/* MAIN CONTENT: 
              pb-20 sm:pb-0: Mobile par niche space chhodi hai taaki Bottom Nav content ko na chhupaye.
          */}
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION: 
          Sirf mobile screens par dikhega (lg:hidden). 
          Yeh real app wali feel deta hai.
      */}
      {showSidebar && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 flex justify-around items-center p-2 pb-safe z-50">
          <Link to="/" className={`flex flex-col items-center p-2 gap-1 ${currentPath === "/" ? "text-primary" : "opacity-70"}`}>
            <HomeIcon className="size-6" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          
          <Link to="/friends" className={`flex flex-col items-center p-2 gap-1 ${currentPath === "/friends" ? "text-primary" : "opacity-70"}`}>
            <UsersIcon className="size-6" />
            <span className="text-[10px] font-medium">Friends</span>
          </Link>
          
          <Link to="/notifications" className={`flex flex-col items-center p-2 gap-1 ${currentPath === "/notifications" ? "text-primary" : "opacity-70"}`}>
            <BellIcon className="size-6" />
            <span className="text-[10px] font-medium">Alerts</span>
          </Link>
          
          <Link to="/profile" className={`flex flex-col items-center p-2 gap-1 ${currentPath === "/profile" ? "text-primary" : "opacity-70"}`}>
            <User className="size-6" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Layout;