const  { Router } = require('express');

const dashbordCltr = require('../controllers/dashbord');

const routes = new Router();

// Add routes
routes.get('/', dashbordCltr.home);

module.exports = routes;
