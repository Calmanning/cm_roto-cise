const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const db = require('./models');

router.get('/', (req, res) => {
    //res.send('Get you some extra-cise');
    console.log("welcome welcome")
    res.render('index')
})


//viewing exercises
// router.get("/api/exercises", (req, res) => {
//     db.Exercise.find({}).then(dbExercise => {
//         res.json(dbExercise)
//     })
// });

//viewing workouts
router.get("/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout)
        //res.render('workouts')
        console.log("workouts loaded")

    }).catch(err => {
        res.json(err)
    })
});

// //populated exercises
// // router.get("/popexercise", (req,res) => {
// //     db.Workout.find({}).populate("Exercises")
// //     .then(dbWorkout => {
// //         res.json(dbWorkout)
// //     })
// //     .catch(err => {
// //         console.log(err);
// //         res.send(err)
// //     })
// // })

// //adding excercise
// router.post("/api/new-exercise", (req, res) => {
//     console.log(req.body);

//     db.Exercise.create(req.body).then(dbExercise => {
//         db.Workout.findOneAndUpdate({_id:req.body.workoutId},{$push: {exercises: dbExercise._id}})
//         .then(dbWorkout => res.send(dbWorkout))
//     })
//     .catch(err => res.json(err))
// })

//adding workout
router.post("/api/new-workout", ({ body }, res) => {
    db.Workout.create(body).then(dbWorkout => {
        res.json(dbWorkout)
    }).catch(err => {
        console.log(err)
        res.send(err);
    })
})


//delete route

//update the workout 
router.put("/api/updated/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(
        params.id,
        {
            $push: { exercises: body }
        }
    ).then(dbWorkout => {
        res.json(dbWorkout)
    })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

router.delete("/api/delete", ({ body }, res) => {
    db.Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

module.exports = router;