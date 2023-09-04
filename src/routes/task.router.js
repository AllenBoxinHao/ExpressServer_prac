const express = require("express");
const {
    getAllTasks,
    getTaskById,
    updateTaskById,
    createTask,
    deleteTaskById,
} = require("../controllers/tasks.controller");
const taskRouter = express.Router();
const parseID = require("../middleware/parseId");

taskRouter.get("/", getAllTasks);

// get task by ID
taskRouter.get("/:id", parseID, getTaskById);

// update task by ID
taskRouter.put("/:id", parseID, updateTaskById);

// create a new task
taskRouter.post("/", createTask);

// delete a task by ID
taskRouter.delete("/:id", parseID, deleteTaskById);

module.exports = taskRouter;
