const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


/** Ongs */
routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);
routes.put('/ongs', OngController.alter);

/**Incidentes */
routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.list);
routes.delete('/incidents/:id', IncidentsController.delete);
routes.get('/incidentsOne', IncidentsController.get);

/** Session */
routes.post('/sessionIni', SessionController.create);


module.exports = routes;