const { Router } = require("express");
const taskRouter = require("./task.router");

const router = Router();

router.use("/tasks", taskRouter);

module.exports = router;
