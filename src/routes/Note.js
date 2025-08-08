const express = require("express");
const router = express.Router(); // to use app as router
const Note = require("./../models/Note");

// Notes Route -> localhost:5001/notes
// app.get('/notes/list', async function (req, res) {
//     // Note.find() returns a Promise, so we use await to get the actual data.
//     var notes = await Note.find();
//     res.json(notes);
// });

// Fetch all notes from the database using the Note model.
router.post('/list', async function (req, res) {
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

// Add Notes API
router.post('/add', async function (req, res) {
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
router.post('/delete', async function (req, res) {
    await Note.deleteOne({ id: req.body.id });
    const response = { message: `Note with id: ${req.body.id} has been deleted!` };
    res.json(response);
});

module.exports = router;