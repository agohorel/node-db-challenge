exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          project_id: 1,
          description: "investigate logs",
          notes: "might take a while, 30MB of raw text"
        },
        {
          project_id: 1,
          description: "discuss findings with team",
          notes: "in conference room 3B"
        },
        {
          project_id: 1,
          description: "implement plan of attack",
          notes: "WATCH YOUR FLANK!!!"
        },
        {
          project_id: 1,
          description: "debrief engineering team",
          notes: "nicely done!"
        }
      ]);
    });
};
