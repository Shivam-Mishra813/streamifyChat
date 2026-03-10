import express from "express";
import {login,logout,signup} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { onboard } from "../controllers/auth.controller.js";

const router = express.Router();

// signup
router.post("/signup",signup);

// login
router.post("/login", login);

// logout
router.post("/logout",logout);

router.post("/onboarding",protectRoute,onboard);

// check if user is login or not
router.get("/me",protectRoute,(req,res) =>{
    res.status(200).json({success:true,user:req.user});
});

export default router;