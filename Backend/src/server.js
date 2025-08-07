// You can create your Express Server using these 3 Steps

// Step 1 - Initialization
const express = require('express'); // instance of express object
const app = express(); // server has been created inside app

const mongoose = require('mongoose'); // initialize mongoose
const bodyParser = require('body-parser'); // initialize body-parser
// making the app use bodyParser entirely
// extended:true means -> Nested Objects (Correct)
// extended:false means -> Nested Objects (Not Correct) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const noteRouter = require('./routes/Note');
app.use('/notes', noteRouter);

// Import the model of Note
const Note = require("./models/Note"); // ./ mean current folder -> src
const router = require('./routes/Note');

// replace <dbpassword> with real password, and remove after / and write database name
mongoose.connect("mongodb+srv://ShahzainAhmed:shahzain5544@cluster0.wluzlbh.mongodb.net/notesdb").then(function () {
    // If mongoose connects, then these all routes will be available, else not.

    // Default Route -> localhost:5001/
    app.get('/', function (req, res) {
        const response = { message: "API Works - Default Route" };
        res.json(response);
        // res.send("This is the default page");

    });

    // Home Route -> localhost:5001/home
    app.get('/home', function (req, res) { // request (data → server), response (server → data)
        res.send("This is the home page");
    });

});


// Step 3 - Start Server on PORT
// app.listen(5001); function is optional here.
app.listen(5001, function () {
    console.log("Server Started at PORT: 5001");
});
