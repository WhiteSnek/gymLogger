import mongoose, {Schema} from "mongoose";

const scheduleSchema = new Schema({
    muscles: [
        {
            type: String,
            required: true
        }
    ],
    exercise: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise",
            required: true
        }
    ]
},{
    timestamps: true
})

export const Schedule = mongoose.model('Schedule',scheduleSchema);