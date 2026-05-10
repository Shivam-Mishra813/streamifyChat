import React from "react";
import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    /* 1. min-h-[100dvh]: Mobile address bar issue ko fix karta hai.
       2. sm:bg-base-200: Mobile par background plain rahega, par desktop par card alag dikhega.
    */
    <div className="min-h-dvh flex items-center justify-center p-0 sm:p-6 md:p-8 bg-base-100 sm:bg-base-200 w-full">
      
      {/* 1. min-h-screen sm:min-h-0: Mobile par poori screen form lega, desktop par center-aligned card hoga.
          2. sm:rounded-2xl: Mobile par square edges, desktop par rounded.
      */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 sm:rounded-2xl sm:shadow-2xl sm:border border-base-300 overflow-hidden min-h-dvh sm:min-h-0">
        
        {/* LOGIN FORM SECTION */}
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

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-6 shadow-sm rounded-xl text-sm">
               <span>{error?.response?.data?.message || "Login failed. Please try again."}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                
                {/* WELCOME TEXT */}
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Welcome Back</h2>
                  <p className="text-sm sm:text-base text-base-content/60">
                    Sign in to your account to continue your language journey.
                  </p>
                </div>

                {/* INPUT FIELDS */}
                <div className="flex flex-col gap-4">
                  
                  <div className="form-control w-full">
                    <label className="label px-1 py-2">
                      <span className="label-text font-medium">Email Address</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label px-1 py-2">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full mt-2 shadow-md hover:shadow-primary/30 transition-all active:scale-[0.98]" 
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* SIGNUP LINK */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-base-content/70">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
                        Create one
                      </Link>
                    </p>
                  </div>
                  
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION (Hidden on mobile) */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/5 items-center justify-center p-12 relative overflow-hidden">
           {/* Decorative background circle */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>

          <div className="max-w-md relative z-10">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto animate-float">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain" />
            </div>

            <div className="text-center space-y-3 mt-8">
              <h2 className="text-2xl font-bold text-base-content">Connect Worldwide</h2>
              <p className="text-base-content/70 leading-relaxed">
                Practice conversations, make friends, and improve your language skills together with native speakers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;