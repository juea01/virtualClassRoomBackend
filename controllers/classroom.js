var path = require('path');
var ClassRoom = require(path.join('..','model','classroom.js'));
var Timetable = require(path.join('..','model','timetable.js'));
const util = require('util');


const getClassrooms = (req,res,next)=>{

    ClassRoom.find({}).populate('teacher').populate('timeTable').exec(function(error,classrooms){
        if(error) {
            return next(error);
        }

        res.send(classrooms);
    });
    
};

/* const getClassroomByName = (req,res,next)=>{

    if(!(typeof req.params.name === 'undefined')){
        Classroom.findOne({name: req.params.name}).exec(function(error,classroom){
            if(error) {
                return next(error);
            }
    
            res.send(classroom);
        });
    } else {
        return next();
    }
    
    
} */;


const saveTimetable = (req, callback)=> {
    console.log("save time table entry");
    var timetable = new Timetable({
        startTime:  req.body.timeTable.startTime,
        endTime: req.body.timeTable.endTime,
        startDate: req.body.timeTable.startDate,
        endDate: req.body.timeTable.endDate,
        numberOfDaysAWeek: req.body.timeTable.numberOfDaysAWeek
    });

    timetable.save(function(err){
        if(err){
            console.log("Error saving time table"+err);
            return callback(new Error(err),null);
        } else {
           console.log("Time table has been successfully saved");
           return callback(null,timetable);
        }
    });
    
}


const updateTimetable = (req, callback)=> {

    console.log("update time table entry"+req.body.timeTable._id);

    Timetable.findByIdAndUpdate(req.body.timeTable._id,{
        startTime:  req.body.timeTable.startTime,
        endTime: req.body.timeTable.endTime,
        startDate: req.body.timeTable.startDate,
        endDate: req.body.timeTable.endDate,
        numberOfDaysAWeek: req.body.timeTable.numberOfDaysAWeek
    },(function(err,data){
        if(err) {
            console.log(err);
            return callback(new Error(err),null);
        } else {
            console.log(data);
            return callback(null,data);
        }
    }));
    
}

const deleteTimetable = (id, callback)=> {

    console.log("delete time table entry"+id);

    Timetable.deleteOne({_id: id},(function(err){
        if(err) {
            console.log(err);
            return callback(new Error(err),null);
        } else {
            return callback(null,`Time table successfully deleted ${id}`);
        }
    }));
    
}


const findClassRoom = (id, callback) => {
    ClassRoom.findOne({ _id: id}).exec(function(error,classroom){
        if(error) {
            return callback(new Error(error),null);
        } else {
            return callback(null, classroom);
        }
    });
    
}


const saveClassroom = (req, timetable, callback)=> {
    console.log("save class room entry");
    console.log("teacher",req.body.teacher.name);
    var classroom = new ClassRoom({
        timeTable: timetable,
        subject:  req.body.subject,
        category: req.body.category,
        description: req.body.description,
        maxNumberStudents: req.body.maxNumberStudents,
        minNumberStudents: req.body.minNumberStudents,
        teacher: req.body.teacher
    
    });

    classroom.save(function(err, data){
        if(err){
            // return next(err);
            return callback(new Error(err),null);
        } else {
        
            return callback(null,data);
        }
    });
}

const updateClassroom = (req,timetable, callback) => {
   
    ClassRoom.findByIdAndUpdate(req.body._id,{ 
        timeTable: timetable,
        subject:  req.body.subject,
        category: req.body.category,
        description: req.body.description,
        maxNumberStudents: req.body.maxNumberStudents,
        minNumberStudents: req.body.minNumberStudents,
        teacher: req.body.teacher
    },(function(err,data){
        if(err){
            return callback(new Error(err),null);
        } else {

            ClassRoom.findOne({ _id: data._id}).populate('teacher').populate('timeTable').exec(function(error,classroom){
                if(error) {
                    return callback(new Error(err),null);
                }

                return callback(null,classroom);
            });
            
        }
    }));
}


const saveTimetablePromise = util.promisify(saveTimetable);
const saveClassroomPromise = util.promisify(saveClassroom);

const updateTimetablePromise = util.promisify(updateTimetable);
const updateClassroomPromise = util.promisify(updateClassroom);

const deleteTimetablePromise = util.promisify(deleteTimetable);
const findClassRoomPromise = util.promisify(findClassRoom);


const createClassroom = (req,res,next) => {
    createroom(req,res,next);
}

const updateRoom = (req,res,next) => {
    updateRoomAsync(req,res,next);
} 

const updateRoomAsync = async(req, res, next) => {
    try {
        console.log("Entry to updateRoomAsync");
        const updatedTimetable = await updateTimetablePromise(req);
        console.log("time table updated"+updatedTimetable._id);
        const updatedClassroom = await updateClassroomPromise(req, updatedTimetable);
        console.log("Class room updated"+updatedClassroom._id);
        res.status(201).json(updatedClassroom);
    } catch (error) {
        return next(error);
    }
}



const deleteRoom = (req, res, next) => {
    deleteRoomAsync(req, res, next);
}

const deleteRoomAsync = async(req, res, next) => {
    try {
        console.log("Entry to deleteRoomAsync");
        const classroom = await findClassRoomPromise(req.params.id);
        const deletedTimetable = await deleteTimetablePromise(classroom.timeTable._id);
        console.log(deletedTimetable);
         ClassRoom.deleteOne({_id: req.params.id},(function(err){
            if(err) {
                console.log(err);
                return next(error);
            } else {
                
                res.status(201).json(`Classroom ${req.params.id} has been successfully deleted`);
            }
        }));
      
    } catch(error){
        return next(error)
    }
}

const createroom = async(req,res,next) =>{
    try {
        const timetable = await saveTimetablePromise(req);
        const message = await saveClassroomPromise(req, timetable);
        //console.log("message"+message);
        //res.status(201).json(message);
        ClassRoom.findOne({ _id: message._id}).populate('teacher').populate('timeTable').exec(function(error,classroom){
            if(error) {
                return next(error);
            }
    
            res.status(201).json(classroom);
           //return callback(null,classroom);
        });
       
    } catch (error) {
        return next(error);
    }
}




/* const createClassroom = (req,res,next) => {
    res.status(201).json({message: 'Classroom has been successfully created'});
} */

module.exports = {
    getClassrooms,
    createClassroom,
    updateRoom,
    deleteRoom
    //getClassroomByName
};