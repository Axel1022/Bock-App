const path = require("path");

module.exports = {
  database: "bockApp",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../database", "bockApp-db.sqlite"),
    define: {
      underscored: true,
    },
    logging: false,
  },
};
