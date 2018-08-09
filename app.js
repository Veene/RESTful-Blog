var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created: {type:Date, default:Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title:"Test Blog",
//     image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4800ae89e3ae4ae91bf6aa92c815d98e&auto=format&fit=crop&w=500&q=60",
//     body: "HELLO THIS IS A BLOG POST!"
// });

// RESTFUL ROUTES
app.get('/', function(req, res){
    res.redirect('/blogs');
});

//INDEX
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('ERROR');
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});        
            
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});


// CREATE ROUTE
app.post('/blogs', function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new.ejs');
        } else {
            //then, redirect to the index
            res.redirect('/blogs');
        }
    });
});

//SHOW ROUTE
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit.ejs', {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
    res.send("Update Route!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});