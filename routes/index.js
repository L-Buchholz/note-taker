/*
## Create the following API routes:

- `GET /api/notes` should read the `db.json` file and 
return all saved notes as JSON.

- `POST /api/notes` should receive a new note to 
save on the request body, add it to the `db.json` 
file, and then return the new note to the client.

```
You'll need to find a way to give each note a 
unique id when it's saved (look into npm packages 
  that could do this for you).
```

*/

const fs = require("fs");
const fsp = require("fs/promises");

// fsp.readFile("filePath", "utf8").then((contents) => {});

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

function getNotes(req, res) {}

function addNote(req, res) {}

module.exports = { getNotes, addNote };
