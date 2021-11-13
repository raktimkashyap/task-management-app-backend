const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use("/v1/auth", require("./auth.route"));

// authenticated routes
router.use(isAuthenticated);
router.use("/v1/task", require("./task.route"));
router.use("/v1/project", require("./project.route"));

module.exports = router;
