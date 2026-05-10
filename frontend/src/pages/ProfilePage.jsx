import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';

// Language flag helper (Purane code se wapas laya)
const getFlag = (language) => {
  const lang = language?.toLowerCase();
  if (lang === "english") return "🇬🇧";
  if (lang === "spanish") return "🇪🇸";
  if (lang === "hindi") return "🇮🇳";
  if (lang === "french") return "🇫🇷";
  if (lang === "german") return "🇩🇪";
  return "🌍";
};

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
      toast.success("Profile Updated Successfully!");
      setIsEditing(false);
      window.location.reload(); // Data refresh karne ke liye
    } catch (error) {
      toast.error("Update failed! Please try again.");
    }
  };

  if (!authUser) return null;

  return (
    /* 1. pb-safe & pb-20: Mobile bottom nav ke peeche chhupne se rokne ke liye 
       2. max-w-4xl: Desktop par proper sizing
    */
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto pb-safe pb-20 lg:pb-8">
      
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-base-300 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">My Profile</h1>
        
        {/* Toggle Edit Button */}
        <button 
          onClick={() => {
            setIsEditing(!isEditing);
            // Agar cancel kiya toh form reset kar do
            if(isEditing) {
              setFormData({
                fullName: authUser?.fullName || "",
                bio: authUser?.bio || "",
                location: authUser?.location || "",
              });
            }
          }}
          className={`btn btn-sm sm:btn-md gap-2 transition-all active:scale-95 ${isEditing ? "btn-error text-white" : "btn-outline"}`}
        >
          {isEditing ? <X className="size-4" /> : <Edit2 className="size-4" />}
          <span className="hidden sm:inline">{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-base-200/50 rounded-2xl p-5 sm:p-8 md:p-10 border border-base-300 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
          
          {/* PROFILE PIC SECTION */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 shrink-0">
            <div className="avatar">
              <div className="w-24 sm:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={authUser.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.fullName}`} 
                  alt="profile" 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="badge badge-success gap-2 shadow-sm font-medium p-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Online
            </div>
          </div>

          {/* DETAILS & EDIT SECTION */}
          <div className="flex-1 w-full space-y-6">
            
            {/* EDIT MODE (FORM) */}
            {isEditing ? (
              <div className="space-y-4 bg-base-100 p-4 sm:p-6 rounded-xl border border-base-300 shadow-sm">
                
                <div className="form-control">
                  <label className="label px-1"><span className="label-text text-xs font-bold uppercase tracking-wider opacity-60">Full Name</span></label>
                  <input 
                    className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="E.g. John Doe"
                  />
                </div>

                <div className="form-control">
                  <label className="label px-1"><span className="label-text text-xs font-bold uppercase tracking-wider opacity-60">Bio</span></label>
                  <textarea 
                    className="textarea textarea-bordered w-full resize-none h-24 focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-control">
                  <label className="label px-1"><span className="label-text text-xs font-bold uppercase tracking-wider opacity-60">Location</span></label>
                  <input 
                    className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, Country"
                  />
                </div>

                <button onClick={handleSave} className="btn btn-primary w-full gap-2 mt-2 shadow-md active:scale-[0.98]">
                  <Save className="size-4" /> Save Changes
                </button>
              </div>
            ) : (
              
              /* READ-ONLY MODE (DISPLAY) */
              <div className="space-y-6 sm:space-y-8 w-full text-center md:text-left">
                
                {/* Name & Bio */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-base-content wrap-break-word">{authUser.fullName}</h2>
                  <p className="text-base-content/70 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {authUser.bio || <span className="italic opacity-50">No bio added. Click edit to add one.</span>}
                  </p>
                </div>

                {/* Contact & Location Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-base-100 p-3 sm:p-4 rounded-xl border border-base-300 shadow-sm overflow-hidden">
                    <Mail className="size-5 text-primary shrink-0" />
                    <span className="text-base-content font-medium truncate">{authUser.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-base-100 p-3 sm:p-4 rounded-xl border border-base-300 shadow-sm overflow-hidden">
                    <MapPin className="size-5 text-primary shrink-0" />
                    <span className="text-base-content font-medium truncate">{authUser.location || "Location not set"}</span>
                  </div>
                </div>

                {/* Languages Section (Restored) */}
                <div className="pt-6 border-t border-base-300">
                  <h3 className="text-sm font-bold text-base-content/60 uppercase tracking-widest mb-4">Language Preferences</h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    
                    {/* Native Language */}
                    <div className="flex-1 bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center gap-4">
                      <span className="text-3xl drop-shadow-sm">{getFlag(authUser.nativeLanguage)}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Native Language</span>
                        <span className="text-base-content font-semibold truncate capitalize">{authUser.nativeLanguage || "N/A"}</span>
                      </div>
                    </div>
                    
                    {/* Learning Language */}
                    <div className="flex-1 bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
                      <span className="text-3xl drop-shadow-sm">{getFlag(authUser.learningLanguage)}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Learning Language</span>
                        <span className="text-base-content font-semibold truncate capitalize">{authUser.learningLanguage || "N/A"}</span>
                      </div>
                    </div>

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