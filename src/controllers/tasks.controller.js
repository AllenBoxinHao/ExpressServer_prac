const tasks = [];
let id = 0;

// get all tasks (allow query params for filtering)
const getAllTasks = (req, res) => {
    const { description } = req.query;
    if (description) {
        const filteredTasks = tasks.filter((t) => t.description?.includes(description));
        return res.json(filteredTasks);
    }
    return res.json(tasks);
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return res.status(404).json({ error: "No task found for this ID" });
    }
    return res.json(task);
};

const updateTaskById = (req, res) => {
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
};

const createTask = (req, res) => {
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
};

const deleteTaskById = (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "There is no such task" });
    }
    tasks.splice(taskIndex, 1);
    res.sendStatus(204);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
};
