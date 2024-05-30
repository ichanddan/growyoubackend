import mongoose from "mongoose";

const contectSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Contects = mongoose.model("Contects", contectSchema);
