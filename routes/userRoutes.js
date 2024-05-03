var express = require("express");
 const { createUser } = require("../controller/userController");
var router = express.Router();

// misc routes
router.post("/", createUser);

module.exports = router;
