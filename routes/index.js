const express = require('express');
const routes = express.Router();
const userController = require('../controllers/index');
const jwtAuth = require('../middlewares/index');

// api
routes.post('/v1/register', userController.handleRegister);
routes.post('/v1/login', userController.handleLogin);
routes.post('/v1/whoami', jwtAuth.verifyToken, userController.handleWhoAmI);

module.exports = routes;
