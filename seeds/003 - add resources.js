exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "laptop", description: "Lenovo 970mx" },
        {
          name: "notebook",
          description: "limitless paper in a paperless world"
        }
      ]);
    });
};
