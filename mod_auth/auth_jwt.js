var express = require('express');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
//var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var router = express.Router();

var secretKey = 'benibeni';

let validateAuth = (tokens)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(tokens,secretKey,function(err,token){
            if(err){
                reject(err);
                console.log(err);
            }else{
                resolve(token.firstname);
                console.log(token);
                console.log("masuk pak eko");
            }
          });
    });
}

module.exports = {
    validateAuth
}