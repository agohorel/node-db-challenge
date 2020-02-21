const express = require("express");
const projectRouter = require("./routers/project-router.js");
const resourceRouter = require("./routers/resource-router.js");
const taskRouter = require("./routers/task-router.js");

const port = 5000;
const server = express();
server.use(express.json());

server.use("/projects", projectRouter);
server.use("/resources", resourceRouter);
server.use("/tasks", taskRouter);

server.listen(port, () => console.log(`server listening on port ${port}`));
