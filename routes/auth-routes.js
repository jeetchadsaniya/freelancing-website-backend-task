const express = require("express");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/auth-controllers");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", testController);

module.exports = router;