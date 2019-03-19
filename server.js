const express = require('express');
const app = express();

// logs requests
const logger = require("morgan");

// database
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
// const exphbs = require('handlebars');

app.use(logger("dev"));

// Uses public folder containing logic
app.use(express.static('public'));

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates database if it doesn't exist locally
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrape";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});