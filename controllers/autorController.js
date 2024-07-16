const autoresModel = require("../models/autores");

exports.getHome = (req, res, next) => {
  // Este es para presentar el home
  autoresModel.findAll().then((result) => {
    const autores = result.map((result) => result.dataValues);
    res.render("autores/home", {
      pageTitle: "CampuLibrary | Autores",
      Autores: autores,
      hasAutores: autores.length > 0,
    });
  });
};

exports.getAdmAdd = (req, res, next) => {
  //Para agregar
  res.render("autores/admAgregar", {
    pageTitle: "CampuLibrary | Agregar - Autores",
  });
};
exports.getAdmEdd = (req, res, next) => {
  //Para editar
  res.render("autores/admEditar", {
    pageTitle: "CampuLibrary | Editar - {{this.name}}",
  });
};
exports.postAdmAdd = (req, res, next) => {
  //Este es para agregar
  const nombre = req.body.Nombre;
  const correo = req.body.Correo;
  autoresModel
    .create({
      autorName: nombre,
      correo,
      cantidadLibros: 0,
    })
    .then((result) => {
      console.log(result.dataValues);
      return res.redirect("/autores");
    })
    .catch((error) => {
      console.log(error);
    });
};
