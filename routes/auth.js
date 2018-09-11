var express = require('express');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
//var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var router = express.Router();

var secret = 'benibeni';
//var login = router.route('/login', expressJwt({ secret: secret }));


router.post('/login', function(req, res) {
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    console.log('failed login');
    return;
  }
  console.log('successful login');
  // We are sending the profile inside the token
  var token = jwt.sign({ firstname: req.body.username}, secret, { expiresIn: 5 * 60 });
  res.json({ token: token });
});



module.exports = router;