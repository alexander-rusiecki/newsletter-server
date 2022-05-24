const Admin = require('../models/Admin');
const User = require('../models/User');

const login = async (req, res) => {
  const { password } = req.body;
  try {
    const admin = await Admin.find({ password });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { login, getUsers };
