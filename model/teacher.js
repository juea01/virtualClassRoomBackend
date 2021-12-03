var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeacherSchema = new Schema(
    {
        name: {type: String, requried: true},
        qualification: {type: [String], requried: true},
        email: {type: String, requried: true},
        phone: {type: String, requried: true}
    }
);


TeacherSchema.virtual('url').get(function(){
    return '/teacher/' + this._id;
});

module.exports = mongoose.model('Teacher',TeacherSchema);