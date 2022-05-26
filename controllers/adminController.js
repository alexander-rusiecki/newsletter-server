const User = require('../models/User');

const adminLogin = async (req, res) => {
  const { password } = req.body;
  try {
    if (password === 'admin') {
      res.render('admin', { title: 'Admin', users: await User.find() });
    }
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const admin = await Admin.find({ password });
  //   res.status(200).json(admin);
  // } catch (error) {
  //   res.status(400).json({ msg: error });
  // }
};

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.render('admin', { title: 'All users', users });
//   } catch (error) {
//     res.status(400).json({ msg: error });
//   }
// };

module.exports = adminLogin;
