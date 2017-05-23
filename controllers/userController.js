'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const pwh = require('password-hash');

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
  }
}
