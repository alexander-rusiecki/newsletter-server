const User = require('../models/User');

const login = (req, res) => {
  const { email, password, isSubscribing } = req.body;
  res.send('login');
};

const signup = async (req, res) => {
  const { email, password, isSubscribing } = req.body;
  try {
    const newUser = await User.create({ email, password, isSubscribing });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
  res.send('signup');
};

module.exports = { login, signup };
