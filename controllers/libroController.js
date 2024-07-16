const librosModel = require("../models/libros");
const categoriaModel = require("../models/categoria");

exports.getHome = (req, res, next) => {
  librosModel
    .findAll()
    .then((result) => {
      const libros = result.map((result) => result.dataValues);
      console.log(libros);
      res.render("libros/home", {
        pageTitle: "CampuLibrary | Libros",
        Libros: libros,
        hasLibros: libros.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAdmAdd = (req, res, next) => {
  res.render("libros/admAgregar", {
    pageTitle: "CampuLibrary | Agregar - Libros",
  });
};
exports.getAdmEdd = (req, res, next) => {
  res.render("libros/admEditar", {
    pageTitle: "CampuLibrary | Editar - Libros",
  });
};
exports.postAdmAdd = (req, res, next) => {
  const titulo = req.body.titulo;
  const url = req.body.url;
  const anio = req.body.anio;
  const categoria = req.body.categoria;
  const autor = req.body.autor;
  const editorial = req.body.editorial;
  librosModel
    .create({
      titlulo: titulo,
      urlImg: url,
      anioPublic: anio,
      idCategoria: 0,
      idAutor: 0,
      idEditorial: 0,
    })
    .then((result) => {
      console.log(result.dataValues); //Ver los resultados del insert
      return res.redirect("/libros");
    })
    .catch((error) => {
      console.log(error);
    });
};
