import React from "react";
import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  
  return (
    /* 1. min-h-[100dvh]: Yeh mobile par address bar (URL bar) ke upar-neeche hone se layout ko hilne nahi deta.
       2. w-full: Taaki width poori screen cover kare.
       3. bg-base-100: Theme ke hisaab se background color auto-adjust hoga.
    */
    <div 
      className="min-h-dvh w-full flex items-center justify-center bg-base-100 transition-colors duration-300" 
      data-theme={theme}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Responsive Size: Mobile par 10, bade screens par size-12 */}
        <LoaderIcon className="animate-spin size-10 md:size-12 text-primary" />
        
        {/* Ek optional subtle text jo user ko bataye ki page load ho raha hai */}
        <span className="text-xs font-medium tracking-widest uppercase opacity-40 animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
};

export default PageLoader;