const categoriaModel = require("../models/categoria");
exports.getHome = (req, res, next) => {
  categoriaModel.findAll().then((result) => {
    const categorias = result.map((result) => result.dataValues);
    res.render("categorias/home", {
      pageTitle: "CampuLibrary | Categorias",
      Categorias: categorias,
      hasCategoria: categorias.length > 0,
    });
  });
};
exports.getAdmAdd = (req, res, next) => {
  //Para agregar
  res.render("categorias/admAgregar", {
    pageTitle: "CampuLibrary | Agregar - Categorias",
  });
};
exports.getAdmEdd = (req, res, next) => {
  // Para editar
  res.render("categorias/admEditar", {
    pageTitle: "CampuLibrary | Editar - {{this.name}}",
  });
};
exports.postAdmAdd = (req, res, next) => {
  const nombre = req.body.Nombre;
  const descripcion = req.body.descripcion;
  categoriaModel
    .create({
      categoríaName: nombre,
      descripcion: descripcion,
      cantidadLibros: 0,
    })
    .then((result) => {
      console.log(result.dataValues); //Ver los resultados del insert
      return res.redirect("/categorias");
    })
    .catch((error) => {
      console.log(error);
    });
};
