var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955API');

var Schema = mongoose.Schema;

var HumanSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2}
})
mongoose.model('Human', HumanSchema)
var Human = mongoose.model('Human')

app.get('/', function (req, res){
    Human.find({}, function (err, human){
        if(err) {
            console.log("Whoops!", err);
            res.json({message: "ERROR", error: err})
        }
    });
})

app.get('/new/:name/', function (req,res){
    var human = new Human({name: req.params.name})
    human.save(function(err){
        if(err){
            res.json({error: err})
        }
        else
        {
            res.redirect('/')
        }
    });
})

