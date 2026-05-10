import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
//import { onboard } from "../controllers/auth.controller.js";
import{getMyFriends,getRecommendedUsers,acceptFriendRequest,sendFriendRequest,getFriendRequests,getOutgoingFriendReqs,updateProfile} from "../controllers/user.controller.js"

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friends-request/:id" ,sendFriendRequest);
router.put("/friends-request/:id/accept" ,acceptFriendRequest);


router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs);
router.put("/update-profile", updateProfile);

export default router;