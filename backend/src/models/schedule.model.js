import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema(
  {
    day: {
        type: String,
        required: true
    },
    muscles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Muscle",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Schedule = mongoose.model("Schedule", scheduleSchema);
