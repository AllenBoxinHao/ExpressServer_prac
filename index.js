const express = require("express");

const app = express();
const port = 3000;
app.use(cors);
app.use(express.json());

function cors(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
}

const tasks = [];
let id = 0;

// parse All id in param into a number
function parseID(req, res, next) {
    let { id } = req.params;
    req.params.id = Number(id);
    next();
}

// get all tasks (allow query params for filtering)
app.get("/tasks", (req, res) => {
    const { description } = req.query;
    if (description) {
        const filteredTasks = tasks.filter((t) => t.description?.includes(description));
        return res.json(filteredTasks);
    }
    return res.json(tasks);
});

// get task by ID
app.get("/tasks/:id", parseID, (req, res) => {
    const { id } = req.params;
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "No task found for this ID" });
    }
    return res.json(task);
});

// update task by ID
app.put("/tasks/:id", parseID, (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "No task found for this ID" });
    }
    if (description) {
        task.description = description;
    }
    if (done) {
        task.done = !!done;
    }
    return res.json(task);
});

// create a new task
app.post("/tasks", (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ error: "Task description is missing" });
    }
    const task = {
        id: ++id,
        description,
        done: false,
    };
    tasks.push(task);
    return res.status(201).json(task);
});

// delete a task by ID
app.delete("/tasks/:id", parseID, (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "There is no such task" });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).json("Deletion succeed");
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
