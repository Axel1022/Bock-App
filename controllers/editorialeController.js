const editorialesModel = require("../models/editoriales");
exports.getHome = (req, res, next) => {
  editorialesModel.findAll().then((result) => {
    const editoriales = result.map((result) => result.dataValues);
    res.render("editoriales/home", {
      pageTitle: "CampuLibrary | Editores",
      Editoriales: editoriales,
      hasEditoriales: editoriales.length > 0,
    });
  });
};
exports.getAdmAdd = (req, res, next) => {
  res.render("editoriales/admAgregar", {
    pageTitle: "CampuLibrary | Agregar - Editoriales",
  });
};
exports.getAdmEdd = (req, res, next) => {
  res.render("editoriales/admEditar", {
    pageTitle: "CampuLibrary | Editar - Editoriales",
  });
};
exports.postAdmAdd = (req, res, next) => {
  const nombre = req.body.Nombre;
  const telefono = req.body.telefono;
  const pais = req.body.pais;
  editorialesModel
    .create({
      editorialName: nombre,
      telefono,
      pais,
      cantidadLibros: 0,
    })
    .then((result) => {
      console.log(result.dataValues); //Ver los resultados del insert
      return res.redirect("/editoriales");
    })
    .catch((error) => {
      console.log(error);
    });
};
