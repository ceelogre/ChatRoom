let dbConnection = require('./dbConnection')
let userModel = require('../model/user')

exports.saveUserToDb= function(newUser){

return new Promise((resolve, reject) => {

    let user = new userModel(newUser)
    user.save(function(err, results){
        if(err){
            console.log('Inside DB err', err)
            reject(err);
        }
        else{
            resolve(results)
        }
    })
})
}

exports.authUser = function(credentials){
    return new Promise((resolve, reject) => {
        userModel.find(credentials, function(err, results){
            if(err){
                console.log('Erro auth user', err)
                reject(err)
            }
            else{
                resolve(results)
            }
        })
    })
}