const editNotes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  writeToFile,
  readAndAppend,
  readFromFile,
} = require("../routes/utils.js");

// GET Route for retrieving all the notes
editNotes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
// Testing the function with a console.log
console.log(editNotes.get);
console.log("Retrieving notes worked!");

// POST Route for submitting a new note
editNotes.post("/notes", (req, res) => {
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in creating note");
  }
});
// Testing the function with a console.log
console.log(editNotes.post);
console.log("Submitting a new note worked!");

// GET Route for a specific note
editNotes.get("/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});
// Testing the function with a console.log
console.log("Retrieving a specific note worked!");

// DELETE Route for a specific note
editNotes.delete("/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);
      // Save that array to the filesystem
      writeToFile("./db/db.json", result);
      if (result.length === json.length) {
        // Respond to the DELETE request
        res.json(`Note ${noteId} has been deleted 🗑️`);
      } else {
        res.json("Note ID does not exist");
      }
    });
});
// Testing the function with a console.log
console.log(editNotes.delete);
console.log("Deleting a specific note worked!");

module.exports = editNotes;
