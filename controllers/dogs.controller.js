const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Dog = require("../models/Dog.model");

module.exports.create = (req, res, next) => {
  const id = req.params.id;
  const dogToCreate = {
    ...req.body,
    owner: id,
    //avatar: req.file.path,
  };

  Dog.findOne({ name: req.body.name, owner: id })
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
  Dog.findById(req.params.dogId)
    .then((dog) => {
      res.status(StatusCodes.CREATED).json(dog);
    })
    .catch(next);
};
