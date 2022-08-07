const  { Router } = require('express');

const sectionCltr = require('../controllers/banieres');

const upload = require('../utils/multer-dii');


const routes = new Router();

// Add routes
routes.get('/', sectionCltr.all);
routes.post('/update/:id',  upload.array('file_upload'), sectionCltr.update);
routes.post('/',  upload.array('file_upload'), sectionCltr.add);
routes.post('/delete/:id',  sectionCltr.delete);

module.exports = routes;
