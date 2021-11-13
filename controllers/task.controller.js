const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  const { title, description, status, priority, projectId, dueDate } = req.body;
  Task.create({
    title,
    description,
    status,
    priority,
    dueDate: new Date(),
    projectId,
    owner: req.user.email,
  })
    .then((task) => {
      res
        .status(200)
        .json({ message: "task created successfully", task: task });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Something went wrong", error: err.message });
    });
};

exports.getTasks = async (req, res) => {
  Task.find({ owner: req.user.email, projectId: null })
    .then((tasks) => res.status(200).json({ tasks: tasks }))
    .catch((err) => {
      res
        .status(400)
        .json({ message: "something went wrong", error: err.message });
    });
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  Task.findByIdAndRemove({ _id: taskId })
    .then(() => {
      res.status(200).json({ message: "task deleted successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "something went wrong", error: err.message });
    });
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, status, priority, projectId } = req.body;
  const taskId = req.params.taskId;
  Task.findByIdAndUpdate(
    { _id: taskId },
    { title, description, dueDate, status, priority, projectId }
  )
    .then(() => {
      res.status(200).json({ message: "task updated successfully" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "something went wrong", error: err.message });
    });
};

exports.getTasksByDueDate = async (req, res) => {
  const { dueDate } = req.params;

  Task.find({ owner: req.user.email, dueDate: dueDate })
    .then((tasks) => {
      res.status(200).json({ tasks });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "something went wrong", error: err.message });
    });
};
