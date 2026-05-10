import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import FriendCard from '../components/FriendCard'; 
import { UsersIcon } from 'lucide-react'; // 🚨 NAYA: Empty state ke liye icon

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealFriends = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/friends", {
          withCredentials: true 
        }); 
        
        if (Array.isArray(res.data)) {
          setFriends(res.data);
        } else {
          console.error("Backend se array nahi aaya! Ye aaya hai:", res.data);
          setFriends([]); 
        }

      } catch (error) {
        console.error("Error fetching friends:", error);
        toast.error("Doston ki list load nahi ho payi!");
        setFriends([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchRealFriends();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        {/* 🚨 FIX: text-white ki jagah text-primary lagaya taaki har theme me dikhe */}
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    /* 1. pb-safe: Mobile par bottom nav ke liye extra space
       2. max-w-7xl: Badi screens par content limit me rahe
    */
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto h-full overflow-y-auto pb-safe">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-6 sm:mb-8 border-b border-base-300 pb-4">
        <div>
          {/* 🚨 FIX: text-white hata kar text-base-content kiya */}
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">Your Friends</h1>
          <p className="text-sm text-base-content/60 mt-1">Chat and practice languages</p>
        </div>
        <span className="badge badge-primary badge-sm sm:badge-md font-medium">
          {friends?.length || 0} Friends
        </span>
      </div>

      {/* CONDITIONAL RENDERING */}
      {(!friends || friends.length === 0) ? (
        
        /* RESPONSIVE EMPTY STATE */
        <div className="flex flex-col items-center justify-center text-center mt-12 sm:mt-20 p-6 bg-base-200/50 rounded-2xl border-2 border-dashed border-base-300">
          <div className="bg-base-300 p-4 rounded-full mb-4">
            <UsersIcon className="size-8 sm:size-12 text-base-content opacity-30" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-base-content">
            No friends yet
          </h3>
          <p className="text-base-content/60 text-sm sm:text-base max-w-sm">
            Abhi tak tumhara koi dost nahi hai. Explore sections mein jao aur naye logo se connect karo!
          </p>
        </div>

      ) : (
        
        /* RESPONSIVE GRID (Ye tumhara pehle se hi kaafi badhiya tha!) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {friends?.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>

      )}
    </div>
  );
};

export default FriendsPage;