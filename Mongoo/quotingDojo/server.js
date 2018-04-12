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

mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.Promise = global.Promise;

var quotingSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 2},
    date: {type: Date, default: Date.now}
})
mongoose.model('Quote', quotingSchema);
var Quote = mongoose.model('Quote')

app.get('/', function(res, res){
    res.render("index");
})

app.post('/quotes', function(req, res){
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err){
        if(err){
            console.log('something went wrong');
            Quote.find({}).exec(function(err, quotes){
                if(err) throw err;
                res.render("index", {"quotes": quotes, errors: quote.errors})
            })
        } else {
            console.log('successfully added a quote!');
            res.redirect('/viewQuotes')
        }
    })
})

app.get('/viewQuotes', function(req, res){
    Quote.find({}).sort({date: -1}).exec(function(err, quotes){
        if(err) throw err;
        res.render("quotes", {quotes : quotes})
    })
})

app.listen(8000, function(){
    console.log("listening on port 8000");
})