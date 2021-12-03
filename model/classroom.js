var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClassroomSchema = new Schema({
    timeTable: {type: Schema.Types.ObjectId, ref: 'Timetable'},
    subject:  {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    maxNumberStudents: {type: Number, required: true},
    minNumberStudents: {type: Number, required: true},
    teacher: {type: Schema.Types.ObjectId, ref: 'Teacher'}

});



ClassroomSchema.virtual('url').get(function(){
    return '/classroom/' + this._id;
});

module.exports = mongoose.model('Classroom',ClassroomSchema);