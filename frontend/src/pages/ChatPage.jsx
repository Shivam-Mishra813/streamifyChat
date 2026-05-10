import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { ArrowLeft } from "lucide-react"; 

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate(); 

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    /* 1. h-[calc(100dvh-64px)]: Yeh sabse zaroori hai. Mobile navbar ki height minus ki hai.
       2. overflow-hidden: Taaki content screen se bahar scroll na kare.
    */
    <div className="h-[calc(100dvh-64px)] sm:h-[calc(100vh-64px)] w-full flex flex-col overflow-hidden bg-base-100">
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <div className="flex-1 w-full flex flex-col relative h-full">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              
              {/* HEADER WITH BACK BUTTON */}
              <div className="flex items-center w-full bg-base-100 border-b border-base-300">
                <button
                  onClick={() => navigate(-1)} 
                  className="ml-2 sm:ml-4 p-2 rounded-full hover:bg-base-200 active:scale-95 transition-all cursor-pointer z-10"
                  title="Go Back"
                >
                  <ArrowLeft className="size-5 sm:size-6 text-base-content" />
                </button>
                
                {/* 1. min-w-0: Flex child ko shrink karne deta hai taaki header phone par bahar na nikle */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <ChannelHeader />
                </div>
              </div>

              {/* MESSAGE AREA */}
              <div className="flex-1 overflow-y-auto">
                <MessageList />
              </div>
              
              {/* INPUT AREA - Sticky on bottom */}
              <div className="w-full bg-base-100 pb-safe sm:pb-0">
                <MessageInput focus />
              </div>
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;