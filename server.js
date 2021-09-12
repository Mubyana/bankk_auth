var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
//const users = require('./mongoose/user');
const uuidv4 = require('uuid/v4');
const cors = require('cors');


var app = express();


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({credentials: true, origin: true}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var connection_url = "";
//var url ="mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate-mongo?retryWrites=true&w=majority";
var server;
//var server = require('./app');
//var port = 32s00;
// Connect to the db 
var connection_url = "169.57.56.202:30659";
//
var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";
MongoClient.connect(url , function(err, mongoclient) {
  if(err) {
    console.log("Mongo DB connection failed");
    return console.dir(err);
  }
  console.log("Mongo DB connection successful");


});

app.post('/api/user/create', function (req, res) {

    //var url = 'mongodb://localhost:27017/HippoFeedo';
  var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";


  MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

  var database = mongoclient.db("innovate");
  var collection;

   collection = database.collection('users');
   
   collection.findOne({ email: req.body.email, password: req.body.password }, function(err, user){
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
            return;
        }
         
         if(user) {
            console.log("Found: " + req.body.email + ", pass=" + req.body.password);
            res.status(500).send({'err': 'Seems like you already have an account with us. Please log in instead, or contact support to recover regain to your account.'});
            return;
        } 

        var uuid = uuidv4();
        var newUser = [{
            uuid: uuid,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            eid: req.body.eid,
            password: req.body.password
        }
        ];


        collection.insertMany(newUser, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
                return;
            }
            console.log("User created");
            res.status(200).send(newUser);
        });

      
    });

    });

 });



app.post('/api/user/authenticate', function (req, res) {

var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";

  MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

  var database = mongoclient.db("innovate");
  var collection;

   collection = database.collection('users');
   
   collection.findOne({ email: req.body.email, password: req.body.password }, function(err, user){
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
            return;
        }
         
        if (!user) {
          res.status(500).send({'err': `Your username & password are incorrect. Try again, or contact support to recover lost login details. `});
          return;
        }

         res.status(200).send(user);

        });
    });

});

app.get('/api/user/get', function(req, res) {

  var url = "mongodb+srv://admin:admin@cluster0.7mgnx.mongodb.net/innovate?retryWrites=true&w=majority";


  MongoClient.connect(url, function(err, mongoclient) {
    if(err) {
      console.log("Mongo DB connection failed");
      return console.dir(err);
    }

  var database = mongoclient.db("innovate");
  var collection;

  collection = database.collection('users');
   
  collection.findOne({}, function(err, users){
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
            return;
        }
      if (!users) {
            res.status(500).send({'err': 'No Users Found'});
            return;
        }
        res.status(200).send(users);
        });
    });
});


app.get('/', function (req, res) {
    res.end( "Rest API implementation for Microservice Authentication" );
});

//var port = 8080;
var port = 3200;


var server = app.listen(port, function () {
  console.log("Authentication service listening on " + port);
});

