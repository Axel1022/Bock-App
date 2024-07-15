// título del libro, la imagen de
// portada, el año de publicación, la categoría al que pertenece, el autor de libro y
// el editorial del libro

const { DataTypes } = require("sequelize");
const connetion = require("../contexts/appContext");
const Libros = connetion.define("libros", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titlulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anioPublic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idCategoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idAutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idEditorial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Libros;
