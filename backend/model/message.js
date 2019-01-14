const mongoose = require('mongoose')
let Schema = mongoose.Schema;

messageSchema = new Schema({
    text: String,
    postedBy: String,
    postedAt: {type: Date, default: Date.now}
})

let messageModel = new mongoose.model('message', messageSchema);

module.exports= messageModel;