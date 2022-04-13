const path = require("path");

const optionsSQLite = {
  client: "better-sqlite3",
  connection: { filename: "./ecommerce.db3"},
  useNullAsDefault: true,
};

module.exports = { optionsSQLite };