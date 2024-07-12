import mongoose, {Schema} from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    isFollowing: {
        type: Boolean,
    },
    week: {
        type: Schema.Types.ObjectId,
        ref: 'Week'
    }
},{
    timestamps: true
})

export const Plan = new mongoose.model("Plan",planSchema)