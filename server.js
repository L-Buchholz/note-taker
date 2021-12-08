// Use "fs" module to store and retrieve notes
const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const { getNotes, addNote } = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

//Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", getNotes);
app.post("/api/notes", addNote);

// Enables CSS and JS to apply to public-facing HTML document
app.use(express.static("public"));

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
