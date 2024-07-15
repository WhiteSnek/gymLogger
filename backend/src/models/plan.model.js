import mongoose, {Schema} from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    isFollowing: {
        type: Boolean,
    },
    schedule: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Schedule'
        }
    ]
},{
    timestamps: true
})

export const Plan = new mongoose.model("Plan",planSchema)