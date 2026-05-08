const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", toggleTaskStatus);

module.exports = router;