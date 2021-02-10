const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
            exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Need to know the exercise."
            },
            type: {
                type: String,
                trim: true},
            weight: {
                type: Number,
                default: null
                },
            sets: {
                type: Number,
                default: null
            },
            reps: {
                type: Number,
                default: null
            },
            isCardio: {
                type: Boolean
            },
            duration: {
                type: Number,
                default: null
            },
            distance: {
                type: Number}
        }
    ]

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
