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

// const mongoDbPath = "mongodb+srv://ShahzainAhmed:shahzain5544@cluster0.wluzlbh.mongodb.net/notesdb";
const mongoDbPath = process.env.MONGO_DB_URI;
mongoose.connect(mongoDbPath).then(function () {
    // If MongoDB connects, then all these paths will be available to use, else not.

    // Default Route -> localhost:5001/
    app.get('/', function (req, res) {
        const response = { statuscode: res.statusCode, message: "API Works - Default Route" };
        res.json(response);
    });

    // Home Route -> localhost:5001/home
    app.get('/home', function (req, res) { // request (data → server), response (server → data)
        res.send("This is the home page");
    });

});


// Step 3 - Start Server on PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
    console.log("Server Started at PORT: " + PORT);
});
