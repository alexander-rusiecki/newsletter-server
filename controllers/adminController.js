const User = require('../models/User');

const adminLogin = async (req, res) => {
  const { password } = req.body;
  try {
    if (password === 'admin') {
      res.render('admin', { title: 'Admin', users: await User.find({}) });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminLogin;
