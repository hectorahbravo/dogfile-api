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

module.exports.getRecommendation = (req, res, next) => {
  Recommendation.findById(req.params.id)
    .then((recommendation) => {
      if (!recommendation) {
        return next(createError(StatusCodes.NOT_FOUND, "Recommendation not found"));
      }
      res.status(StatusCodes.OK).json(recommendation);
    })
    .catch(next);
};
