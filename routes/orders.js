const  { Router } = require('express');

const upload = require('../utils/multer-dii');


const productCltr = require('../controllers/orders');



const routes = new Router();

// Add routes
routes.get('/', productCltr.all);

module.exports = routes;
