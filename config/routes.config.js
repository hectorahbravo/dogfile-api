const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");
const dogsControllers = require("../controllers/dogs.controller");

//User
router.post("/users", upload.single("avatar"), usersController.create);
router.get("/users/:id", usersController.getUser);

//Dogs
router.post("/dogs", dogsControllers.create);

module.exports = router;
