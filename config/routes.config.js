const router = require("express").Router();
const upload = require("./storage.config");
const usersController = require("../controllers/users.controller");

router.post("/users", upload.single("avatar"), usersController.create);

module.exports = router;
