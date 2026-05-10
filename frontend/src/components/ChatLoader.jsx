import { LoaderIcon } from "lucide-react";
import React from "react";

function ChatLoader() {
  return (
    /* 1. min-h-[100dvh]: Mobile browsers (Chrome/Safari) ke address bar issue ko solve karta hai.
      2. bg-base-100: App ke theme ke saath match karne ke liye.
    */
    <div className="min-h-dvh w-full flex flex-col items-center justify-center p-6 bg-base-100">
      
      {/* Icon size: Mobile par 10, tablet/desktop par 12 (size-12) */}
      <LoaderIcon className="animate-spin size-10 md:size-12 text-primary" />
      
      {/* Text size: Mobile par 'text-base', desktop par 'text-lg'.
        max-w-xs: Mobile par text bahut lamba na dikhe isliye width limit ki hai.
      */
      }
      <p className="mt-4 text-center text-base md:text-lg font-mono text-base-content/80 max-w-xs animate-pulse">
        Connecting to chat...
      </p>

    </div>
  );
}

export default ChatLoader;