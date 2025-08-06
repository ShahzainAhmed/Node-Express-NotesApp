// Steps to create a model:
// 1. Define Schema -> Note: id, userId, title, content, dateAdded
// 2. Create Model -> 2 things to give: <model name> <schema> model name can be Note, and schema comes from Step 1

// Initialize mongoose
const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    // Inside Schema arguments you have to give a Map/Object
    id: {
        type: String,
        unique: true, // means one id won't have multiple notes in our db
        required: true, // means to create note model 'id' is required.
    },
    userId: {
        type: String,
        required: true,
        // one user can have many notes, so this is why we don't write unique here.
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        // content is not required, means content can be empty too.
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    }
});

// Coming to Step 2, Use the schema to create the model(name of model, schema name).

// mongoose.model("Note", noteSchema); // Model Created

// Now we need to export the 'Note' model from the Note.js file, otherwise we won’t be able to use it in other files like 'server.js'. Defining the model is pointless if it’s not exported.

module.exports = mongoose.model("Note", noteSchema); 