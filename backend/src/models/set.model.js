import mongoose, { Schema } from "mongoose";

const setSchema = new Schema(
  {
    reps: {
      type: Number
    },
    weight: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

export const Set = mongoose.model("Set", setSchema);