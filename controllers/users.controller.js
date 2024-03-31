const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const User = require("../models/User.model");
const Vet = require("../models/Vet.model");


const {
  transporter,
  createEmailTemplate,
} = require("../config/nodemailer.config");

module.exports.create = (req, res, next) => {
  const userToCreate = {
    ...req.body,
    avatar: req.file.path,
  };

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        next(
          createError(
            StatusCodes.BAD_REQUEST,
            "Username or email already in use"
          )
        );
      } else {
        return User.create(userToCreate);
      }
    })
    .then((newUser) => {
      transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: newUser.email,
        subject: "Account Activation",
        html: createEmailTemplate(newUser),
      });
      res.status(201).json(newUser);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(StatusCodes.CREATED).json(user);
    })
    .catch(next);
};

module.exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  const updateFields = { ...req.body };

  // Verifica si hay un archivo de avatar adjunto en la solicitud
  if (req.file) {
    updateFields.avatar = req.file.path; // Asigna el path del archivo al campo de avatar
  }
  console.log('Update fields before update:', updateFields); // Agrega este console.log para imprimir los campos de actualización antes de la actualización

  User.findByIdAndUpdate(req.params.userId, updateFields, { new: true })
    .then((editedUser) => {
      console.log('Edited user:', editedUser); // Agrega este console.log para imprimir el usuario editado después de la actualización
      res.json(editedUser);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .populate("dogs")
    .populate("reminders")
    .then((user) => {
      res.status(StatusCodes.CREATED).json(user);
    })
    .catch(next);
};

module.exports.activate = (req, res, next) => {
  const { token } = req.params;
  User.findOneAndUpdate(
    { activationToken: token },
    { isActive: true },
    { new: true }
  )
    .then((dbUser) => {
      res
        .status(200)
        .json({
          message: "Account activated successfully",
          email: dbUser.email,
        });
    })
    .catch((error) => next(error));
};

module.exports.getAllVets = (req, res, next) => {
  Vet.find()
    .then((vets) => {
      res.status(200).json(vets);
    })
    .catch((error) => {
      next(error);
    });
};