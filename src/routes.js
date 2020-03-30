const express = require("express");
const OngController = require("./controllers/OngController");
const IncidentsController = require("./controllers/IncidentController");
const SessionController = require("./controllers/SessionController");
const { celebrate, Segments, Joi } = require("celebrate");
const routes = express.Router();

//validação é interessante nas rotas de criação e alteração, listagem é interessante quando se recebe parametros.

/** Ongs */
routes.get("/ongs", OngController.list);
routes.post(
  "/ongs",
  celebrate({//exemplo de validação
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
); //celebrate antes para valiar primeiro, se colocar depois é validado depois de executado a requisição
routes.put("/ongs", OngController.alter);

/**Incidentes */
routes.post("/incidents", IncidentsController.create);
routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentsController.list);
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentsController.delete
);
routes.get(
  "/incidentsOne",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      auth: Joi.string().required()
    }).unknown()
  }),
  IncidentsController.get
);

/** Session */
routes.post("/sessionIni", SessionController.create);

module.exports = routes;
