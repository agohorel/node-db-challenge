const express = require("express");
const db = require("../model.js");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const tasks = await db.getFormattedTasks(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const [newTaskID] = await db.insert("tasks", req.body);
    const newTask = await db.findById("tasks", newTaskID);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
