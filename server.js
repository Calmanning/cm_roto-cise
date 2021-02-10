const express = require("express");
const mongoose = require('mongoose');
const compression = require("compression");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3030;

const seed = require("./seed")

app.use(compression());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./models');
const router = require("./control")
app.use(router);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
 
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({
//     defaultLayout: "main",
//     helpers: {
//       "json": function (context) {
//         return JSON.stringify(context, null, 4);
//       }
//     }
//   }));
//   app.set("view engine", "handlebars");

// ================================================================================
// ROUTES
// ================================================================================
//Welcome welcome
// app.get('/', (req,res) => {
//     //res.send('Get you some extra-cise');
//     console.log("welcome welcome")
//     res.render('index')
// })

//SEED Test
let newSeed = [

        {
            day: new Date(Date.now()),
            exercises: [{
                name: "tri-curl",
                type: "strength",
                weight:35,
                sets: 3,
                reps: 12,
                isCardio: false,
                duration: null,
                distance: null
            }]

        }

]

// const seedWorkouts = [
    
    
//     {
//     name: "pushes",
//     type: "Strength",
//     weight: 20,
//     sets: 3,
//     reps: 30,
//     isCardio: false,
//     duration: null
//     },
//     {
//         name: "Sits",
//         type: "Strength",
//         weight: 20,
//         sets: 3,
//         reps: 30,
//         isCardio: false,
//         duration: null
//     },
//     {
//         name: "Runnings",
//         type: "Cardio",
//         weight: null,
//         sets: null,
//         reps: null,
//         isCardio: true,
//         duration: 30
//     },
    
// ]


// //viewing exercises
// app.get("/api/exercises", (req, res) => {
//     db.Exercise.find({}).then(dbExercise => {
//         res.json(dbExercise)
//     })
// });

// //viewing workouts
// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({}).then(dbWorkout => {
//         res.json(dbWorkout)
//         //res.render('workouts')

//     })
// });

// //populated exercises
// app.get("/popexercise", (req,res) => {
//     db.Workout.find({}).populate("Exercises")
//     .then(dbWorkout => {
//         res.json(dbWorkout)
//     })
//     .catch(err => {
//         console.log(err);
//         res.send(err)
//     })
// })

// //adding excercise
// app.post("/api/new-exercise", (req, res) => {
//     console.log(req.body);

//     db.Exercise.create(req.body).then(dbExercise => {
//         db.Workout.findOneAndUpdate({_id:req.body.workoutId},{$push: {exercises: dbExercise._id}})
//         .then(dbWorkout => res.send(dbWorkout))
//     })
//     .catch(err => res.json(err))
// })

// //adding workout
// app.post("/api/new-workout", ({ body }, res) => {
//     db.Workout.create(body).then(dbWorkout => {
//         res.json(dbWorkout)
//             }) .catch(err => {
//                 console.log(err)
//                 res.send(err);
//             })
// })

// //update the workout by updating the exercises
// app.put("/api/updated", (req, res) => {
//     db.exercise.update(
//         {
//             _id: req.params.id
//         },
//         {
//             $set: {
//                 body: req.body
//             }
//         },
//         (err, data) => {
//             if(err) {
//                 console.log(err);
//                 res.send(err);
//             } else {
//                 console.log(data);
//                 res.send(data);
//             }
//         }
//     )
// })

// app.put("/api/updatedworkout", (req,res) => {
//     db.workout.update(

//     )
// })

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
    console.log("Ahoy and welcome aboard the USS https//:"+ PORT);
});