const User = require('../models/User');
const createToken = require('../lib/createToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.MAX_AGE });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password, isSubscribing } = req.body;
  try {
    const newUser = await User.create({ email, password, isSubscribing });
    const token = createToken(newUser._id);
    console.log(token);
    res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.MAX_AGE });
    res.status(201).json({ user: newUser._id });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { login, signup };
