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
