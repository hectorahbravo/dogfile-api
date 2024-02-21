const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");
const dogsControllers = require("../controllers/dogs.controller");
const reportsController = require("../controllers/reports.controller");
const recommendationsController = require("../controllers/recommendations.controller");
const likeController = require("../controllers/likes.controllers");
//User
router.post("/users", upload.single("avatar"), usersController.create);
router.get("/users/:id", usersController.getUser);

//Dogs
router.post("/users/:id/dogs", dogsControllers.create);
router.get("/users/:id/dogs/:dogId", dogsControllers.getDog);

//Reports
router.post("/reports", reportsController.createReport);
router.get("/reports/:id", reportsController.getReport);

//Recommendations
router.post("/recommendations", recommendationsController.createRecommendation);
router.get("/recommendations/:id", recommendationsController.getRecommendation);

//Likes
router.post("/reports/:id/like", likeController.toggleLike);
router.post("/recommendations/:id/like", likeController.toggleLike);

module.exports = router;
