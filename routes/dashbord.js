const { Router } =  require('express');

const dashbordCtrl = require('../controllers/dashbord');

const routes = new Router();

// Add routes
routes.get('/', dashbordCtrl.home);

routes.get('/products', dashbordCtrl.products);
routes.get('/categories', dashbordCtrl.categories);
routes.get('/orders', dashbordCtrl.orders);
routes.get('/customers', dashbordCtrl.customers);
routes.get('/calendar', dashbordCtrl.calendar);
routes.get('/mail', dashbordCtrl.mail);
routes.get('/chat', dashbordCtrl.chat);
routes.get('/contacts', dashbordCtrl.contacts);
routes.get('/todo', dashbordCtrl.todo);
routes.get('/file-manager', dashbordCtrl.fileManager);


module.exports = routes;
