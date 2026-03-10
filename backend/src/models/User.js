import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    profilePic: {
      type: String, // URL (Cloudinary / etc.)
      default: "",
    },

    nativeLanguage: {
      type: String,
      default:"",
    },

    learningLanguage: {
      type: String,
      default:"",
    },

    location: {
      type: String,
      default: "",
    },

    isOnboarded: {
      type: Boolean,
      default: false,
    },

    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
  },
  { timestamps: true }

);

//todo: explain this once
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 


userSchema.methods.matchPassword=async function (enteredPassword){
    //123456
    const isPasswordCorrect=await bcrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
}

const User =mongoose.model("User",userSchema);



export default User;