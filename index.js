const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const reggie = require('./');
const Routee = require('./');


const app = express();
app.use(flash());


//database
const pgp = require('pg-promise')({});

const local_database_url = 'postgres://postgres:codex123@localhost:5432/';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
  connectionString
}

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false
  }
}

app.use(session({
  secret: 'this is my longest string that is used to test my registration with routes app for browser',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const db = pgp(config)

// STart your routes here
app.get("/",function(req,res){
  res.render("index")
});

app.get("/sdumo",function(req,res){
res,redirect("/")
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});
