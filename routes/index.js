const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use("/auth", require("./auth.route"));

// authenticated routes
router.use(isAuthenticated);
router.use("/task", require("./task.route"));
router.use("/project", require("./project.route"));

module.exports = router;
