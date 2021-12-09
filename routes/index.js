const express = require("express");

// Import modular router for editing notes
const editNotes = require("../db/editNotes");

const app = express();

app.use("/notes", editNotes);

module.exports = app;
