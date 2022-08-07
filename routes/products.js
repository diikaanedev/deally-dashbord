const  { Router } = require('express');

const upload = require('../utils/multer-dii');


const productCltr = require('../controllers/products');



const routes = new Router();

// Add routes
routes.post('/', upload.array('file_upload') , productCltr.store);
routes.post('/edit/:id', upload.array('file_upload') , productCltr.edit);
routes.post('/delete/:id', productCltr.delete);
routes.get('/', productCltr.all);
routes.get('/:id', productCltr.one);

module.exports = routes;
