const User = require('../models/User');
const createToken = require('../lib/createToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }
    const token = await createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.MAX_AGE,
    });
    res.status(200).json({
      email: user.email,
      isSubscribing: user.isSubscribing,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password, isSubscribing } = req.body;
  try {
    const newUser = await User.create({ email, password, isSubscribing });
    const token = await createToken(newUser._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.MAX_AGE,
    });
    res.status(201).json({
      email: newUser.email,
      isSubscribing: newUser.isSubscribing,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ msg: 'You are logged out, welcome back any time.' });
};

module.exports = { login, signup, logout };
