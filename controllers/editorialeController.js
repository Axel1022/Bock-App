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
// exports.getAdmEdd = (req, res, next) => {
//   res.render("editoriales/admEditar", {
//     pageTitle: "CampuLibrary | Editar - Editoriales",
//   });
// };
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
exports.getAdmEdd = (req, res, next) => {
  const elemetnID = req.params.elemetnId;
  editorialesModel
    .findOne({ where: { id: elemetnID } })
    .then((result) => {
      if (result) {
        res.render("editoriales/admEditar", {
          pageTitle: "CampuLibrary | Editar - Editoriales",
          Editorial: result.dataValues,
        });
      } else {
        res.redirect("/autores");
      }
    })
    .catch((err) => {
      console.error("Error al eliminar al autor: ", err);
      res.redirect("/autores");
    });
};

exports.postEditar = (req, res, next) => {
  const editorialId = req.body.elemetnId;
  const nombre = req.body.Nombre;
  const telefono = req.body.telefono;
  const pais = req.body.pais;

  editorialesModel
    .update(
      { editorialName: nombre, telefono, pais },
      { where: { id: editorialId } }
    )
    .then(() => {
      return res.redirect("/editoriales");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEliminar = (req, res, next) => {
  const idElemt = req.body.eliminarId;
  editorialesModel
    .findOne({ where: { id: idElemt } })
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Editorial no encontrada");
        res.redirect("/editoriales");
      }
    })
    .then(() => {
      console.log("Editorial eliminada");
      res.redirect("/editoriales");
    })
    .catch((err) => {
      console.error("Error al eliminar la editorial: ", err);
      res.redirect("/editoriales");
    });
};
