import React from "react";
import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    /* 1. dropdown-end: Taaki menu left side khule aur screen se bahar na jaye.
       2. dropdown-bottom: Mobile par safe placement ke liye.
    */
    <div className="dropdown dropdown-end dropdown-bottom">

      {/* DROPDOWN TRIGGER */}
      <button 
        tabIndex={0} 
        className="btn btn-ghost btn-circle btn-sm sm:btn-md"
        title="Change Theme"
      >
        <PaletteIcon className="size-5 sm:size-6" />
      </button>

      {/* DROPDOWN CONTENT */}
      <div
        tabIndex={0}
        /* 1. w-48 sm:w-56: Mobile par thoda chota, desktop par standard.
           2. right-0: Ensure karta hai ki alignment button ke saath rahe.
           3. z-[100]: Taaki ye kisi bhi navigation ya header ke upar dikhe.
        */
        className="dropdown-content mt-3 p-2 shadow-2xl bg-base-200/95 backdrop-blur-md rounded-2xl
        w-52 sm:w-60 border border-base-content/10 max-h-[60vh] overflow-y-auto z-100"
      >
        <div className="px-2 py-1 mb-1">
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Select Theme</p>
        </div>

        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
                w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl flex items-center gap-3 transition-all
                ${
                  theme === themeOption.name
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                    : "hover:bg-base-content/10 active:scale-95"
                }
              `}
              onClick={() => {
                setTheme(themeOption.name);
                // Tip: Mobile par tap karne ke baad dropdown band karne ke liye blur use kar sakte hain
                document.activeElement.blur();
              }}
            >
              <PaletteIcon className={`size-4 ${theme === themeOption.name ? "text-primary-content" : "text-primary"}`} />
              <span className="text-xs sm:text-sm font-semibold">{themeOption.label}</span>

              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className={`size-2 sm:size-2.5 rounded-full border border-black/10`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;