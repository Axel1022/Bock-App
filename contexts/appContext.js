const { Sequelize } = require("sequelize");
let db = null;

const config = require("./config");
console.log(config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.params
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("¡Conexión establecida exitosamente!");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

testConnection();
