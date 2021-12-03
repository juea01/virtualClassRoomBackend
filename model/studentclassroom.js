var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StudentClassroomSchema = new Schema({
    classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
    student: {type: Schema.Types.ObjectId, ref: 'Student'},
    adminDecision: {type: String, required: true}

});



StudentClassroomSchema.virtual('url').get(function(){
    return '/studentclassroom/' + this._id;
});

module.exports = mongoose.model('StudentClassroom',StudentClassroomSchema);