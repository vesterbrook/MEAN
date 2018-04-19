var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.json());
app.use(express.static( __dirname + '/angular/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restfultaskAPI');

var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type:String},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

})

mongoose.model('Task', TaskSchema)
var Task = mongoose.model('Task')

// app.get('/', function(req, res){
//     res.render("index")
// })

app.get('/', function(req, res){
    Task.find({}, function (err, tasks){
        if(err){
            console.log("Whoops")
            res.json({Message: "whatever", err: err })

        }
        else {
            res.json({Message: "Success", tasks: tasks})
        }
    })

})

app.get('/viewTask/:id', function(req, res){
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err){
            
            res.json({Message: "whatever", err: err})
        }
        else {
            res.json({Message: "Success", task: task})
        }
    })
})

app.post('/createTask', function (req, res){
    var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed})
    task.save(function(err, task){
        if(err) {
            console.log("whoops")
            res.json({Message: "whatever", err: err})
        }
        else {
            res.json({Message: "Success", task: task})
        }
    })
})

app.put('/updateTask/:id', function(req, res){
    var task = Task.update({_id: req.params.id}, {title: req.body.title, description: req.body.description, completed: req.body.completed}, function(err, tasks){
        if(err){
            console.log("whoops")
            res.json({Message: "whatever", err: err})
        }
        else{
            res.json({Message: "Success", tasks: tasks})
        }
    })
})

app.delete('/deleteTask/:id', function (req, res){
    Task.remove({_id: req.params.id}, function(err, tasks){
        if(err){
            console.log("whoops")
            res.json({Message: "dumb", err: err})
        }
        else {
            res.json({Message: "Success", tasks, tasks})
        }
    })
})


app.listen(8000, function(){
    console.log("listening on port 8000");
})