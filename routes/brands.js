const  { Router } = require('express');

const brandCltr = require('../controllers/brands');

const upload = require('../utils/multer-dii');


const routes = new Router();

// Add routes
routes.post('/', upload.single('file_upload') , brandCltr.add);
routes.post('/edit/:id', upload.single('file_upload') , brandCltr.edit);
routes.post('/delete/:id', brandCltr.delete);
routes.get('/', brandCltr.home);

module.exports = routes;
