const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const Recommendation = require("../models/Recommendation.model");

module.exports.createRecommendation = (req, res, next) => {
  const recommendationToCreate = {
    ...req.body,
  };

  Recommendation.create(recommendationToCreate)
    .then((recommendationCreated) => {
      res.status(StatusCodes.CREATED).json(recommendationCreated);
    })
    .catch(next);
};

module.exports.getRecommendations = (req, res, next) => {
  Recommendation.find()
    .then((recommendation) => {
      if (!recommendation) {
        return next(
          createError(StatusCodes.NOT_FOUND, "Recommendation not found")
        );
      }
      res.status(StatusCodes.OK).json(recommendation);
    })
    .catch(next);
};

module.exports.editRecommendation = (req, res, next) => {
  ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((editedRecommendation) => {
      res.status(StatusCodes.OK).json(editedRecommendation);
    })
    .catch(next);
};

module.exports.deleteRecommendation = (req, res, next) => {
  ToDo.findByIdAndDelete(req.params.id)
    .then((Recommendation) => {
      res.status(StatusCodes.OK).json({});
    })
    .catch(next);
};
