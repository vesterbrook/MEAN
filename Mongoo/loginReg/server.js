var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var path = require('path');

app.use(express.static(path.join(__dirname + "/static")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'thorisHot'}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/loginReg');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    
    first: {
        type: String,
        required: [true, "Must be a person!"],
        minlength: [2, "Must be longer than 2"],
        trim: true,
        validate: {
            validator: function(first){
                return /^[a-z ,.'-]+$/i.test(fname);
        },
            message:"First name cannot contain weird things"
         }    
     },
    last: {
        type: String,
        required: [true, "Must be a person"],
        minlength: [2, "Needs to be longer than 2"],
        trim: true,
        validate: {
            validator: function(last){
                return /^[a-z ,.'-]+$/i.test(fname);
            },
            message: "Last name cannot contain weird things"
        }
},
    
    password: {
        type: String,
        required: [true, "Password must be filled out"],
        minlength: [8, "Password must be longer than 8"],
        validate: {
            validator: function(pw){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(pw);
            },
            message: "Password needs one of each: upper, number, and special character"
        }
    }, 
    
    birthday: {
        type: Date,
        required: [true, "no presents for you"],
        validate: {
            validator: function(bday){
                return bday.getTime() < new Date().getTime();
            },
            message: "You really aren't getting presents"
        }
    },
})

    
mongoose.model('User', UserSchema);
var User = mongoose.model('User');



app.get('/', function (req, res){
    if(req.session.userid){
        res.redirect("/success")
    }
    else {
        res.render("index");

    }
    
});

app.post('/registerUser', function (req, res){

    var user = new User({
        first: req.body.first,
        last: req.body.last, 
        email: req.body.email,
        birthday: req.body.birthday, password: req.body.password})
    user.save(function(err){
        if(err){
            console.log('Whoops');
            User.find({}).exec(function(err){
                if(err) throw err;
                res.render("index", {errors: user.errors})
            })
        }
            else {
                console.log('successfully registered!');
                res.redirect("/success")

            }
        }
    })
}

app.post('/loginUser', function (req, res){

})

app.post('/logout', function (req, res){

})


app.listen(8000, function(){
    console.log("listening on port 8000");
})