const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  handleRegister: async (req, res) => {
    const { name, password } = req.body;
    const user = await User.create({
      name: name,
      password: bcrypt.hashSync(password, 10),
      role: `PLAYER`,
    });
    return res.status(201).json({ user });
  },

  handleLogin: async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({
      where: { name: name },
    });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({
        message: `password anda salah`,
      });
    }
    const access_token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      'RAHASIA',
      {
        expiresIn: '2h',
      }
    );
    const refresh_token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, use: 'REFRESH_TOKEN' },
      'RAHASIA'
    );

    return res.status(201).json({ access_token, refresh_token });
  },
  handleWhoAmI: (req, res) => {
    const currentUser = req.user;
    return res.json(currentUser);
  },
};
