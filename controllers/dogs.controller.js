const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Dog = require("../models/Dog.model");

module.exports.create = (req, res, next) => {
  const dogToCreate = {
    ...req.body,
    //avatar: req.file.path,
  };

  Dog.findOne({ name: req.body.name })
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
