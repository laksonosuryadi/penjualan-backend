'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const pwh = require('password-hash');

require('dotenv').config();

module.exports = {
  getAllUsers: (req, res) => {
    User.find((err,users) => {
      if(err) {
        res.send({error:err});
      } else {
        res.send(users);
      }
    })
  },

  signup: (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) {
        res.send({error:err})
      } else if(user) {
        res.send({error:'email is already exist'})
      } else {
        const hashedPassword = pwh.generate(req.body.password);
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role
        })

        newUser.save((err, user) => {
          if(err) {
            res.send({error:err})
          } else {
            res.send(user);
          }
        })
      }
    })
  },

  signin: (req, res) => {
    User.findOne({'email':req.body.email}, (err, user) => {
      if(err) {
        res.send({error:err})
      }
      else if(!user){
        res.send({error:"user not found"})
      } else {
        if(pwh.verify(req.body.password, user.password)) {
          const newToken = jwt.sign({email: user.email, name: user.name, role: user.role}, process.env.SECRET_KEY);
          user.password = null
          res.send({token: newToken, userdata: user});
        } else {
          res.send({error: 'wrong password'});
        }
      }
    })
  }
}
