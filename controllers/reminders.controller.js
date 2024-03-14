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

module.exports.getRemindersDay = (req, res, next) => {
  const { userId } = req.body;
  const date = new Date(req.params.date);

  Reminder.find({ user: userId })
    .then((reminders) => {
      const remindersForDay = reminders.filter((reminder) => {
        const reminderStartDate = new Date(reminder.startDate);
        const reminderEndDate = new Date(reminder.endDate);

        if (!reminder.repeat) {
          return reminderStartDate <= date && reminderEndDate >= date;
        }

        switch (reminder.repeatType) {
          case "daily":
            return true;
          case "weekly":
            return (
              reminderStartDate <= date &&
              reminderEndDate >= date &&
              date.getDay() === reminderStartDate.getDay()
            );
          case "monthly":
            return reminderStartDate.getDate() === date.getDate();
          case "annually":
            return (
              reminderStartDate.getMonth() === date.getMonth() &&
              reminderStartDate.getDate() === date.getDate()
            );
          default:
            return false;
        }
      });
      console.log(remindersForDayç);
      res.json(remindersForDay);
    })
    .catch((err) => next(err));
};
