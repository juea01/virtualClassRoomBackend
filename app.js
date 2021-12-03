const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


// req => middle-ware => res
app.use(express.urlencoded({extended: false})); //for parsing form data
app.use(express.json()); //for parsing json body
app.use(morgan('tiny'));  //morgan for logging
app.use(cors());


const logger = require(path.join(__dirname,'logger.js'));
const authorize = require(path.join(__dirname,'authorize.js'));
const student = require(path.join(__dirname,'routes','student.js'));
const teacher = require(path.join(__dirname,'routes','teacher.js'));
const login = require(path.join(__dirname,'routes','login.js'));
const classroom = require(path.join(__dirname,'routes','classroom.js'));
const studentclassroom = require(path.join(__dirname,'routes','studentclassroom.js'));

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hjk9s.mongodb.net/virtual_classroom?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
//mongoose.set('debug',true);
db.on('error',console.error.bind(console, 'MongoDB connection error:'));

//app.use('/api',logger, authorize);
app.use('/students', student);
app.use('/teachers', teacher);
app.use('login', login);
app.use('/classrooms', classroom);
app.use('/studentclassrooms',studentclassroom);


app.get('/',(req,res)=>{
    res.send("Home");
});

app.get('/about',(req,res)=>{
    res.send("About");
});




app.post('/login',(req,res)=>{
    const {name} = req.body;

    if(!name) {
        return res.status(400).json({success:false, msg:'please enter name'});
    } else {
        return res.status(201).json({success:true, person:name});
    }
});



app.listen(5000,()=>{
    console.log('Server is listening on port 5000');
});