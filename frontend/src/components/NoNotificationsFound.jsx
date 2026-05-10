import { BellIcon } from "lucide-react";
import React from "react";

function NoNotificationsFound() {
  return (
    /* 1. min-h-[40vh]: Isse ye thoda center me dikhega.
       2. px-6: Mobile par text kinaro se chipke na isliye padding.
    */
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-6 text-center w-full">
      
      {/* Icon Container: Responsive sizing size-16 to size-20 */}
      <div className="size-16 sm:size-20 rounded-full bg-base-200 flex items-center justify-center mb-6 shadow-inner">
        <BellIcon className="size-8 sm:size-10 text-base-content opacity-30" />
      </div>

      {/* Heading: text-lg to text-xl */}
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-base-content">
        No notifications yet
      </h3>

      {/* Paragraph: Mobile par small text, desktop par base text */}
      <p className="text-base-content/60 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
        When you receive friend requests or messages, they'll appear here. 
        Stay tuned for new connections!
      </p>

    </div>
  );
}

export default NoNotificationsFound;