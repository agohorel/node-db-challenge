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

server.listen(port, () => console.log(`server listening on port ${port}`));
