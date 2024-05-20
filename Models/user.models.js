import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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

UserShema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("Password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.Password, salt);
    user.Password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});



export const User = mongoose.model("User", UserShema);
