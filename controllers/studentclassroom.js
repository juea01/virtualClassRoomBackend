var path = require('path');
var StudentClassroom = require(path.join('..','model','studentclassroom.js'));


const getStudentClassrooms = (req,res,next)=>{

    StudentClassroom.find({}).exec(function(error,studentclassrooms){
        if(error) {
            return next(error);
        }

        res.send(studentclassrooms);
    });
    
};


const createStudentClassroom = (req,res,next) => {
    var studentClassroom = new StudentClassroom({
        student:  req.body.student,
        classroom: req.body.classroom,
        adminDecision: req.body.adminDecision,
    });

    studentClassroom.save(function(err){
        if(err){
            return next(err);
        } else {
            res.status(201).json({message:'StudentClassroom has been successfully created'});
        }
    });
}




/* const createClassroom = (req,res,next) => {
    res.status(201).json({message: 'Classroom has been successfully created'});
} */

module.exports = {
    getStudentClassrooms,
    createStudentClassroom
    //getClassroomByName
};