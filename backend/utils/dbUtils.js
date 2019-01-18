const dbConnection = require('./dbConnection')
const userModel = require('../model/user')
const bcrypt = require('bcrypt')

exports.saveUserToDb= function(newUser){

return new Promise((resolve, reject) => {

    //Check if the user exist
    let query = userModel.find({'handle': newUser.handle})

    query.select('handle')
    query.exec(function(err, results){
        if(err)
          reject(err)
        else{
            //Username already exists
            if(results.length != 0){
                resolve('Exist')
            }
            else{
                //Encrypt the password
                let salt = bcrypt.genSaltSync()
                let hash = bcrypt.hashSync(newUser.key, salt)
                newUser.key = hash;

                let user = new userModel(newUser)
                user.save(function(err, results){
                    if(err){
                        console.log('Create user err', err)
                        reject(err);
                    }
                    else{
                        resolve(results)
                    }
                })

            }
        }
    })
})
}

exports.authUser = function(credentials){
    return new Promise((resolve, reject) => {

        let query = userModel.find({'handle': credentials.handle})
        query.select('key')

        query.exec(function(err, results){
            if(err){
                console.log('Erro auth user', err)
                reject(err)
            }
            else{
                //The username is valid, validate the password
                if(results.length != 0){
                   bcrypt.compare(credentials.key, results[0].key, function(err, results){
                       if(err){
                           console.log('Bcrypt', err)
                           reject(err)
                       }
                       resolve(results)
                   }) 
                }
                //Username is invalid
                else{
                    resolve(false)
                }
            }
        })
    })
}