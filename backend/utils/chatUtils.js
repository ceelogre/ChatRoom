let dbConnection = require('./dbConnection')
let messageModel = require('../model/message')

exports.saveMessage = function(msg){

    return new Promise((resolve, reject) => {
        let newMessage = new messageModel(msg)
        newMessage.save(msg, function(err, results){
            if(err){
                console.log('Msg error ', err)
                reject(err)
            }
            else{
                resolve(results)
            }
        })
    })

}