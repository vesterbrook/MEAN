var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/angular/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/AuthorQuote');

var Schema = mongoose.Schema;

var NameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must have more than 3 characters!"]
    }
}, {timestamps:true});

mongoose.model('Name', NameSchema);
var Name = mongoose.model('Name');

// START OF ROUTES
app.get('/api/authors', function(req, res){
    Name.find({}, function(err, authors){
        console.log('getting authors!')
        if(err){
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message:"Success", authors: authors})
        }
    })

}),

app.get('/api/author/:id', function(req, res){
    Name.findOne({_id: req.params.id}, function(err, id){
        if(err){
            console.log("One author back");
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", id: id}) 
        }

    })
}),

app.post('/api/addAuthor/', function(req, res){
var author = new Name(req.body);
author.save(function(err){
    if(err){
        console.log("suzanne is pretty");
        res.json({message: "Error", error: author.err})
    }
    else {
        res.json({message: "Added Authors"})
    }
})
}),
app.put('/api/author/:id', function(req, res){
    console.log("Edit task Back")
    Name.findByIdAndUpdate({_id: req.params.id},
    req.body, {new: true}, function(err, author){
        if(err){
            console.log("edit error back")
            res.json({message: "Error", error: err})
        }
        else{
            console.log("update/edit back")
            res.json({message: "Successful update", author: author})
        }
    })

}),
app.delete('/api/author/:id', function(req, res){
    Name.remove({_id: req.params.id}, function(err){
        if(err) {
            console.log("Delete back")
            res.json({message: "error", error: err})
        }
        else {
            res.json({message: "successful delete back"})
        }
    
    });
});




// END OF ROUTES

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
});

var server = app.listen(8000, function() {
    console.log("Listening on port 8000!");
});
