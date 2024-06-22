const express = require("express");
const {
  createTagController
} = require("../controllers/tag-controllers");
const {isLoginIn,checkPermission} = require("../middlewares/auth-middlewares")

const router = express.Router();

router.post("/create", isLoginIn,checkPermission,createTagController);

module.exports = router;