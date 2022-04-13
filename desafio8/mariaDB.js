const { optionsMySQL } = require("./src/DB/optionsMySQL");
const knex = require("knex")(optionsMySQL);

knex.schema
  .createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name", 80).notNullable();
    table.float("price");
    table.string("thumbnail", 200);
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