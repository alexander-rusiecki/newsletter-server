const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        res.status(200).json({ decodedToken });
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = requireAuth;
