const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");
const dogsControllers = require("../controllers/dogs.controller");
const reportsController = require("../controllers/reports.controller")
const recommendationsController = require("../controllers/recommendations.controller")

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


module.exports = router;


