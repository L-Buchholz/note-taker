// Use "fs" module to store and retrieve notes
const fs = require("fs/promises");
const express = require("express");
const path = require("path");

//const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

/* 
IF NEEDED: Import custom middleware, "cLog" 
app.use(clog);
*/

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", api);

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
