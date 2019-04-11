const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();
const FileController = require('./controllers/FileController');
const BoxController = require('./controllers/BoxController');

/*
* GET: buscar informações
* POST: criar algo
* PUT:  editar algo
* DELETE: apagar algo
*/

routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);
module.exports = routes;