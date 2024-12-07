const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, password_confirmation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [8, 'Password must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A tour must confirm the password'],
    validator: function (el) {
      return el === this.password;
    },
    message: 'password are not the same!',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
