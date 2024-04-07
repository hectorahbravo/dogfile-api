const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const VetReminder = require("../models/VetReminder.model");
const User = require("../models/User.model");

module.exports.createVetReminder = (req, res, next) => {
  const vetReminderToCreate = {
    ...req.body,
  };

  // Crear el recordatorio
  VetReminder.create(vetReminderToCreate)
    .then(vetReminder => {
      res.status(StatusCodes.CREATED).json(vetReminder);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getVetReminder = (req, res, next) => {
  VetReminder.findById(req.params.id)
    .then(vetReminder => {
      if (!vetReminder) {
        return next(createError(StatusCodes.NOT_FOUND, "VetReminder not found"));
      }
      res.status(StatusCodes.OK).json(vetReminder);
    })
    .catch(next);
};

module.exports.deleteVetReminder = (req, res, next) => {
  VetReminder.findByIdAndDelete(req.params.id)
    .then(vetReminder => {
      if (!vetReminder) {
        return next(createError(StatusCodes.NOT_FOUND, "VetReminder not found"));
      }
      res.status(StatusCodes.NO_CONTENT).json();
    })
    .catch(next);
};

module.exports.editVetReminder = (req, res, next) => {
  VetReminder.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(editedVetReminder => {
      if (!editedVetReminder) {
        return next(createError(StatusCodes.NOT_FOUND, "VetReminder not found"));
      }
      res.status(StatusCodes.OK).json(editedVetReminder);
    })
    .catch(next);
};

module.exports.getVetRemindersDay = (req, res, next) => {
  const { userId, vetId } = req.body;
  const date = new Date(req.params.date);

  VetReminder.find({ user: userId, vet: vetId })
    .then(reminders => {
      const remindersForDay = reminders.filter(reminder => {
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
      res.json(remindersForDay);
    })
    .catch(next);
};
