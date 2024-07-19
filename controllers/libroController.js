const librosModel = require("../models/libros");
const categoriaModel = require("../models/categoria");
const autoresModel = require("../models/autores");
const editorialesModel = require("../models/editoriales");
const verifica = require("../utils/editCass");
const path = require("path");

exports.getHome = (req, res, next) => {
  librosModel
    .findAll()
    .then((result) => {
      libros = result.map((result) => result.dataValues);
      //console.log(categorias);
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
  categoriaModel
    .findAll()
    .then((results) => {
      const categorias = results.map((result) => result.dataValues);
      autoresModel
        .findAll()
        .then((results) => {
          const autores = results.map((result) => result.dataValues);
          editorialesModel
            .findAll()
            .then((results) => {
              const editoriales = results.map((result) => result.dataValues);
              res.render("libros/admAgregar", {
                pageTitle: "CampuLibrary | Agregar - Libros",
                Categorias: categorias,
                Autores: autores,
                Editoriales: editoriales,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
// const path = require("path"); // Importa el módulo path

exports.postAdmAdd = (req, res, next) => {
  const titulo = req.body.titulo;
  const file = req.file;
  const anio = req.body.anio;
  const idcategoria = req.body.categoria;
  const idautor = req.body.autor;
  const ideditorial = req.body.editorial;

  if (!file) {
    console.log("No se ha subido ningún archivo.");
    return;
  }

  // Normaliza la ruta del archivo
  const filePath = path.posix.join("/assets/img", file.filename);
  console.log("El path: ", filePath);

  categoriaModel
    .findOne({ where: { id: idcategoria } })
    .then((result) => {
      if (result) {
        const categoria = result.dataValues;
        result.cantidadLibros += 1;
        result
          .save()
          .then(() => {
            console.log("Categoria actualizada:");
          })
          .catch((err) => {
            console.error("Error al guardar la categoría:", err);
          });
        autoresModel
          .findOne({ where: { id: idautor } })
          .then((result) => {
            if (result) {
              const autor = result.dataValues;
              result.cantidadLibros += 1;
              result
                .save()
                .then(() => {
                  console.log("Autor actualizado");
                })
                .catch((err) => {
                  console.error("Error al guardar la autor:", err);
                });
              editorialesModel
                .findOne({ where: { id: ideditorial } })
                .then((result) => {
                  if (result) {
                    const editorial = result.dataValues;
                    result.cantidadLibros += 1;
                    result
                      .save()
                      .then(() => {
                        console.log("Editorial actualizado");
                      })
                      .catch((err) => {
                        console.error("Error al guardar la editorial:", err);
                      });

                    librosModel
                      .create({
                        titlulo: titulo,
                        imgPath: filePath,
                        anioPublic: anio,
                        Categoria: categoria["categoríaName"],
                        Autor: autor["autorName"],
                        Editorial: editorial["editorialName"],
                      })
                      .then((result) => {
                        // console.log(result.dataValues); // Ver los resultados del insert
                        console.log("Libro agregado con éxito!");
                        return res.redirect("/libros");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    console.log("Editorial no encontrada");
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              console.log("Autor no encontrado");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Categoria no encontrada");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAdmEdd = (req, res, next) => {
  categoriaModel
    .findAll()
    .then((results) => {
      const categorias = results.map((result) => result.dataValues);
      autoresModel
        .findAll()
        .then((results) => {
          const autores = results.map((result) => result.dataValues);
          editorialesModel
            .findAll()
            .then((results) => {
              const editoriales = results.map((result) => result.dataValues);
              const elemetnID = req.params.elemetnId;
              librosModel
                .findOne({ where: { id: elemetnID } })
                .then((libroData) => {
                  if (libroData) {
                    res.render("libros/admEditar", {
                      pageTitle: "CampuLibrary | Editar - Libros",
                      Categorias: categorias,
                      Autores: autores,
                      Editoriales: editoriales,
                      Libro: libroData.dataValues,
                    });
                  } else {
                    res.redirect("/libros");
                  }
                })
                .catch((err) => {
                  console.error("Error al consegir los datos del libro: ", err);
                  res.redirect("/libors");
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
// const path = require("path");

exports.postEditar = (req, res, next) => {
  const librolId = req.body.elemetnId;
  const titulo = req.body.titulo;
  const file = req.file;
  const anio = req.body.anio;
  const idcategoria = req.body.categoria;
  const idautor = req.body.autor;
  const ideditorial = req.body.editorial;

  let filePath;

  if (file) {
    // Normaliza la ruta del archivo si hay un archivo
    filePath = path.posix.join("/assets/img", file.filename);
  }

  //TODO: Tengo que convertir esos ids en sus respectivos nombres.

  categoriaModel
    .findOne({ where: { id: idcategoria } })
    .then((result) => {
      if (result) {
        const categoria = result.dataValues;
        autoresModel
          .findOne({ where: { id: idautor } })
          .then((result) => {
            if (result) {
              const autor = result.dataValues;
              editorialesModel
                .findOne({ where: { id: ideditorial } })
                .then((result) => {
                  if (result) {
                    const editorial = result.dataValues;
                    librosModel
                      .findOne({ where: { id: librolId } })
                      .then((libro) => {
                        if (!libro) {
                          return res.redirect("/libros");
                        }

                        let updates = {
                          titulo: titulo,
                          anioPublic: anio,
                          Categoria: categoria["categoríaName"],
                          Autor: autor["autorName"],
                          Editorial: editorial["editorialName"],
                        };

                        if (file) {
                          updates.imgPath = filePath;
                        }

                        return librosModel.update(updates, {
                          where: { id: librolId },
                        });
                      })
                      .then(() => {
                        return res.redirect("/libros");
                      })
                      .catch((error) => {
                        console.log(error);
                        res.redirect("/libros");
                      });
                  } else {
                    console.log("Editorial no encontrada");
                    return res.redirect("/libros");
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              console.log("Autor no encontrado");
              return res.redirect("/libros");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Categoria no encontrada");
        return res.redirect("/libros");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postEliminar = (req, res, next) => {
  const idElemt = req.body.eliminarId;
  librosModel
    .findOne({ where: { id: idElemt } })
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Libro no encontrado");
        res.redirect("/libros");
      }
    })
    .then(() => {
      console.log("Libro eliminado");
      res.redirect("/libros");
    })
    .catch((err) => {
      console.error("Error al eliminar el libro: ", err);
      res.redirect("/libros");
    });
};
