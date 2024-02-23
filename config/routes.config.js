const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");
const dogsControllers = require("../controllers/dogs.controller");
const reportsController = require("../controllers/reports.controller");
const recommendationsController = require("../controllers/recommendations.controller");
const likeController = require("../controllers/likes.controller");
const authController = require("../controllers/auth.controller");
const remindersController = require("../controllers/reminders.controller");

//Auth
router.post("/login", authController.login);

//User
router.post("/users", upload.single("avatar"), usersController.create);
router.get("/users/me", usersController.getCurrentUser);
router.get("/users/:id", usersController.getUser);
router.delete("/users/:id", usersController.deleteUser);
router.put("/users/:id", usersController.editUser);

//Dogs
router.post("/users/:id/dogs", dogsControllers.create);
router.get("/users/:id/dogs/:dogId", dogsControllers.getDog);
router.delete("/users/:id/dogs/:dogId", dogsControllers.deleteDog);
router.put("/users/:id/dogs/:dogId", dogsControllers.editDog);

//Reports
router.post("/reports", reportsController.createReport);
router.get("/reports/:id", reportsController.getReport);
router.delete("/reports/:id", reportsController.deleteReport);
router.put("/reports/:id", reportsController.editReport);

//Recommendations
router.post("/recommendations", recommendationsController.createRecommendation);
router.get("/recommendations/:id", recommendationsController.getRecommendation);
router.put(
  "/recommendations/:id",
  recommendationsController.editRecommendation
);
router.delete(
  "/recommendations/:id",
  recommendationsController.deleteRecommendation
);

//Likes
router.post("/reports/:id/like", likeController.toggleLike);
router.post("/recommendations/:id/like", likeController.toggleLike);

//Reminders
router.post("/reminders", remindersController.createReminder);
router.get("/reminders/:id", remindersController.getReminder);
router.delete("/reminders/:id", remindersController.deleteReminder);
router.put("/reminders/:id", remindersController.editReminder);
module.exports = router;
