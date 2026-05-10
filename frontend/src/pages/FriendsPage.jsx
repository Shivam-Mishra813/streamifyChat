import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import FriendCard from '../components/FriendCard'; // 🚨 Tumhara bana banaya card import kiya

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
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Your Friends</h1>
        <span className="text-gray-400 text-sm">{friends?.length || 0} Friends</span>
      </div>

      {(!friends || friends.length === 0) ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl">Abhi tak tumhara koi dost nahi hai. Naye logo se milo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* 🚨 Yahan humne tumhara original FriendCard use kiya hai */}
          {friends?.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;