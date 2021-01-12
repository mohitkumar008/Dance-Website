const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb+srv://thanos:thanos123@cluster0.kdg9t.mongodb.net/<dbname>?retryWrites=true&w=majority/test', {
    useNewUrlParser: true,
});

const port = 8000;

//Define Mongoose Schema 
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    yourself: String
});

const Contact = mongoose.model('Contact', contactSchema);



//EXPRESS RELATED STUFF
app.use('/static', express.static('static')) //for using static files
app.use(express.urlencoded())

// PUG RELATED STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const gymForm = {}
    res.status(200).render('home.pug', gymForm);
});

app.get('/contact', (req, res) => {
    const gymForm = {}
    res.status(200).render('contact.pug', gymForm);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("This item is saved into the database")
    }).catch(()=> {
        res.status(404).render("Item not saved");
    });
});


//SERVER START
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});