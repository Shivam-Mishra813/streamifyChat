import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
// 🚨 FIX: CameraIcon import missing tha, maine add kar diya hai
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    /* 1. min-h-[100dvh]: Mobile par address bar fix
       2. sm:bg-base-200: Desktop par background dark/gray rahega, form white card me. 
    */
    <div className="min-h-dvh bg-base-100 sm:bg-base-200 flex items-center justify-center p-0 sm:p-4">
      
      {/* Mobile par full screen, Desktop par rounded card */}
      <div className="w-full max-w-3xl bg-base-100 sm:rounded-2xl sm:shadow-2xl sm:border border-base-300 min-h-dvh sm:min-h-0 flex flex-col justify-center">
        <div className="p-6 sm:p-10 md:p-12">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Complete Your Profile</h1>
            <p className="text-sm sm:text-base text-base-content/60 mt-2">Let's get you set up to meet new language partners.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              
              {/* IMAGE PREVIEW: size-24 mobile ke liye, size-32 desktop ke liye */}
              <div className="size-24 sm:size-32 rounded-full bg-base-200/50 overflow-hidden ring-4 ring-primary/10 relative group">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-8 sm:size-12 text-base-content opacity-30" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <button 
                type="button" 
                onClick={handleRandomAvatar} 
                className="btn btn-outline btn-primary btn-sm sm:btn-md rounded-full active:scale-95 transition-transform"
              >
                <ShuffleIcon className="size-4" />
                Generate Random Avatar
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* FULL NAME */}
              <div className="form-control">
                <label className="label px-1">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label px-1">
                  <span className="label-text font-medium">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="textarea textarea-bordered h-24 sm:h-28 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell others about yourself and your language learning goals (e.g. I want to learn Spanish for my trip!)"
                />
              </div>

              {/* LANGUAGES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* NATIVE LANGUAGE */}
                <div className="form-control">
                  <label className="label px-1">
                    <span className="label-text font-medium">Native Language</span>
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="select select-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  >
                    <option value="" disabled>Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="form-control">
                  <label className="label px-1">
                    <span className="label-text font-medium">Learning Language</span>
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="select select-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  >
                    <option value="" disabled>Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control">
                <label className="label px-1">
                  <span className="label-text font-medium">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-4 size-5 text-base-content/50" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="input input-bordered w-full pl-11 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button 
                className="btn btn-primary w-full shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]" 
                disabled={isPending} 
                type="submit"
              >
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 mr-2" />
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    Saving Profile...
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;