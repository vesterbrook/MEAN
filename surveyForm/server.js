var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var session = require('express-session');
var path = require('path');

app.use(express.static(path.join(__dirname + "/static")));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({secret: 'thorisHot'}));

app.set('views',path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index")
});

app.post('/results', function (req, res){

    let results = {
        name : req.body.name,
        location : req.body.location,
        language : req.body.language,
        comment : req.body.comment
    }

    res.render('results', {results : results})
})


app.listen(8000, function(){console.log("Listening on port 8000");})