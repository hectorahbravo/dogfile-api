const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");
const Vet = require ('../models/Vet.model')

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const LOGIN_ERROR_MESSAGE = "Email or password invalid";

  const errorFn = () =>
    next(createError(StatusCodes.BAD_REQUEST, LOGIN_ERROR_MESSAGE));

  if (!email || !password) {
    return errorFn();
  }

  // Buscar si existe un usuario con ese email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errorFn();
      } else {
        // Comparo contraseñas

        return user.checkPassword(password).then((match) => {
          if (!match) {
            errorFn();
          } else {
            // Creo el token y lo mando

            const token = jwt.sign(
              { id: user.id, role: "user" }, // Incluir el campo 'role' con el valor 'user'
              process.env.JWT_SECRET || "test",
              { expiresIn: "7d" }
            );

            res.json({ accessToken: token });
          }
        });
      }
    })
    .catch(next);
};

module.exports.loginVet = (req, res, next) => {
  const { email, password } = req.body;

  Vet.findOne({ email })
    .then((vet) => {
      if (!vet) {
        throw createError(StatusCodes.BAD_REQUEST, "Email or password invalid");
      }

      return vet.checkPassword(password)
        .then((match) => {
          if (!match) {
            throw createError(StatusCodes.BAD_REQUEST, "Email or password invalid");
          }

          // Crear el token JWT para el veterinario y agregar el campo 'role' con el valor 'vet'
          const token = jwt.sign(
            { id: vet.id, role: "vet" },
            process.env.JWT_SECRET || "test",
            { expiresIn: "7d" }
          );

          res.json({ accessToken: token });
        });
    })
    .catch(next);
};