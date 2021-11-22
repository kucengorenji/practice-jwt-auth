const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'token is required' });
    }
    try {
      const decode = jwt.verify(token, 'RAHASIA');
      req.user = decode;
      next();
    } catch {}
  },
};
