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



// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
    console.log("Ahoy and welcome aboard the USS https//:"+ PORT);
});