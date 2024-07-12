import mongoose, { Schema } from "mongoose";

const setSchema = new Schema(
  {
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Set = mongoose.model("Set", setSchema);