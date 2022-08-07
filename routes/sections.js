const  { Router } = require('express');

const sectionCltr = require('../controllers/sections');

const upload = require('../utils/multer-dii');


const routes = new Router();

// Add routes
routes.get('/', sectionCltr.all);
routes.post('/update/:id',  sectionCltr.edit);
routes.post('/delete/:id',  sectionCltr.delete);
routes.post('/',  upload.array('file_upload'), sectionCltr.add);


module.exports = routes;
