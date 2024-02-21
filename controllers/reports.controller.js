const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Report = require("../models/Report.model");

module.exports.createReport = (req, res, next) => {
  const reportToCreate = {
    ...req.body,
  };

  Report.create(reportToCreate)
    .then((reportCreated) => {
      res.status(StatusCodes.CREATED).json(reportCreated);
    })
    .catch(next);
};

module.exports.getReport = (req, res, next) => {
  Report.findById(req.params.id)
    .then((report) => {
      if (!report) {
        return next(createError(StatusCodes.NOT_FOUND, "Report not found"));
      }
      res.status(StatusCodes.OK).json(report);
    })
    .catch(next);
};

module.exports.deleteReport = (req, res, next) => {
  Report.findByIdAndDelete(req.params.id)
    .then((report) => {
      if (!report) {
        next(createError(StatusCodes.NOT_FOUND, 'Report not found'))
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch(next)
}

module.exports.editReport = (req, res, next) => {
  Report.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(editedReport => {
      res.json(editedReport);
    })
    .catch(next)
}