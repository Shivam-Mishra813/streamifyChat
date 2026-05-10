import React from "react";
import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    /* 1. py-12 sm:py-20: Mobile par thoda kam vertical space, desktop par zyada.
      2. border-2 border-dashed: Ek empty state wali professional feel deta hai.
    */
    <div className="card bg-base-200/50 border-2 border-dashed border-base-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center transition-all">
      
      {/* Visual Element: Mobile par chhota, desktop par bada */}
      <div className="bg-base-300 p-4 rounded-full mb-4 animate-bounce-slow">
        <UsersIcon className="size-8 sm:size-12 text-base-content opacity-20" />
      </div>

      {/* Text sizing responsive */}
      <h3 className="font-bold text-xl sm:text-2xl mb-2 text-base-content">
        No friends yet
      </h3>
      
      <p className="text-base-content/60 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
        Connect with language partners below to start practicing together! 
        Your journey to fluency starts with a single "Hello".
      </p>

      {/* Optional: Mobile par user ko scroll karne ke liye hint */}
      <div className="mt-6 flex flex-col items-center gap-2 lg:hidden">
        <span className="text-[10px] uppercase tracking-widest opacity-40">Explore below</span>
        <div className="w-px h-8 bg-linear-to-b from-primary to-transparent"></div>
      </div>
    </div>
  );
};

export default NoFriendsFound;