var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(express.static(__dirname+ "/static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'Thorishot'})); 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){


    res.render("")
    
});
    
    app.post()




























        app.listen(8000, function() {
        })
        console.log("listening on 8000"); 