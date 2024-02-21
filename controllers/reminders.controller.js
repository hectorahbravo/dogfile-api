const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Reminder = require("../models/Reminder.model");

module.exports.createReminder = (req, res, next) => {
  const reminderToCreate = {
    ...req.body,
  };

  Reminder.create(reminderToCreate)
    .then((reminderCreated) => {
      res.status(StatusCodes.CREATED).json(reminderCreated);
    })
    .catch(next);
};

module.exports.getReminder = (req, res, next) => {
  Reminder.findById(req.params.id)
    .then((reminder) => {
      if (!reminder) {
        return next(createError(StatusCodes.NOT_FOUND, "Reminder not found"));
      }
      res.status(StatusCodes.OK).json(reminder);
    })
    .catch(next);
};

module.exports.deleteReminder = (req, res, next) => {
  Reminder.findByIdAndDelete(req.params.id)
    .then((reminder) => {
      if (!reminder) {
        next(createError(StatusCodes.NOT_FOUND, "Reminder not found"));
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next);
};

module.exports.editReminder = (req, res, next) => {
  Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((editedReminder) => {
      res.json(editedReminder);
    })
    .catch(next);
};
