import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Roll:{
        type:String,
        enum:["Admin", "User"],
        default:"User"
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserShema);
