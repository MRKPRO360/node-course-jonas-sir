const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  // Send Response
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});

exports.getUser = async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
