## Setting up -> NodeJS, NPM, ExpressJS to Create a Server

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
