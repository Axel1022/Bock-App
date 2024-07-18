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
// exports.getAdmEdd = (req, res, next) => {
//   // Para editar
//   res.render("categorias/admEditar", {
//     pageTitle: "CampuLibrary | Editar - {{this.name}}",
//   });
// };
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
exports.getAdmEdd = (req, res, next) => {
  // Para editar
  const elemetnID = req.params.elemetnId;
  categoriaModel
    .findOne({ where: { id: elemetnID } })
    .then((result) => {
      if (result) {
        res.render("categorias/admEditar", {
          pageTitle: `CampuLibrary | Editar - ${result.categoríaName}`,
          Categoria: result.dataValues,
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
  const categoriaId = req.body.elemetnId;
  const nombre = req.body.Nombre;
  const descripcion = req.body.descripcion;

  categoriaModel
    .update(
      { categoríaName: nombre, descripcion },
      { where: { id: categoriaId } }
    )
    .then(() => {
      return res.redirect("/categorias");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEliminar = (req, res, next) => {
  const idElemt = req.body.eliminarId;
  categoriaModel
    .findOne({ where: { id: idElemt } })
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Categoria no encontrada");
        res.redirect("/categorias");
      }
    })
    .then(() => {
      console.log("Categoria eliminada");
      res.redirect("/categorias");
    })
    .catch((err) => {
      console.error("Error al eliminar la categoria: ", err);
      res.redirect("/categoria");
    });
};

