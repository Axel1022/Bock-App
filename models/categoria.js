//  el nombre
// de la categoría, la descripción, la cantidad de libros que tienen asociada esta
// categoría
const { DataTypes } = require("sequelize");
const connetion = require("../contexts/appContext");
const Categorias = connetion.define("categorias", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  categoríaName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidadLibros: {
    //Debo hacer la relacion con la tabla libro.
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = Categorias;
