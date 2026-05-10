import React from "react";
import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    /* 1. hover:-translate-y-1: Hover karne par card thoda upar uthega (Desktop par acha lagta hai).
       2. active:scale-[0.98]: Mobile par click karte waqt thoda dabega (Native app feel).
    */
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
      <div className="card-body p-4 sm:p-5">
        
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar size responsive: Mobile par size-12, Tablet+ par size-14 */}
          <div className="avatar size-12 sm:size-14 rounded-full overflow-hidden border-2 border-primary/10">
            <img 
              src={friend.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.fullName}`} 
              alt={friend.fullName} 
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
             {/* text-base sm:text-lg: Mobile par standard, desktop par thoda bada */}
            <h3 className="font-bold text-base sm:text-lg truncate text-base-content">
              {friend.fullName}
            </h3>
            <p className="text-[10px] sm:text-xs opacity-60">Language Partner</p>
          </div>
        </div>

        {/* LANGUAGES SECTION - flex-wrap zaroori hai responsive ke liye */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="badge badge-secondary badge-sm sm:badge-md py-3 px-3 text-[10px] sm:text-xs font-medium">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="ml-1 uppercase">Native: {friend.nativeLanguage}</span>
          </span>
          <span className="badge badge-outline badge-sm sm:badge-md py-3 px-3 text-[10px] sm:text-xs font-medium border-base-content/20">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="ml-1 uppercase">Learning: {friend.learningLanguage}</span>
          </span>
        </div>

        {/* ACTION BUTTON - btn-sm sm:btn-md logic */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary btn-sm sm:btn-md w-full shadow-md hover:shadow-primary/20 transition-all"
        >
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`}
        alt={`${langLower} flag`}
        className="h-3 w-4 sm:h-3.5 sm:w-5 object-contain inline-block rounded-[1px]"
      />
    );
  }
  return "🌍"; 
}