const mongoose = require('mongoose')
const db = require("./models")

mongoose.connect("mongodb://localhost/workouts", {
    useNewUrlParser: true,
    UseFindAndModify: false,
    useUnifiedTopology: true

});

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
        },
        {
                name: "pushes",
                type: "strength",
                weight: null,
                sets: 5,
                reps: 17,
                isCardio: false,
                duration: null,
                distance: null
        }]
    },

    {
        day: new Date(Date.now()),
        exercises: [{
            name: "sits",
            type: "strength",
            weight:null,
            sets: 5,
            reps: 25,
            isCardio: false,
            duration: null,
            distance: null
        },
        {
            name: "lumberjacks",
            type: "strength",
            weight:55,
            sets: 1,
            reps: 50,
            isCardio: false,
            duration: null,
            distance: null
        },
        {
            name: "Kaber Toss",
            type: "strength",
            weight: 7433,
            sets: 1,
            reps: 1,
            isCardio: false,
            duration: null,
            distance: null
        }]

    },
    {
        day: new Date(Date.now()),
        exercises: [{
            name: "pushes",
            type: "strength",
            weight: null,
            sets: 5,
            reps: 17,
            isCardio: false,
            duration: null,
            distance: null
        }]

    },
    {
        day: new Date(Date.now()),
        exercises: [{
            name: "runnnnnning",
            type: "areobic",
            weight:35,
            sets: 3,
            reps: 12,
            isCardio: false,
            duration: 30,
            distance: 2
        }]

    },
]


db.Workout.deleteMany()
.then(() => db.Workout.insertMany(newSeed))
.then ((data) => {
    console.log(data.result + " Seeds done")
    console.log("now get to work!")
}).catch(err => {
    console.log(err);
    console.log("IT DIDN'T WORK")
})




module.exports = newSeed