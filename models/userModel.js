const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please tell us your name'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     lowerCase: true,
//     unique: true,
//     validate: [validator.isEmail, 'Please provide a valid email'],
//     required: [true, 'Please provide your email'],
//   },
//   photo: String,
//   password: {
//     type: String,
//     minLength: 8,
//     required: [true, 'Please provide  a password'],
//     select: false,
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, 'Please confirm your password'],
//     // Validators triggers on Create and Save method
//     validate: {
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: 'Passwords are not the same',
//     },
//   },
//   passwordChangedAt: Date,
// });

// const User = mongoose.model('User', userSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same    ',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// comparing password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
