// r el nombre
// de la editorial, el teléfono, el país de la editorial y la cantidad de libros que
// tienen asociada esta editorial
const { DataTypes } = require("sequelize");
const connetion = require("../contexts/appContext");
const Editoriales = connetion.define("editoriales", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  editorialName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidadLibros: {
    //Debo hacer la relacion con la tabla libro.
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = Editoriales;
