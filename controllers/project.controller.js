const Project = require("../models/project.model");
const Task = require("../models/task.model");

exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  Project.create({ title, description, owner: req.user.email })
    .then((project) => {
      res.status(200).json({
        success: true,
        message: "project created succesfully",
        project,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "something went wrong",
        error: err.message,
      });
    });
};

exports.getProjects = async (req, res) => {
  Project.find({ owner: req.user.email })
    .then((projects) => {
      res.status(200).json({ success: true, projects });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "something went wrong",
        error: err.message,
      });
    });
};

exports.updateProject = async (req, res) => {
  const { title, description } = req.body;
  const pojectId = req.params.projectId;
  Project.findByIdAndUpdate({ _id: pojectId }, { title, description })
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "project updated successfully" });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "something went wrong",
        error: err.message,
      });
    });
};

exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const tasksDeleted = await Task.deleteMany({ projectId: projectId });
    if (tasksDeleted) {
      console.log(tasksDeleted);
      const projectsDeleted = await Project.findByIdAndDelete({
        _id: projectId,
      });
      if (projectsDeleted) {
        res.status(200).json({
          success: true,
          message: "Projects and related tasks deleted",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
};
// exports.deleteProject = async (req, res) => {
//   const pojectId = req.params.projectId;
//   Project.findByIdAndRemove({ _id: pojectId })
//     .then(() => {
//       res.status(200).json({ message: "project deleted successfully" });
//     })
//     .catch((err) => {
//       res
//         .status(400)
//         .json({ message: "something went wrong", error: err.message });
//     });
// };

exports.getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  Task.find({ projectId: projectId })
    .then((tasks) => {
      res.status(200).json({ success: true, tasks });
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          success: false,
          message: "something went wrong",
          error: err.message,
        });
    });
};
