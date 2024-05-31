import mongoose, { Schema, Types } from "mongoose";
import { User } from "./user.models.js";

const BlogShema = new mongoose.Schema(
  {
    Author: {
      type: mongoose.Schema.Types.String,
      ref:"User"
    },
    AuthorImage:{
      type: mongoose.Schema.Types.String,
      ref:"User"

    },
    Title: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", BlogShema);
