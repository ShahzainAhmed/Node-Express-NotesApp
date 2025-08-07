## Setting Up Node.js, NPM, and Express to Create a Server

Course Followed: `https://www.youtube.com/watch?v=yFpcw3ABrQU&list=PLr7P7lMIUTuuDxy3IuoPLjoG9IvL1LNNA&index=1`

## Episode 1 - Setting up and creating the Server

NodeJS comes with NPM (Node Package Manager).
NPM is used to install third-party packages like Express, MongoDB, etc.

Now we create a folder in our system called "Backend", and we open that folder inside VSCode, and then we create a file called `server.js`, 
Inside the Backend folder, create a file named server.js.
Add the following code to test if NodeJS is working:
```
console.log("Hello World");
```
To run the file and see the output:
```
node server.js
```

To create our first Express server, run the following command. It will initialize NPM in our project and generate a package.json file containing all the package details.
```
npm init 
```

Now we will run the command to install Express
```
npm install express
```

Create your Express server in three simple steps.

```
// Step 1 - Initialization
const express = require('express'); // instance of express object
const app = express(); // server has been created inside app

// Step 2 - Define Routes

// Default Route -> localhost:5001/
app.get('/', function (req, res) {
    res.send("This is the default page");
});

// Home Route -> localhost:5001/home
app.get('/home', function (req, res) { // request (data → server), response (server → data)
    res.send("This is the homepage");
});

// Notes Route -> localhost:5001/notes
app.get('/notes', function (req, res) {
    res.send("You are on Notes Route");
});

// Step 3 - Start Server on PORT
// app.listen(5001); function is optional here.
app.listen(5001, function () {
    console.log("Server Started at PORT: 5001");
});

```
## Episode 2 - Connecting to MongoDB using Mangoose and using Postman
## Initializing MongoDB with Mongoose

Create MongoDB database and Cluster by going to its website, and create the user in Database Access, and create 0.0.0.0/0 IP in Network Access to access the IP from anywhere. 

First, in your terminal write this command to install the mongoose package
```
npm install mongoose
```
Then, to connect MongoDB database with mongoose, check the code below
```
// Step 1 - Initialization
const express = require('express'); // instance of express object
const app = express(); // server has been created inside app

const mongoose = require('mongoose'); // initialize mongoose


// replace <dbpassword> with real password, and remove after / and write database name
mongoose.connect("mongodb+srv://ShahzainAhmed:shahzain5544@cluster0.wluzlbh.mongodb.net/notesdb").then(function () {
    // If mongoose connects, then all these routes will be available, else not.

    // Default Route -> localhost:5001/
    app.get('/', function (req, res) {
        res.send("This is the default page");
    });

    // Home Route -> localhost:5001/home
    app.get('/home', function (req, res) { // request (data → server), response (server → data)
        res.send("This is the homepage");
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

```

## Episode 3 - Creating Routes and Handling Data

When we make any change to a print statement or something like:
```
app.get('/home', function(req, res) {
  res.send("This is the home page");
});
```
If I change it to "This is home" and remove the word "page", then I have to stop the server (started using `node server.js`) and restart it again to see the change, right?

If that's the case, it would take forever to build APIs this way.

To fix this issue, we will install a package from npm called `nodemon`.

> nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Open your terminal and run the following command to install the nodemon package:
```
npm install -g nodemon
```
> The -g flag stands for global. It means that the package will be installed system-wide, not just in the current project.

### Starting the Server with Nodemon

Now that we’ve installed `nodemon`, we won’t start our server using `node server.js` Instead, we’ll use:
```
nodemon server.js
```
> This will automatically restart the server whenever you make changes to your code.

### Creating a Custom Script in the package.json file

We created a 'dev' script

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

To run this script, we’ll use `npm run dev`, where `dev` is the name of the script.

### Creating a Note Model:
A model is a data structure that we will save in our MongoDB database. We don’t need any extra packages for this, as Mongoose already provides all the necessary functionality.

### Schema
A Schema defines the structure of a model — it outlines what fields and data types your model will have.

For example, in a Notes app, a Schema might include the following fields: `id`, `userId`, `title`, `content`, `dateAdded`

### Steps to Create and Export a Model

1. Define Schema: Note: id, userId, title, content, dateAdded
2. Create Model: 2 things to give: <model name> <schema> model name can be Note, and schema comes from Step 1
```
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
```

### To Import a Model
```
const Note = require("./models/Note");
```
> ' ./ ' means current folder -> src

For the GET APIs, we were using them like this:

```
    app.get('/notes/add', async function (req, res) {
        // Object or instance
        const newNote = new Note({
            id: "0003",
            userId: "shahzainahmed57@gmail.com",
            title: "My Second Note",
            content: "This is the content",
        });

        await newNote.save();

        const response = { message: "New Note Created" };
        res.json(response);

    });
```
Instead of manually creating data like in the GET method, let's use the POST method to send data dynamically.
```
 app.post('/notes/add', async function (req, res) {
        res.json(req.body);
    });
```
### 
POST methods don’t parse JSON or URL-encoded data by default.  

To fix this issue, we will install a package from npm called body-parser.
> The body-parser helps read and convert the data sent in `req.body`.

Open your terminal and run the following command to install the body-parser package:

```
npm install body-parser
```

Initialize body-parser like this
```
const bodyParser = require('body-parser');
```

Enable `body-parser` so that our Express app can understand incoming `POST` data:
```
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```
>extended: false → Disallows nested objects in body requests.  
>extended: true → Allows nested objects.

Now that everything is set up, open Postman, select the POST method, then go to Body → x-www-form-urlencoded, and add the following 4 keys with their respective values:

```
id = 86
userId = shahzainahmed86@gmail.com
title = My Post Note
content = This is a POST API Note
```

After sending this data through Postman, you'll see the results like this:

```
{
    "id": "86",
    "userId": "shahzainahmed86@gmail.com",
    "title": "My Post Note",
    "content": "This is a POST API Note"
}
```

So now whole code block would be

```
 app.post('/notes/add', async function (req, res) {
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
```

### Final Code of `server.js`
```
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
        res.send("This is the default page");
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

```
> for GET APIs we use `req.params.id`
> for POST APIs we use `req.body.id` 
