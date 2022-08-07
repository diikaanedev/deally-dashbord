const { Router } =  require('express');

const userCtrl = require('../controllers/users');

const routes = new Router();

// Add routes
routes.get('/login', userCtrl.login);
routes.get('/log-out', userCtrl.logout);
routes.get('/register', userCtrl.register);
routes.get('/password', userCtrl.password);
routes.post('/login', userCtrl.postLogin);
routes.post('/', userCtrl.postRegister);
routes.post('/delete/:id', userCtrl.deleteRegisterEdit);
routes.post('/edit/:id', userCtrl.postRegisterEdit);
routes.post('/password', userCtrl.postPassword);

module.exports = routes;
