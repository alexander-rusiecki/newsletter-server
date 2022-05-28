const User = require('../models/User');

const adminLogin = async (req, res) => {
  const { password } = req.body;
  try {
    if (password === 'admin') {
      return res.render('admin', {
        title: 'Admin',
        users: await User.find({}),
      });
    }
    res.redirect('/');
  } catch (error) {
    res.status(401).json({ errorMsg: error.message });
  }
};

module.exports = adminLogin;
