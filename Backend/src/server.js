// You can create your Express Server using these 3 Steps

// Step 1 - Initialization
const express = require('express'); // instance of express object
const app = express(); // server has been created inside app

const mongoose = require('mongoose'); // initialize mongoose


// replace <dbpassword> with real password, and remove after / and write database name
mongoose.connect("mongodb+srv://ShahzainAhmed:shahzain5544@cluster0.wluzlbh.mongodb.net/notesdb").then(function () {
    // If mongoose connects, then these all routes will be available, else not.

    // Default Route -> localhost:5001/
    app.get('/', function (req, res) {
        res.send("This is the default page");
    });

    // Home Route -> localhost:5001/home
    app.get('/home', function (req, res) { // request (data → server), response (server → data)
        res.send("This is the home page");
    });

    // Notes Route -> localhost:5001/notes
    app.get('/notes', function (req, res) {
        res.send("You are on Notes Route");
    });

});


// Step 3 - Start Server on PORT
// app.listen(5001); function is optional here.
app.listen(5001, function () {
    console.log("Server Started at PORT: 5001");
});
