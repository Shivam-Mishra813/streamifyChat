import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    /* 1. pb-safe & pb-24: Mobile par Bottom Nav ke peeche content na chhup jaye.
       2. max-w-7xl: Desktop par bahut zyada na faile.
    */
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto pb-safe lg:pb-8 mb-16 lg:mb-0">
      <div className="container mx-auto space-y-10">
        
        {/* HEADER 1: YOUR FRIENDS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm sm:btn-md shadow-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* YOUR FRIENDS SECTION */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* HEADER 2: MEET NEW LEARNERS */}
        <section className="pt-6 border-t border-base-300/50">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Meet New Learners</h2>
                <p className="opacity-70 text-sm sm:text-base mt-1">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {/* RECOMMENDATIONS SECTION */}
          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-8 sm:p-12 text-center border-2 border-dashed border-base-300">
              <h3 className="font-bold text-xl mb-2 text-base-content">No recommendations available</h3>
              <p className="text-base-content/70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-300/50"
                  >
                    <div className="card-body p-4 sm:p-5 space-y-4">
                      
                      {/* USER INFO */}
                      <div className="flex items-center gap-3">
                        <div className="avatar size-14 sm:size-16 rounded-full overflow-hidden ring ring-primary/10">
                          <img src={user.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`} alt={user.fullName} className="object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate text-base-content">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1 shrink-0" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* LANGUAGES */}
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-secondary badge-sm sm:badge-md py-3 px-3 text-[10px] sm:text-xs">
                          {getLanguageFlag(user.nativeLanguage)}
                          <span className="ml-1">Native: {capitialize(user.nativeLanguage)}</span>
                        </span>
                        <span className="badge badge-outline badge-sm sm:badge-md py-3 px-3 text-[10px] sm:text-xs">
                          {getLanguageFlag(user.learningLanguage)}
                          <span className="ml-1">Learning: {capitialize(user.learningLanguage)}</span>
                        </span>
                      </div>

                      {/* BIO */}
                      {user.bio && (
                        <p className="text-sm opacity-70 line-clamp-2 leading-relaxed">
                          "{user.bio}"
                        </p>
                      )}

                      {/* ACTION BUTTON */}
                      <button
                        className={`btn btn-sm sm:btn-md w-full mt-2 transition-all active:scale-95 ${
                          hasRequestBeenSent ? "btn-success text-white" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 sm:size-5 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 sm:size-5 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;