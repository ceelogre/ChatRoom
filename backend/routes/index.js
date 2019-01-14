var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/handshake', function(req, res){
  res.json({'Magic': 'No'});
});
module.exports = router;
