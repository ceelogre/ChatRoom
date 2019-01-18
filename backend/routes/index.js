const express = require('express');
const router = express.Router();
const msgsUtils = require('../utils/chatUtils')

let serverResponse = {}
/* GET home page. */
router.get('/foo', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res){
  msgsUtils.getAllMessages().then(
    (dbResponse) => {
      serverResponse.chats = dbResponse
  res.json({serverResponse});
    }
  )
  .catch(
    (error) => {
      console.log(error)
      serverResponse.errorRetrievingMsgs = true
  res.json({serverResponse});
    }
  )
});
module.exports = router;
