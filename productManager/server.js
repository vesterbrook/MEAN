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

mongoose.connect('mongodb://localhost/SchemaName');

var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, "Title must have more than 3 characters!"]
    },
    price: {
        type: Number,
        // min: [0, "What did the penny say to the other penny"],
        // validator: function (price) {
        //     return /^[a-z ,.'-]+$/i.test(price);
        // },
        // message: "price can only contain two decimals",
        required: true,
    },
    image: {
        type: String
    }
}, {timestamps:true});

mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');

// START OF ROUTES
app.get('/api/products', function(req, res){
    Product.find({}, function(err, products){
        console.log('getting products')
        if(err){
            res.json({message: "error", error: err})
        }
        else {
            res.json({message:"success", products: products})
        }
    })
}),

app.get('/api/viewProduct/:id', function(req, res){
    Product.findOne({_id: req.params.id}, function(err, product){
        if(err){
            console.log("Single product back");
            res.json({message: "error", error: err})
        }
        else {
            res.json({message: "success", product: product}) //product is the object that we pull. Used to bring in values for the edit form same as name on line 53. product is the object key that we pass into our edit component in the ngonit for line 26
        }
    })
}),

app.post('/api/addProduct/', function(req, res){
    var product = new Product(req.body); //second product matches schema name. First one is whatever I want to name it
    product.save(function(err){ //product from product.save comes from the variable
        if(err){
            console.log("added prod back error");
            res.json({message: "error", error: product.err}) //product comes from potential error from the "new Product"
        }
        else {
            res.json({message: "added authors back"})
        }

    })
}),
app.put('/api/editProduct/:id', function(req, res){
    console.log("Edit product back")
    Product.findByIdAndUpdate({_id: req.params.id},
    req.body, {new: true}, function(err, product){
        if(err){
            console.log("edit error back")
            res.json({message: "error", error: err})
        }
        else {
            console.log("update/edit back")
            res.json({message: "success update", product: product})
        }
    })
}),
app.delete('/api/deleteProduct/:id', function(req, res){
    Product.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("delete back error")
            res.json({message: "error", error: err})
        }
        else{
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
