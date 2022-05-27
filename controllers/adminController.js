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
    console.log(error);
  }
};

module.exports = adminLogin;
