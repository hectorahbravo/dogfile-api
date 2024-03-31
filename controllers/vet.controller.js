const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Vet = require("../models/Vet.model");
const User = require ("../models/User.model")


const {
  transporter,
  createEmailTemplateVet,
} = require("../config/nodemailer.config");

module.exports.create = (req, res, next) => {
  let avatarPath = ""; // Inicializa la variable avatarPath

  // Verifica si req.file está definido y si tiene la propiedad path
  if (req.file && req.file.path) {
    avatarPath = req.file.path; // Asigna el path del archivo a avatarPath
  }

  const vetToCreate = {
    ...req.body,
    avatar: avatarPath, // Asigna el path del avatar al campo avatar del objeto a crear
  };

  Vet.findOne({ email: req.body.email })
    .then((vet) => {
      if (vet) {
        next(
          createError(
            StatusCodes.BAD_REQUEST,
            "Username or email already in use"
          )
        );
      } else {
        return Vet.create(vetToCreate);
      }
    })
    .then((newVet) => {
      transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: newVet.email,
        subject: "Account Activation",
        html: createEmailTemplateVet(newVet),
      });
      res.status(201).json(newVet);
    })
    .catch(next);
};

module.exports.getVet = (req, res, next) => {
  Vet.findById(req.params.id)
    .then((vet) => {
      res.status(StatusCodes.CREATED).json(vet);
    })
    .catch(next);
};

module.exports.deleteVet = (req, res, next) => {
  Vet.findByIdAndDelete(req.params.id)
    .then((vet) => {
      if (!vet) {
        next(createError(StatusCodes.NOT_FOUND, "Vet not found"));
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next);
};

module.exports.editVet = (req, res, next) => {
  const updateFields = { ...req.body };

  // Verifica si hay un archivo de avatar adjunto en la solicitud
  if (req.file) {
    updateFields.avatar = req.file.path; // Asigna el path del archivo al campo de avatar
  }
  console.log('Update fields before update:', updateFields); // Agrega este console.log para imprimir los campos de actualización antes de la actualización

  Vet.findByIdAndUpdate(req.params.vetId, updateFields, { new: true })
    .then((editedVet) => {
      console.log('Edited vet:', editedVet); // Agrega este console.log para imprimir el usuario editado después de la actualización
      res.json(editedVet);
    })
    .catch(next);
};

module.exports.getCurrentVet = (req, res, next) => {
  Vet.findById(req.currentVetId)
    .then((vet) => {
      res.status(StatusCodes.CREATED).json(vet);
    })
    .catch(next);
};

module.exports.activateVet = (req, res, next) => {
  const { token } = req.params;
  Vet.findOneAndUpdate(
    { activationToken: token },
    { isActive: true },
    { new: true }
  )
    .then((dbVet) => {
      res
        .status(200)
        .json({
          message: "Account activated successfully",
          email: dbVet.email,
        });
    })
    .catch((error) => next(error));
};

module.exports.getUsersAssociatedWithVet = (req, res, next) => {
  const vetId = req.params.vetId; // Suponiendo que el ID de la clínica veterinaria está en los parámetros de la solicitud
  User.find({ selectedVet: vetId })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching users associated with vet:', error);
      next(error);
    });
};

module.exports.getAllVets = (req, res, next) => {
  Vet.find()
    .then(vets => {
      res.status(200).json(vets);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getDogsAssociatedWithVet = (req, res, next) => {
  const vetId = req.params.vetId; // Suponiendo que el ID de la clínica veterinaria está en los parámetros de la solicitud
  User.find({ selectedVet: vetId })
    .populate('dogs') // Popula los perros asociados a los usuarios
    .then(users => {
      const dogs = users.reduce((allDogs, user) => {
        // Concatena los perros de todos los usuarios en un solo array
        allDogs.push(...user.dogs);
        return allDogs;
      }, []);
      console.log('Perros asociados a la veterinaria:', dogs); // Agrega este console.log para verificar los perros recuperados
      res.json(dogs);
    })
    .catch(error => {
      console.error('Error fetching dogs associated with vet:', error);
      next(error);
    });
};

