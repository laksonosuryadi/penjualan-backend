const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

module.exports = {
  verify: (req,res,next) => {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
      if(err) {
        res.send({error:err});
      }
      else {
        User.findOne({email: decoded.email}, (err, user) => {
          if(decoded.role == 'admin') {
            if(err) {
              res.send({error:err});
            } else if (user == null){
              res.send({error: 'Token not valid!'});
            } else {
              next();
            }
          } else { // IF decoded.role == "user"
            res.send({error: 'You Are Not Authorized to use this feature!'})
          }
        })
      }
    })
  }
};
