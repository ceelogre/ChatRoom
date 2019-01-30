require('./dbConnection')
let messageModel = require('../model/message').messageModel

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

exports.getAllMessages = function(){
    return new Promise((resolve, reject) => {
        let allMessagesQuery = messageModel.find()
        allMessagesQuery.select('-_id')
        allMessagesQuery.limit(20)
        allMessagesQuery.exec(function(err, results){
            if(err)
              reject(err)
            else{
                resolve(results)
            }
        })
})
}