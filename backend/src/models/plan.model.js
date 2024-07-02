import mongoose, {Schema} from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    isFollowing: {
        type: Boolean,
    },
    
},{
    timestamps: true
})

export const Plan = new mongoose.model("Plan",planSchema)