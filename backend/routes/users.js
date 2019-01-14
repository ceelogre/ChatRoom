let express = require('express');
let router = express.Router();
let dbUtils = require('../utils/dbUtils')
let accountSuccessfullyCreated = 'false', areCredentialsValid = 'false'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res){
  let newUser = req.body.creds;
  let saveUserPromise = dbUtils.saveUserToDb(newUser)
  saveUserPromise.then(
   () => {
     accountSuccessfullyCreated = true
     res.json({accountSuccessfullyCreated})
    }
  )
  .catch(
    () => {
     accountSuccessfullyCreated = false
      res.json({accountSuccessfullyCreated})
    }
  )
})

router.post('/signin', function(req, res){
  let user = req.body.creds;
  dbUtils.authUser(user).then(
    (dbReponse) => {
      if(dbReponse.length == 0 ){
        areCredentialsValid = false
      }
      else
        areCredentialsValid = true
      res.json({areCredentialsValid})
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
