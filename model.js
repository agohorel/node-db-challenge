const db = require("./data/dbConfig.js");

function insert(table, data) {
  return db(table).insert(data);
}

function find(table) {
  return db(table);
}

function findById(table, id) {
  return db(table)
    .where({ id })
    .first();
}

// SELECT t.description as "Task Description", t.notes as "Task Notes", p.name as "Project Name", p.description as "Project Description" FROM projects AS p
// JOIN tasks as t
// ON p.id = t.project_id;

function getFormattedTasks(id) {
  return db("projects as p")
    .select(
      "p.name as Project Name",
      "p.description as Project Description",
      "t.description as Task Desciption",
      "t.notes as Task Notes"
    )
    .join("tasks as t", { "p.id": "t.project_id" })
    .where({ "p.id": id });
}

function getTasks(id) {
  return db("projects as p")
    .select("t.id", "t.description", "t.notes", "t.completed")
    .join("tasks as t", { "p.id": "t.project_id" })
    .where({ "p.id": id });
}

function getProjectResources(id) {
  return db("projects as p")
    .select("r.id", "r.name", "r.description")
    .join("project_resources as pr", { "p.id": "pr.project_id" })
    .join("resources as r", { "r.id": "pr.resource_id" })
    .where({ "p.id": id });
}

module.exports = {
  find,
  findById,
  insert,
  getFormattedTasks,
  getTasks,
  getProjectResources
};
