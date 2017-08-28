const express = require("express");
// you may not need to use method-override, i look into if its professional to use it.
// const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// Database
require("./config/connection");
mongoose.Promise = Promise;

// Requirie the models for the DB here!!!!!



// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// serve 'static' content for the app from the 'public' folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// applying method-override
// app.use(methodOverride('_method'));

//applying handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// allowing routing to be done in another file
const routes = require('./routes/page-routes.js')
app.use('/', routes);



app.listen(PORT, function() {
    console.log("port listening on " + PORT);
});