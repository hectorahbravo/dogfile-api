const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const User = require("../models/User.model");

module.exports.create = (req, res, next) => {
  const userToCreate = {
    ...req.body,
    //avatar: req.file.path,
  };

  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((user) => {
      if (user) {
        next(
          createError(
            StatusCodes.BAD_REQUEST,
            "Username or email already in use"
          )
        );
      } else {
        return User.create(userToCreate).then((userCreated) => {
          res.status(StatusCodes.CREATED).json(userCreated);
        });
      }
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
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next)
}

module.exports.editUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(editedUser => {
      res.json(editedUser);
    })
    .catch(next)
}