const express = require("express");
const {
  createProjectController,updateProjectController,getAllProjectController,getProjectController,deleteProjectController,getProjectsByTagsController
} = require("../controllers/project-controller");
const {isLoginIn,checkPermission} = require("../middlewares/auth-middlewares")

const router = express.Router();

router.post("/create", isLoginIn,checkPermission,createProjectController);
router.put("/update/:id", isLoginIn,checkPermission,updateProjectController);
router.get("/get/:id", isLoginIn,checkPermission,getProjectController);
router.delete("/delete/:id", isLoginIn,checkPermission,deleteProjectController);
router.get("/getAll", isLoginIn,checkPermission,getAllProjectController);
router.get("/getAllByTags",getProjectsByTagsController);

module.exports = router;