import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    /* 1. min-h-[100dvh]: Mobile address bar issue fix
       2. bg-base-100 sm:bg-base-200: Desktop par grey/dark bg, mobile par plain form bg
    */
    <div className="min-h-dvh flex items-center justify-center p-0 sm:p-6 md:p-8 bg-base-100 sm:bg-base-200 w-full">
      
      {/* Mobile par full screen, Desktop par beautiful card */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 sm:rounded-2xl sm:shadow-2xl sm:border border-base-300 overflow-hidden min-h-dvh sm:min-h-0">
        
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center min-h-dvh sm:min-h-0">
          
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <ShipWheelIcon className="size-8 sm:size-10 text-primary" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-6 shadow-sm rounded-xl text-sm">
              <span>{error?.response?.data?.message || "Something went wrong!"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-6">
                
                {/* WELCOME TEXT */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Create an Account</h2>
                  <p className="text-sm sm:text-base text-base-content/60">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-4">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label px-1 py-2">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label px-1 py-2">
                      <span className="label-text font-medium">Email Address</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label px-1 py-2">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs text-base-content/50 mt-2 ml-1">
                      Must be at least 6 characters long
                    </p>
                  </div>

                  {/* T&C CHECKBOX */}
                  <div className="form-control mt-2">
                    <label className="label cursor-pointer justify-start gap-3 p-1">
                      <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" required />
                      <span className="text-xs sm:text-sm text-base-content/70 leading-tight">
                        I agree to the{" "}
                        <span className="text-primary font-medium hover:underline">terms of service</span> and{" "}
                        <span className="text-primary font-medium hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                  className="btn btn-primary w-full shadow-md hover:shadow-primary/30 transition-all active:scale-[0.98] mt-2" 
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* LOGIN LINK */}
                <div className="text-center mt-6">
                  <p className="text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION - RIGHT SIDE (Hidden on mobile, consistent with Login) */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/5 items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative blur circles */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>

          <div className="max-w-md relative z-10">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto animate-float">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain" />
            </div>

            <div className="text-center space-y-3 mt-8">
              <h2 className="text-2xl font-bold text-base-content">Start Your Journey</h2>
              <p className="text-base-content/70 leading-relaxed">
                Connect with native speakers worldwide. Practice conversations, make friends, and master new languages effortlessly.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SignUpPage;