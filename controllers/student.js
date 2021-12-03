var path = require('path');
var Student = require(path.join('..','model','student.js'));

const getStudents = (req,res,next)=>{

    console.log("getstudents entry controller");
    Student.find({}).exec(function(error,students){
        if(error) {
            return next(error);
        }

        res.send(students);
    });  
};


const getStudentByName = (req,res,next)=>{

    if(!(typeof req.params.name === 'undefined')){
        Student.findOne({name: req.params.name}).exec(function(error,student){
            if(error) {
                return next(error);
            }
    
            res.send(student);
        });
    } else {
        return next();
    }
    
    
};

const createStudent = (req,res,next)=>{
    var student = new Student({
        name: req.body.name,
        grade: req.body.grade,
        email: req.body.email,
        phone: req.body.phone
    });

    student.save(function(err){
        if(err){
            return next(err);
        } else {
            res.status(201).json({message: 'Student has been successfully created'});
        }
    });
};

module.exports = {
    getStudents,
    createStudent,
    getStudentByName
};