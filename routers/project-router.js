const express = require("express");
const db = require("../model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await db.find("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const [newProjectID] = await db.insert("projects", req.body);
    const newProject = await db.findById("projects", newProjectID);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id/detail", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.findById("projects", id);
    const tasks = await db.getTasks(id);
    const resources = await db.getProjectResources(id);

    res.status(200).json({ ...project, tasks, resources });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
