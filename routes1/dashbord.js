const { Router } =  require('express');

const dashbordCtrl = require('../controllers1/dashbord');

const upload = require('../utils/multer-dii');


const routes = new Router();

// Add routes
routes.get('/', dashbordCtrl.home);

routes.get('/products', dashbordCtrl.products);
routes.get('/categories', dashbordCtrl.categories);
routes.post('/categories',upload.single('file_upload') , dashbordCtrl.addCategories);
routes.get('/orders', dashbordCtrl.orders);
routes.get('/customers', dashbordCtrl.customers);
routes.get('/calendar', dashbordCtrl.calendar);
routes.get('/mail', dashbordCtrl.mail);
routes.get('/chat', dashbordCtrl.chat);
routes.get('/contacts', dashbordCtrl.contacts);
routes.get('/todo', dashbordCtrl.todo);
routes.get('/file-manager', dashbordCtrl.fileManager);


module.exports = routes;
