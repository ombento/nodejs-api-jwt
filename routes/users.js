var express = require('express');
var router = express.Router();
var check = require('../mod_auth/auth_jwt');
/* GET users listing. */
router.get('/', function(req, res, next) {
 
  let tes = req.headers.authorization;
  TokenArray = tes.split(" ");
  tokens = TokenArray[1];

  check.validateAuth(tokens).then((resp) => {
      if(resp == req.user.firstname){ 
  console.log('user ' + req.user.firstname + ' is calling /api/profile');
  res.json({
    name: req.user.firstname
  });}else{
    console.log('token ilang  '); 
    res.json({
    
      name: "token habis"
    });
  }
  });
});


// });

// router.get('/tes', function(req, res, next) {
//   res.send('tes');

module.exports = router;
