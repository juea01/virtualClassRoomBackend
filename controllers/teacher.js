var path = require('path');
var Teacher = require(path.join('..','model','teacher.js'));

const getTeachers = (req,res,next)=>{

    Teacher.find({}).exec(function(error,teachers){
        if(error) {
            return next(error);
        }

        res.send(teachers);
    });
    
};

const getTeacherByName = (req,res,next)=>{

    if(!(typeof req.params.name === 'undefined')){
        Teacher.findOne({name: req.params.name}).exec(function(error,teacher){
            if(error) {
                return next(error);
            }
    
            res.send(teacher);
        });
    } else {
        return next();
    }
    
    
};

const createTeacher = (req,res,next)=>{
    var teacher = new Teacher({
        name: req.body.name,
        qualification: req.body.qualification,
        email: req.body.email,
        phone: req.body.phone
    });

    teacher.save(function(err){
        if(err){
            return next(err);
        } else {
            res.status(201).json({message: 'Teacher has been successfully created'});
        }
    });
};

module.exports = {
    getTeachers,
    createTeacher,
    getTeacherByName
};