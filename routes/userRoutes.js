var express = require("express");
 const { registerUser,loginUser } = require("../controller/userController");
var router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
