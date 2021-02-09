const express = require("express");
const mongoose = require('mongoose');
const compression = require("compression");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(compression());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trainings", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// ================================================================================
// ROUTES
// ================================================================================
//Welcome welcome
app.get('/', (req,res) => {
    res.send('Get you some extra-cise');
    // res.sendFile('./index.html')
})

//SEED Test
const seedWorkouts = [
    {
    name: "pushes",
    type: "Strength",
    weight: 20,
    sets: 3,
    reps: 30,
    isCardio: false,
    duration: null
    },
    {
        name: "Sits",
        type: "Strength",
        weight: 20,
        sets: 3,
        reps: 30,
        isCardio: false,
        duration: null
    },
    {
        name: "Runnings",
        type: "Cardio",
        weight: null,
        sets: null,
        reps: null,
        isCardio: true,
        duration: 30
    },
    
]


//viewing exercises
app.get("/api/exercises", (req, res) => {
    db.Exercise.find({}).then(dbExercise => {
        res.json(dbExercise)
    })
});

//viewing workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout)
    })
});

//populated exercises
app.get("/popexercise", (req,res) => {
    db.Workout.find({}).populate("Exercises")
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    })
})

//adding excercise
app.post("/api/new-exercise", (req, res) => {
    console.log(req.body);

    db.Exercise.create(req.body).then(dbExercise => {
        db.Workout.findOneAndUpdate({_id:req.body.workoutId}, {$push: {exercises: dbExercise._id}})
        .then(dbWorkout => res.send(dbWorkout))
    })
    .catch(err => res.json(err))
})

//adding workout
app.post("/api/new-workout", ({ body }, res) => {
    db.Workout.create(body).then(dbWorkout => {
        res.json(dbWorkout)
            }) .catch(err => {
                console.log(err)
                res.send(err);
            })
})

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
    console.log("Ahoy and welcome aboard the USS https//:"+ PORT);
});