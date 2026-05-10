import { VideoIcon } from "lucide-react";
import React from "react";

function CallButton({ handleVideoCall }) {
  return (
    /* 1. absolute top-0 right-0: Taaki ye header ke upar float kare.
      2. pr-4 sm:pr-6: Mobile par kam padding, tablet/desktop par zyada.
      3. z-20: Taaki ye baaki elements ke upar dikhe.
    */
    <div className="absolute top-0 right-0 p-2 sm:p-3 flex items-center justify-end z-20 pointer-events-none">
      <button 
        onClick={handleVideoCall} 
        /* btn-sm sm:btn-md: Mobile par chota button, bade screens par medium.
          pointer-events-auto: Taaki sirf button click ho sake, background nahi.
        */
        className="btn btn-success btn-sm sm:btn-md text-white shadow-lg pointer-events-auto transition-all active:scale-95"
      >
        <VideoIcon className="size-5 sm:size-6" />
        {/* Mobile par sirf icon dikhega, tablet se "Video Call" text bhi dikhega */}
        <span className="hidden sm:inline ml-2">Video Call</span>
      </button>
    </div>
  );
}

export default CallButton;