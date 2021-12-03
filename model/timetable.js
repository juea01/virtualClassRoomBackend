var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TimetableSchema = new Schema({
    startTime:  {type: String, required: true},
    endTime: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    numberOfDaysAWeek: {type: [String], required: true}

});

 TimetableSchema.virtual('url').get(function(){
    return '/timetable/' + this._id;
});

module.exports = mongoose.model('Timetable',TimetableSchema);