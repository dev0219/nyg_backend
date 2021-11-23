"use strict";
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
  successResponse
} = require("../helpers/apiResponses");
const jwt = require("jsonwebtoken")
require('dotenv').config();
const jwtKey = process.env.JWTKEY
const jwtExpirySeconds = process.env.JWTEXPIRYSECONDS




const register = async (req, res) => {
  try {
    const data = req.body;
    const {username, password} = req.body;
    const user = await User.findOne({ 'username': req.body.username});
    if(user){
      successResponse(res,'This user does exist already!')
      return false;
    }
    const userinfo = new User(data);
    await bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(userinfo.password, salt, function(err, hash){
            if(err)    console.log(err);
            userinfo.password = hash;
            const response =  userinfo.save();
            if (response) {
                const _token = jwt.sign({ username }, jwtKey, {
                  algorithm: "HS256",
                  expiresIn: jwtExpirySeconds,
                })
                const role = userinfo.role;
                const name = userinfo.username;
                const data = {_token, role,name}
                successResponseWithData(res, "Register Successful", data);                
            } else {
              throw new Error("Error in creating machine order");
            }
        });
    });
    
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

const welcome = (req, res, next) => {

  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
      var data = {
          error: true,
          message: "You need to login first...",
      };
      return res.status(200).json(data);
  } else {
      if (token.startsWith("Bearer ")) {
          var payload;

          try {
              token = token.split(" ")[1];
              payload = jwt.verify(token, jwtKey);
              // console.log(payload);
              req.userid = payload.userid
              next();
          } catch (e) {
              console.log(e.message);
              if (e instanceof jwt.JsonWebTokenError) {
                  successResponse(res, true, {
                      message: {
                          msg: e.message,
                      }
                  })
              }
              else {
                  successResponse(res, true, {
                      message: {
                          msg: "Login Again...",
                      }
                  })
              }

          }
      }
  }
};

module.exports = { register, welcome }