var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var session = require('express-session');
var path = require('path');

app.use(express.static(path.join(__dirname + "/static")));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({secret: 'thorisHot'}));

app.set('views',path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

app.get('/', function(req, res){
    User.find({}, function(err, users){

    res.render("index", {users: users})
    })
});

app.post('/users', function(req, res){
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err) {
        if(err) {
            console.log('something went wrong');
        } else {
            console.log('successfully added a user!');
            res.redirect('/')
        }
    })
})

app.listen(8000, function(){
    console.log("listening on port 8000");
})