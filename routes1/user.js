const { Router } =  require('express');

const userCtrl = require('../controllers1/user');

const routes = new Router();

// Add routes
routes.get('/login', userCtrl.login);

routes.post('/login', userCtrl.signUp);

module.exports = routes;
