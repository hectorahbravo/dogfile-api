const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Like = require("../models/Like.model"); // Asegúrate de importar el modelo de Like

module.exports.toggleLike = (req, res, next) => {
  const { id } = req.params;
  const { path } = req.route;

  let targetField;

  // Determinar el tipo de objetivo y el campo correspondiente en el esquema de Like
  if (path.includes("reports")) {
    targetField = "report";
  } else if (path.includes("recomendations")) {
    targetField = "recommendation";
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Invalid path" });
  }

  // Crear el objeto de datos para el like
  const queryData = {
    [targetField]: id,
    likingUser: req.currentUserId,
  };

  // Verificar si ya existe un like para el usuario y el tipo de objetivo
  Like.findOne(queryData)
    .then((like) => {
      if (like) {
        // Si ya existe un like, eliminarlo
        Like.findOneAndDelete(queryData).then(() =>
          res.status(StatusCodes.NO_CONTENT).json({})
        );
      } else {
        // Si no existe un like, crearlo
        Like.create(queryData).then((like) => {
          res.status(StatusCodes.CREATED).json(like);
        });
      }
    })
    .catch(next);
};
