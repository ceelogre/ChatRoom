const mongoose = require('mongoose');
let db = require('../config/key')

let connection = (function(){
    mongoose.connect(db.mongoUri, {useNewUrlParser: true, useCreateIndex: true})
})()

mongoose.connection.once('connected', function(){
    console.log('Connected to db.')
})

mongoose.connection.on('error', () => console.log('Can\'t connect to db.'))

exports.dbConnection = connection;