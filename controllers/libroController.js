const librosModel = require("../models/libros");
const categoriaModel = require("../models/categoria");
const autoresModel = require("../models/autores");
const editorialesModel = require("../models/editoriales");
const verifica = require("../utils/editCass");

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
exports.postAdmAdd = (req, res, next) => {
  const titulo = req.body.titulo;
  const url = req.body.url;
  const anio = req.body.anio;
  const idcategoria = req.body.categoria;
  const idautor = req.body.autor;
  const ideditorial = req.body.editorial;

  //TODO: Tengo que convertir esos ids en sus respectivos nombres.

  // console.log("Id de categoria: ", idcategoria);
  // console.log("Id de autor: ", idautor);
  // console.log("Id de editorial: ", ideditorial);

  //TODO: Logica para actualizar los libros asociados...
  //* Lo que he pensado no es la mejor forma, lo sé pero... XD
  //! La idea es que al momento de agregar un libro, yo busque el item al que corresponde el id
  //! luego actualice el campo cantidadLibros!
  //? Manos a la obra!

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
                        console.error("Error al guardar la edutorial:", err);
                      });
                    librosModel
                      .create({
                        titlulo: titulo,
                        urlImg: url,
                        anioPublic: anio,
                        Categoria: categoria["categoríaName"],
                        Autor: autor["autorName"],
                        Editorial: editorial["editorialName"],
                      })
                      .then((result) => {
                        //console.log(result.dataValues); //Ver los resultados del insert
                        console.log("Soy el mejor!");
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
exports.postEditar = (req, res, next) => {
  const librolId = req.body.elemetnId;
  const titulo = req.body.titulo;
  const url = req.body.url;
  const anio = req.body.anio;
  const idcategoria = req.body.categoria;
  const idautor = req.body.autor;
  const ideditorial = req.body.editorial;

  //TODO: Tengo que convertir esos ids en sus respectivos nombres.

  // console.log("Id de categoria: ", idcategoria);
  // console.log("Id de autor: ", idautor);
  // console.log("Id de editorial: ", ideditorial);

  //TODO: Logica para actualizar los libros asociados...
  //* Lo que he pensado no es la mejor forma, lo sé pero... XD
  //! La idea es que al momento de agregar un libro, yo busque el item al que corresponde el id
  //! luego actualice el campo cantidadLibros!
  //? Manos a la obra!

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

                        console.log(`Categoría: ${libro.Categoria}`);
                        console.log(`Autor: ${libro.Autor}`);
                        console.log(`Editorial: ${libro.Editorial}`);
                        //Aqui viene mi mangu, xd
                        //TODO: La idea es verificar si son diferentes, si lo son, pues le resto 1 en libros a la categoria, autor o editorial y luego le sumo 1 al nuevo item...
                        //* Creo que se entiende, xd

                        //! Para categoria
                        let veri = verifica(
                          //Verifica si son diferente, esto trae true o false
                          libro.Categoria,
                          categoria["categoríaName"]
                        );
                        if (!veri) {
                          console.log("xd"); // Aqui no ha pasado nada (es la misma categoria, xd)
                        } else {
                          //Si la categoria ha cambiado
                          categoriaModel
                            .findOne({
                              //Buscar lel registro que tenga esa categoria...
                              where: {
                                categoríaName: libro.Categoria,
                              },
                            })
                            .then((result) => {
                              if (result) {
                                result.cantidadLibros -= 1; // Se le resta 1 porque la cambiaron, es facil de entender, no?
                                result
                                  .save()
                                  .then(() => {
                                    console.log(
                                      "Cale -1 actualizado: ",
                                      libro.Categoria
                                    );
                                  })
                                  .catch((err) => {
                                    console.error(
                                      "Error al guardar la autor:",
                                      err
                                    );
                                  });
                                categoriaModel //Esta parte es para buscar el registro de la categoria por la que cambió...
                                  .findOne({
                                    where: {
                                      categoríaName: categoria["categoríaName"], //Esta es la categoria nueva
                                    },
                                  })
                                  .then((result) => {
                                    if (result) {
                                      result.cantidadLibros += 1; //Se le suma 1
                                      result
                                        .save()
                                        .then(() => {
                                          console.log(
                                            "Cate +1 actualizado: ",
                                            categoria["categoríaName"]
                                          );
                                        })
                                        .catch((err) => {
                                          console.error(
                                            "Error al guardar la autor:",
                                            err
                                          );
                                        });
                                    }
                                  });
                              }
                            });
                        } //Fin, xd
                        //! Para Editorial
                        veri = verifica(
                          //Verifica si son diferente, esto trae true o false
                          libro.Editorial,
                          autor["autorName"]
                        );
                        if (!veri) {
                          console.log("xd"); // Aqui no ha pasado nada (es la misma categoria, xd)
                        } else {
                          //Si la categoria ha cambiado
                          autoresModel
                            .findOne({
                              //Buscar lel registro que tenga esa categoria...
                              where: {
                                autorName: libro.Autor,
                              },
                            })
                            .then((result) => {
                              if (result) {
                                result.cantidadLibros -= 1; // Se le resta 1 porque la cambiaron, es facil de entender, no?
                                result
                                  .save()
                                  .then(() => {
                                    console.log(
                                      "Libro -1 actualizado: ",
                                      libro.Autor
                                    );
                                  })
                                  .catch((err) => {
                                    console.error(
                                      "Error al actualizar el autor:",
                                      err
                                    );
                                  });
                                autoresModel //Esta parte es para buscar el registro de la categoria por la que cambió...
                                  .findOne({
                                    where: {
                                      autorName: autor["autorName"], //Esta es la categoria nueva
                                    },
                                  })
                                  .then((result) => {
                                    if (result) {
                                      result.cantidadLibros += 1; //Se le suma 1
                                      result
                                        .save()
                                        .then(() => {
                                          console.log(
                                            "Cate +1 actualizado: ",
                                            autor["autorName"]
                                          );
                                        })
                                        .catch((err) => {
                                          console.error(
                                            "Error al guardar la autor:",
                                            err
                                          );
                                        });
                                    }
                                  });
                              }
                            });
                        } //Fin, xd
                        veri = verifica(
                          //Verifica si son diferente, esto trae true o false
                          libro.Autor,
                          editorial["editorialName"]
                        );
                        if (!veri) {
                          console.log("xd"); // Aqui no ha pasado nada (es la misma categoria, xd)
                        } else {
                          //Si la categoria ha cambiado
                          editorialesModel
                            .findOne({
                              //Buscar lel registro que tenga esa categoria...
                              where: {
                                editorialName: libro.Editorial,
                              },
                            })
                            .then((result) => {
                              if (result) {
                                result.cantidadLibros -= 1; // Se le resta 1 porque la cambiaron, es facil de entender, no?
                                result
                                  .save()
                                  .then(() => {
                                    console.log(
                                      "Edi -1 actualizado: ",
                                      libro.Autor
                                    );
                                  })
                                  .catch((err) => {
                                    console.error(
                                      "Error al actualizar la edi:",
                                      err
                                    );
                                  });
                                editorialesModel //Esta parte es para buscar el registro de la categoria por la que cambió...
                                  .findOne({
                                    where: {
                                      editorialName: editorial["editorialName"], //Esta es la categoria nueva
                                    },
                                  })
                                  .then((result) => {
                                    if (result) {
                                      result.cantidadLibros += 1; //Se le suma 1
                                      result
                                        .save()
                                        .then(() => {
                                          console.log(
                                            "Edi +1 actualizado: ",
                                            editorial["editorialName"]
                                          );
                                        })
                                        .catch((err) => {
                                          console.error(
                                            "Error al guardar la autor:",
                                            err
                                          );
                                        });
                                    }
                                  });
                              }
                            });
                        } //Fin, xd

                        //! Que se puede mejorar eso? pos claro, estamos de acerdo ;)
                        //Tengo que hacer esto 2 veces mas 😵

                        //Aqui simplemetne actualizamos, fin de la ecuaciion
                        return librosModel.update(
                          {
                            titulo: titulo,
                            urlImg: url,
                            anioPublic: anio,
                            Categoria: categoria["categoríaName"],
                            Autor: autor["autorName"],
                            Editorial: editorial["editorialName"],
                          },
                          { where: { id: librolId } }
                        );
                        //Honestamente ya no estoy entendiendo lo que estopy haciendo, xd
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
