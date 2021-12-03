var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
    {
        name: {type: String, requried: true},
        grade: {type: String, requried: true},
        email: {type: String, requried: true},
        phone: {type: String, requried: true}
    }
);

StudentSchema.virtual('url').get(function(){
    return '/student/' + this._id;
});

module.exports = mongoose.model('Student',StudentSchema);