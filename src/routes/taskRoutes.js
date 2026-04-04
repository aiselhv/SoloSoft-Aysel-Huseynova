const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addTask, updateTask, deleteTask, getTasks } = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, addTask);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

module.exports = router;