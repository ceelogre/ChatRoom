const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    handle: {type: String, unique: true},
    key: String,
    availabilityStatus: {type: String, default: 'Offline'}
})

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;
//exports.userModel = userModel; there's a difference!