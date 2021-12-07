var path = require('path');
var StudentClassRoom = require(path.join('..','model','studentclassroom.js'));


const getStudentClassrooms = (req,res,next)=>{

    StudentClassRoom.find({}).populate('student').populate('classroom').exec(function(error,studentclassrooms){
        if(error) {
            return next(error);
        }

        res.send(studentclassrooms);
    });
    
};


const createStudentClassroom = (req,res,next) => {
    var studentClassroom = new StudentClassRoom({
        student:  req.body.student,
        classroom: req.body.classroom,
        adminDecision: req.body.adminDecision,
    });

    studentClassroom.save(function(err,data){
        if(err){
            return next(err);
        } else {
           // data.populate('student').execPopulate();
            //data.populate('classroom').execPopulate();

            StudentClassRoom.findOne({student: data.student, classroom: data.classroom}).populate('student').populate('classroom').exec(function(error,studentclassrooms){
                if(error) {
                    return next(error);
                }
        
                res.status(201).json(studentclassrooms);
            });
            
        }
    });
}


const updateStudentClassroom = (req,res,next) => {
   

    StudentClassRoom.findByIdAndUpdate(req.body._id,{ adminDecision: req.body.adminDecision},(function(err,data){
        if(err){
            return next(err);
        } else {
           // data.populate('student').execPopulate();
            //data.populate('classroom').execPopulate();

            StudentClassRoom.findOne({_id: req.body._id}).populate('student').populate('classroom').exec(function(error,studentclassrooms){
                if(error) {
                    return next(error);
                }
        
                res.status(200).json(studentclassrooms);
            });
            
        }
    }));
}






/* const createClassroom = (req,res,next) => {
    res.status(201).json({message: 'Classroom has been successfully created'});
} */

module.exports = {
    getStudentClassrooms,
    createStudentClassroom,
    updateStudentClassroom
    //getClassroomByName
};