const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Dog = require("../models/Dog.model");

module.exports.create = (req, res, next) => {
  const dogToCreate = {
    ...req.body,
    //avatar: req.file.path,
  };

  Dog.findOne({ name: req.body.name, owner: req.body.owner })
    .then((dog) => {
      if (dog) {
        next(createError(StatusCodes.BAD_REQUEST, "name already in use"));
      } else {
        return Dog.create(dogToCreate).then((dogCreated) => {
          res.status(StatusCodes.CREATED).json(dogCreated);
        });
      }
    })
    .catch(next);
};


module.exports.getDog = (req, res, next) => {
  Dog.findById(req.params.dogId) // Acceder a req.params.id en lugar de req.params.dogId
    .then((dog) => {
      res.status(StatusCodes.CREATED).json(dog);
    })
    .catch(next);
};
module.exports.getUserDogs = (req, res, next) => {
  getDog(req.params.userId, req, res, next)
}

module.exports.deleteDog = (req, res, next) => {
  Dog.findByIdAndDelete(req.params.id)
    .then((dog) => {
      if (!dog) {
        next(createError(StatusCodes.NOT_FOUND, 'Dog not found'))
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next)
}

module.exports.editDog = (req, res, next) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(editedDog => {
      res.json(editedDog);
    })
    .catch(next)
}