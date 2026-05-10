import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    /* 1. pb-safe: Mobile Bottom Nav ke liye jagah chhodne ke liye 
       2. max-w-3xl: Notifications ke liye card width zaroorat se zyada chodi na ho */
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-3xl mx-auto pb-safe mb-16 lg:mb-0">
      <div className="space-y-6 sm:space-y-8">
        
        <div className="border-b border-base-300 pb-4">
           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Notifications</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* INCOMING FRIEND REQUESTS */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-base-content">
                  <UserCheckIcon className="size-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary badge-sm sm:badge-md ml-1">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          
                          {/* USER INFO */}
                          <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                            <div className="avatar size-12 sm:size-14 rounded-full bg-base-300 shrink-0 ring ring-primary/10">
                              <img src={request.sender.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.sender.fullName}`} alt={request.sender.fullName} className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-base sm:text-lg truncate text-base-content">{request.sender.fullName}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm text-[10px] sm:text-xs">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-sm text-[10px] sm:text-xs">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* ACTION BUTTON */}
                          <button
                            className="btn btn-primary btn-sm w-full sm:w-auto shrink-0 mt-2 sm:mt-0 active:scale-95 transition-all"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            Accept Request
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED REQUESTS (NEW CONNECTIONS) */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-base-content">
                  <BellIcon className="size-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 border border-base-300 shadow-sm">
                      <div className="card-body p-4 sm:p-5">
                        <div className="flex items-start sm:items-center gap-3">
                          
                          <div className="avatar mt-1 sm:mt-0 size-10 sm:size-12 rounded-full shrink-0">
                            <img
                              src={notification.recipient.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${notification.recipient.fullName}`}
                              alt={notification.recipient.fullName}
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base-content truncate">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-xs sm:text-sm my-0.5 text-base-content/70">
                              Accepted your friend request
                            </p>
                            <p className="text-[10px] sm:text-xs flex items-center text-base-content/50 mt-1">
                              <ClockIcon className="size-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          
                          {/* BADGE (Hidden on very small screens, visible on normal mobile and up) */}
                          <div className="hidden sm:flex badge badge-success badge-sm gap-1 shrink-0">
                            <MessageSquareIcon className="size-3" />
                            New Friend
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EMPTY STATE */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;