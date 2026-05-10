import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    /* 1. min-h-[100dvh]: Mobile par browser bars ke beech me height fix rakhta hai.
       2. bg-black: Video calls hamesha dark background par achhi lagti hain.
    */
    <div className="min-h-dvh w-full bg-[#101418] flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center p-2 sm:p-4">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="text-center p-6 bg-base-200 rounded-2xl shadow-xl border border-base-300 mx-4">
             <p className="text-base sm:text-lg opacity-80">Could not initialize call. Please refresh.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
       navigate("/");
    }
  }, [callingState, navigate]);

  return (
    /* 1. StreamTheme: Iska default mode 'dark' hai.
       2. str-video__call-container: Is class ko height full deni hogi taaki layout pichke na.
    */
    <StreamTheme className="w-full h-full flex flex-col relative">
      <div className="flex-1 w-full h-full rounded-xl overflow-hidden shadow-2xl relative">
        {/* SpeakerLayout automatically grid adjust karta hai mobile ke liye */}
        <SpeakerLayout participantsBarPosition="bottom" />
        
        {/* Controls Overlay: Niche float karenge aur mobile par adjust honge */}
        <div className="absolute bottom-4 left-0 right-0 z-50 px-2">
            <div className="max-w-fit mx-auto scale-90 sm:scale-100">
               <CallControls onLeave={() => navigate("/")} />
            </div>
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;