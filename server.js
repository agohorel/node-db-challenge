const express = require("express");
const db = require("./model.js");

const port = 5000;
const server = express();
server.use(express.json());

server.get("/resources", async (req, res) => {
  try {
    const resources = await db.find("resources");
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.post("/resources", async (req, res) => {
  try {
    const [newResourceID] = await db.insert("resources", req.body);
    const newResource = await db.findById("resources", newResourceID);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.get("/projects", async (req, res) => {
  try {
    const projects = await db.find("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.post("/projects", async (req, res) => {
  try {
    const [newProjectID] = await db.insert("projects", req.body);
    const newProject = await db.findById("projects", newProjectID);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await db.getFormattedTasks(req.params.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.post("/tasks/:id", async (req, res) => {
  try {
    const [newTaskID] = await db.insert("tasks", req.body);
    const newTask = await db.findById("tasks", newTaskID);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

server.get("/projects/:id/detail", async (req, res) => {
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

server.listen(port, () => console.log(`server listening on port ${port}`));
