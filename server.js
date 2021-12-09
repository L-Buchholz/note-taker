// Use "fs" module to store and retrieve notes
const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const editNotes = require("./db/editNotes");

const PORT = process.env.PORT || 3001;

// Same as saying: const app = require("express").Router;
const app = express();

//Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enables CSS and JS to apply to public-facing HTML document
app.use(express.static("public"));

app.use("/api", editNotes);

// Assigning functions to api string
// Create (add) a note, retrieve (get) all notes, update a note, delete a note:
app.get("/", editNotes);
app.post("/", editNotes);

// GET Route for notes page: `GET /notes` should return the `notes.html` file.
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for homepage: `GET *` should return the `index.html` file.
// "*" will override any other GET requests, so needs to be listed last
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
