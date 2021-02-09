const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema ({
    name: String,
    type: String,
    weight: Number,
    sets: Number,
    reps: Number,
    isCardio: Boolean,
    duration: Number
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;