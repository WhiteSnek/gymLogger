import mongoose, { Schema } from "mongoose";

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
    },
    muscleGroup: {
      type: String,
    },
    sets: {
      type: Schema.Types.ObjectId,
      ref: "Set",
    },
  },
  {
    timestamps: true,
  }
);

export const Exercise = mongoose.model("Exercise",exerciseSchema)
