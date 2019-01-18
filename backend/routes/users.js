const express = require('express');
const router = express.Router();
const dbUtils = require('../utils/dbUtils')
const jwt = require('jsonwebtoken')

let serverResponse = {};
let areCredentialsValid = 'false'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res){
  let newUser = req.body.creds;
  let saveUserPromise = dbUtils.saveUserToDb(newUser)
  saveUserPromise.then(
   (dbReponse) => {
    if(dbReponse == 'Exist'){
      serverResponse.AccountSuccessfullyCreated = false;
      serverResponse.isHandleTaken = true
    }

    else{
      serverResponse.AccountSuccessfullyCreated = true
    }
     res.json({serverResponse})
    }
  )
  .catch(
    () => {
     serverResponse.AccountSuccessfullyCreated = false
      res.json({serverResponse})
    }
  )
})

router.post('/signin', function(req, res){
  let user = req.body.creds;
  let word = 'The penny dropped.'
  jwt.verify(user, word, {
    'algorithms': ['HS256']
  }, function(err, decoded){
    if(err){
      throw err;
    }
    else{
      user = decoded.sub
    }
  })
  dbUtils.authUser(user).then(
    (dbReponse) => {
      if(dbReponse == false ){
        serverResponse.areCredentialsValid = false
      }
      else if(dbReponse == true){

        serverResponse.areCredentialsValid = true
        //Create a token
        let payload = {
          user: user.handle
        }
        let uToken = jwt.sign(payload, word, {
          'algorithm': 'HS256'
        })
        serverResponse.uToken = uToken
      }
      //TO DO handle errors incase db response is an array
      res.json({serverResponse})
    }
  )
  .catch(
    () => {
      areCredentialsValid = false;
      res.json(areCredentialsValid)
    }
  )
})

module.exports = router;
