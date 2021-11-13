const express = require("express");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.patch("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);
router.get("/:dueDate", taskController.getTasksByDueDate);

module.exports = router;
