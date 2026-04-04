const Task = require("../models/Task");
// GET /tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks.map(t => ({
      id: t._id,
      title: t.title,
      description: t.description,
      status: t.status,
      dueDate: t.dueDate,
      createdAt: t.createdAt,
    })));
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
// POST /tasks
const addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Görev başlığı zorunludur" });
    }

    const task = await Task.create({
      userId: req.user.userId,
      title,
      description,
      dueDate,
    });

    res.status(201).json({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// PUT /tasks/:taskId
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı" });
    }

    task.status = status;
    if (status === "completed") task.completedAt = new Date();
    await task.save();

    res.status(200).json({
      id: task._id,
      title: task.title,
      status: task.status,
      completedAt: task.completedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// DELETE /tasks/:taskId
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };