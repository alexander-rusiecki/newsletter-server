const login = (req, res) => {
  console.log(req.body);
  res.send('login');
};

const signup = (req, res) => {
  console.log(req.body);
  res.send('signup');
};

module.exports = { login, signup };
