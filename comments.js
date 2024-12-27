// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Use bodyParser to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Respond with comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Add a comment
app.post('/comments', function(req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments), 'utf8');
  res.json(newComment);
});

// Start the server
app.listen(3000);
console.log('Server is listening on port 3000');