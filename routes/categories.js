const  { Router } = require('express');

const categorieCltr = require('../controllers/categories');

const upload = require('../utils/multer-dii');


const routes = new Router();

// Add routes
routes.post('/', upload.array('file_upload') ,  categorieCltr.add);
routes.post('/edit/:id',  upload.array('file_upload') ,  categorieCltr.edit);
routes.post('/delete/:id', categorieCltr.delete);
routes.get('/', categorieCltr.home);

module.exports = routes;
