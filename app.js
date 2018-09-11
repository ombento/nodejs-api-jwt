var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

//Routing
var routes = require('./routes/index');
var users = require('./routes/users');
var Tasks=require('./routes/Tasks');
var auths=require('./routes/auth');
var Students=require('./routes/Students');
var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));
var secret = 'benibeni';
app.use('/api', expressJwt({secret: secret}));


app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});



// app.get('/api/profile', function (req, res) {
//   //var token = req.body.token || req.query.token || req.headers['token'];
//   //console.log(JSON.stringify(req.headers.authorization));
//   let tes = req.headers.authorization;
//   TokenArray = tes.split(" ");
//   tokens = TokenArray[1];
//   // console.log(TokenArray[1]); 
//   //    res.json({
    
//   //     name: TokenArray[1]
//   //   });
//   if(tokens){ 
//   console.log('user ' + req.user.firstname + ' is calling /api/profile');
//   res.json({
//     name: req.user.firstname
//   });}else{
//     console.log('token ilang  '); 
//     res.json({
    
//       tes: "token ilang"
//     });
//   }

// });

//RESTful route modul
app.use('/api', routes);
app.use('/auth', auths);
app.use('/api/users', users);
app.use('/api/Tasks',Tasks);
app.use('/api/Students',Students);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(8989, function () {

  console.log("Listening to port %s", server.address().port);

});


module.exports = app;
//module.exports = expressJwt;
