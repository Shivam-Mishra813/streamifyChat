// import React from 'react';
// import useAuthUser from '../hooks/useAuthUser';
// import { Mail, MapPin, User, Edit2 } from 'lucide-react';

// // Language ke hisaab se flag lagane wala function
// const getFlag = (language) => {
//   const lang = language?.toLowerCase();
//   if (lang === "english") return "🇬🇧";
//   if (lang === "spanish") return "🇪🇸";
//   if (lang === "hindi") return "🇮🇳";
//   if (lang === "french") return "🇫🇷";
//   if (lang === "german") return "🇩🇪";
//   return "🌍";
// };

// const ProfilePage = () => {
//   // Hook se current user ka data nikal liya
//   const { authUser } = useAuthUser();

//   if (!authUser) return null;

//   return (
//     <div className="p-4 md:p-8 w-full max-w-4xl mx-auto h-full overflow-y-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-white">My Profile</h1>
//         {/* Future ke liye Edit button */}
//         <button className="btn btn-outline btn-sm sm:btn-md gap-2">
//           <Edit2 className="size-4" />
//           Edit Profile
//         </button>
//       </div>

//       <div className="bg-[#18191c] rounded-2xl p-6 md:p-10 border border-gray-800 shadow-xl">
//         <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
//           {/* Profile Photo Section */}
//           <div className="flex flex-col items-center gap-4">
//             <div className="avatar">
//               <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                 <img 
//                   src={authUser.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.fullName}`} 
//                   alt={authUser.fullName} 
//                 />
//               </div>
//             </div>
//             <span className="badge badge-success gap-2 p-3">
//               <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
//               Online
//             </span>
//           </div>

//           {/* User Details Section */}
//           <div className="flex-1 space-y-6 w-full">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">{authUser.fullName}</h2>
//               {authUser.bio && <p className="text-gray-400 text-sm">{authUser.bio}</p>}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Email */}
//               <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 p-3 rounded-lg">
//                 <Mail className="size-5 text-primary" />
//                 <span>{authUser.email || "Email not provided"}</span>
//               </div>
              
//               {/* Location */}
//               <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 p-3 rounded-lg">
//                 <MapPin className="size-5 text-primary" />
//                 <span>{authUser.location || "Location not provided"}</span>
//               </div>
//             </div>

//             {/* Languages Display */}
//             <div className="mt-6 border-t border-gray-800 pt-6">
//               <h3 className="text-lg font-semibold text-white mb-4">Language Preferences</h3>
//               <div className="flex flex-wrap gap-4">
//                 <div className="bg-pink-600/20 border border-pink-600 text-pink-500 font-medium px-5 py-3 rounded-xl flex items-center gap-3">
//                   <span className="text-2xl">{getFlag(authUser.nativeLanguage)}</span>
//                   <div className="flex flex-col">
//                     <span className="text-xs opacity-70">Native Language</span>
//                     <span className="text-white">{authUser.nativeLanguage || "N/A"}</span>
//                   </div>
//                 </div>
                
//                 <div className="bg-blue-600/20 border border-blue-600 text-blue-500 font-medium px-5 py-3 rounded-xl flex items-center gap-3">
//                   <span className="text-2xl">{getFlag(authUser.learningLanguage)}</span>
//                   <div className="flex flex-col">
//                     <span className="text-xs opacity-70">Learning Language</span>
//                     <span className="text-white">{authUser.learningLanguage || "N/A"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
  });

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:5001/api/users/update-profile", formData, {
        withCredentials: true
      });
      toast.success("Profile Updated!");
      setIsEditing(false);
      window.location.reload(); // Data refresh karne ke liye
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  if (!authUser) return null;

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">My Profile</h1>
        
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`btn btn-sm gap-2 ${isEditing ? "btn-error" : "btn-outline"}`}
        >
          {isEditing ? <X className="size-4" /> : <Edit2 className="size-4" />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-[#18191c] rounded-2xl p-6 md:p-10 border border-gray-800 shadow-xl">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Profile Pic */}
          <div className="avatar flex flex-col items-center gap-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-2">
              <img src={authUser.profilePic} alt="profile" />
            </div>
            <div className="badge badge-success gap-2">Online</div>
          </div>

          {/* Details Section */}
          <div className="flex-1 w-full space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <input 
                  className="input input-bordered w-full bg-gray-900 text-white" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Full Name"
                />
                <textarea 
                  className="textarea textarea-bordered w-full bg-gray-900 text-white" 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Bio (e.g. BB)"
                />
                <input 
                  className="input input-bordered w-full bg-gray-900 text-white" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Location"
                />
                <button onClick={handleSave} className="btn btn-primary w-full gap-2">
                  <Save className="size-4" /> Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-white">{authUser.fullName}</h2>
                  <p className="text-gray-400 mt-1">{authUser.bio || "No bio added"}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-800/40 p-4 rounded-xl border border-gray-700">
                    <Mail className="size-5 text-primary" />
                    <span className="text-gray-200">{authUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800/40 p-4 rounded-xl border border-gray-700">
                    <MapPin className="size-5 text-primary" />
                    <span className="text-gray-200">{authUser.location || "Location"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;