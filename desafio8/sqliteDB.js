const { optionsSQLite } = require("./src/DB/optionsSQLite.js");
const knex = require("knex")(optionsSQLite);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("email", 70).notNullable();
    table.timestamp("date").defaultTo(knex.fn.now());
    table.string("text", 300);
  })
  .then(() => {
    console.log("Tabla creada");
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })

  .finally(() => {
    knex.destroy();
  });