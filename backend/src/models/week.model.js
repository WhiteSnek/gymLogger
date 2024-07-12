import mongoose, { Schema } from "mongoose";

const weekSchema = new Schema(
  {
    monday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    tuesday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    wednesday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    thursday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    friday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    saturday: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    }
  },
  {
    timestamps: true,
  }
);

export const Week = mongoose.model("Week", weekSchema);