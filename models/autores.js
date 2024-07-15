// nombre del
// autor, el correo del autor y la cantidad de libros que tienen asociado este autor
const {DataTypes} = require("sequelize");
const connetion = require("../contexts/appContext");
const Autores = connetion.define("autores", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  autorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidadLibros: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = Autores;

