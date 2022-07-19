const express = require('express');
const path = require('path');
const safeEval = require('safe-eval'); // To avoid very XSS vulnerable eval() function

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use("/public", express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to UI
app.get("/", (req, res) => {
  res.render('index.ejs');
});

// Endpoint for calculating the result and sending a JSON response
app.get("/calculus", (req, res) => {
  // Try to calculate result from query, catch error
  try {
    // Converts Base64 query into ascii string
    var query = Buffer.from(req.query.query, 'base64').toString('ascii');
    // Check for any invalid characters
    if(!(/[0-9 +\-()*/]/g).test(query) || (/['"]+/g).test(query))
      return res.json({ error: true, message: "String can only include numbers and the symbols + - * / ( )" });
    // Use safe-eval to calculate query
    var result = safeEval(query);
  } catch (error) {
    // Send error in JSON response
    return res.json({ error: true, message: error.toString() });
  }
  // Send JSON result
  res.json({ error: false, result: result });
});

// Post for GUI
app.post("/", (req, res) => {
  // Convert input into base64
  const input = Buffer.from(req.body.query).toString('base64');
  // Redirect to
  res.redirect('/calculus?query='+input);
});

// catch 404
app.use(function(req, res) {
  res.status(404).send("Page not found.");
});

// Start server on port 3000
let server = app.listen(3000, () => {
  console.log('Listening', server.address().port)
});

module.exports = app;
