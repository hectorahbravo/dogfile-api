const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const User = require("../models/User.model");
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
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((editedUser) => {
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
