const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.delete("/:projectId", projectController.deleteProject);
router.patch("/:projectId", projectController.updateProject);
router.get("/:projectId", projectController.getProjectTasks);

module.exports = router;
