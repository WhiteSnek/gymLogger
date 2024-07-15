import mongoose,{Schema} from "mongoose";

const muscleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
},{
    timestamps:true
})

export const Muscle = mongoose.model("Muscle",muscleSchema)