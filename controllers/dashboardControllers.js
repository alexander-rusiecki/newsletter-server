const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getDashboardUser = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.find({ _id: userId.id });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({
        email: user[0].email,
        isSubscribing: user[0].isSubscribing,
      });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }
};

const updateSubscription = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const userId = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOneAndUpdate({ _id: userId.id }, req.body, {
        new: true,
      });
      res.json({ isSubscribing: user.isSubscribing });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }
};

module.exports = { getDashboardUser, updateSubscription };
