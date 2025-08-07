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


// Import the model of Note
const Note = require("./models/Note"); // ./ mean current folder -> src

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

    // Notes Route -> localhost:5001/notes
    // Fetch all notes from the database using the Note model.
    // app.get('/notes/list', async function (req, res) {
    //     // Note.find() returns a Promise, so we use await to get the actual data.
    //     var notes = await Note.find();
    //     res.json(notes);
    // });

    app.post('/notes/list', async function (req, res) {
        var notes = await Note.find({ userId: req.body.userId });
        res.json(notes);
    });
    // We won't be writing everything manually like in GET Method, so let's use POST method
    // app.get('/notes/add', async function (req, res) {
    //     // Object or instance
    //     const newNote = new Note({
    //         id: "0003",
    //         userId: "shahzainahmed57@gmail.com",
    //         title: "My Second Note",
    //         content: "This is the content",
    //     });

    //     await newNote.save();

    //     const response = { message: "New Note Created" };
    //     res.json(response);

    // });

    /* POST methods don't understand JSON or URL encoded by default.
      So we will use body-parser package by -> 'npm install body-parser'.
      Body parser will read/convert the req.body  
    */

    app.post('/notes/add', async function (req, res) {
        // No need to create a separate route for updating a note.
        // This will first delete the note with the same ID (if it exists), then add the new one.
        await Note.deleteOne({ id: req.body.id });

        const newNote = Note({
            id: req.body.id,
            userId: req.body.userId,
            title: req.body.title,
            content: req.body.content,
        });
        await newNote.save();
        const response = { message: "New Note Created" + `id: ${req.body.id}` };
        res.json(response);
    });

    // Notes Delete Route -> localhost:5001/notes/delete
    app.post('/notes/delete', async function (req, res) {
        await Note.deleteOne({ id: req.body.id });
        const response = { message: `Note with id: ${req.body.id} has been deleted!` };
        res.json(response);
    });

});


// Step 3 - Start Server on PORT
// app.listen(5001); function is optional here.
app.listen(5001, function () {
    console.log("Server Started at PORT: 5001");
});
