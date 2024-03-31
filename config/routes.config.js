const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");
const dogsControllers = require("../controllers/dogs.controller");
const reportsController = require("../controllers/reports.controller");
const recommendationsController = require("../controllers/recommendations.controller");
const likeController = require("../controllers/likes.controller");
const authController = require("../controllers/auth.controller");
const remindersController = require("../controllers/reminders.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const vetController = require("../controllers/vet.controller");
const vetremindersController = require ("../controllers/vetreminders.controller")
//Auth
router.post("/login", authController.login);
router.post("/login/vets", authController.loginVet);

//User
router.post("/users", upload.single("avatar"), usersController.create);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.get(
  "/users/:id",
  authMiddleware.isAuthenticated,
  usersController.getUser
);
router.delete(
  "/users/:id",
  authMiddleware.isAuthenticated,
  usersController.deleteUser
);
router.put(
  "/users/:userId",
  authMiddleware.isAuthenticated,
  usersController.editUser
);
router.get("/activate/:token", usersController.activate);

//Vet
router.post("/register/vets", upload.single("avatar"), vetController.create);
router.get(
  "/vets/me",
  authMiddleware.isAuthenticated,
  vetController.getCurrentVet
);

router.get('/vets/:vetId/dogs', vetController.getDogsAssociatedWithVet);


router.get(
  "/allvets",
  authMiddleware.isAuthenticated,
  vetController.getAllVets
);
router.get(
  "/vets/:id",
  authMiddleware.isAuthenticated,
  vetController.getVet
);
router.delete(
  "/vets/:id",
  authMiddleware.isAuthenticated,
  vetController.deleteVet
);
router.put(
  "/vets/:vetId",
  authMiddleware.isAuthenticated,
  vetController.editVet
);
router.get("/activatevet/:token", vetController.activateVet);
router.get('/:vetId/users', vetController.getUsersAssociatedWithVet);



//Dogs
router.post(
  "/users/:userId/dogs",
  authMiddleware.isAuthenticated,
  dogsControllers.create
);
router.get(
  "/users/:userId/dogs/:dogId",
  authMiddleware.isAuthenticated,
  dogsControllers.getDog
);
router.delete(
  "/users/:userId/dogs/:dogId",
  authMiddleware.isAuthenticated,
  dogsControllers.deleteDog
);
router.put(
  "/users/:userId/dogs/:dogId",
  authMiddleware.isAuthenticated,
  dogsControllers.editDog
);
router.get(
  "/users/:id/dogs/:dogId",
  authMiddleware.isAuthenticated,
  dogsControllers.getUserDogs
);

//Reports
router.post("/reports", reportsController.createReport);
router.get("/reports", reportsController.getReport);
router.delete("/reports/:id", reportsController.deleteReport);
router.put("/reports/:id", reportsController.editReport);

//Recommendations
router.post("/recommendations", recommendationsController.createRecommendation);
router.get("/recommendations", recommendationsController.getRecommendations);
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
router.post(
  "/reminders",
  authMiddleware.isAuthenticated,
  remindersController.createReminder
);
router.get(
  "/reminders",
  authMiddleware.isAuthenticated,
  remindersController.getReminder
);

router.get(
  "/reminders/day/:date",
  authMiddleware.isAuthenticated,
  remindersController.getRemindersDay
);
router.delete("/reminders/:id", remindersController.deleteReminder);
router.put("/reminders/:id", remindersController.editReminder);


//VetReminders
router.post(
  "/vetreminders",
  authMiddleware.isAuthenticated,
  vetremindersController.createVetReminder
);
router.get(
  "/vetreminders",
  authMiddleware.isAuthenticated,
  vetremindersController.getVetReminder
);

router.get(
  "/vetreminders/day/:date",
  authMiddleware.isAuthenticated,
  vetremindersController.getVetRemindersDay
);
router.delete("/vetreminders/:id", vetremindersController.deleteVetReminder);
router.put("/vetreminders/:id", vetremindersController.editVetReminder);


module.exports = router;