// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on note and note name.

const notesData = require('../db/db.json');
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------


  app.get('/api/notes', (req, res) => {
    return res.json(notesData)
  });


  app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4()
    notesData.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2))
    res.json(notesData)
  });


  app.delete('/api/notes/:id', (req, res) => {
    notesData.forEach((note, index) => {
      if (note.id === req.params.id)
        notesData.splice(index, 1)
    })



    fs.writeFileSync("./db/db.json", JSON.stringify(notesData))
    res.json(notesData)
  });




};
