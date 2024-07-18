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

exports.getAdmEdd = (req, res, next) => {
  // Este es para editar
  const elemetnID = req.params.elemetnId;
  autoresModel
    .findOne({ where: { id: elemetnID } })
    .then((result) => {
      if (result) {
        res.render("autores/admEditar", {
          pageTitle: `CampuLibrary | Editar - ${result.autorName}`,
          Autor: result.dataValues,
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
  const autorId = req.body.elemetnId;
  const nombre = req.body.Nombre;
  const correo = req.body.Correo;

  autoresModel
    .update({ autorName: nombre, correo }, { where: { id: autorId } })
    .then(() => {
      return res.redirect("/autores");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEliminar = (req, res, next) => {
  const idElemt = req.body.eliminarId;
  autoresModel
    .findOne({ where: { id: idElemt } })
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Autor no encontrado");
        res.redirect("/autores");
      }
    })
    .then(() => {
      console.log("Autor eliminado");
      res.redirect("/autores");
    })
    .catch((err) => {
      console.error("Error al eliminar al autor: ", err);
      res.redirect("/autores");
    });
};
