const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required:true, unique: true},
  password: String,
  role: {type: String, default:'user'}
},{
  timestamps: true
});

userSchema.plugin(uniqueValidator, { message: 'Email: {PATH} telah terdaftar' });
const User = mongoose.model('User', userSchema);

module.exports = User;
