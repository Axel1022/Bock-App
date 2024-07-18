const { Op } = require("sequelize");
const librosModel = require("../models/libros");
const categoriasModel = require("../models/categoria");

exports.getHome = async (req, res, next) => {
  const resulTT = await librosModel.findAll();
  const libros = resulTT.map((resulTT) => resulTT.dataValues);
  categoriasModel.findAll().then((result) => {
    const categorias = result.map((result) => result.dataValues);
    res.render("home/index", {
      pageTitle: "CampuLibrary | Home",
      Libros: libros,
      hasLibros: libros.length > 0,
      Categorias: categorias,
    });
  });
};

exports.postFiltro = async (req, res, next) => {
  const titulo = req.body.titulo;
  const categoriasbody = req.body.categorias;
  try {
    let categorias = await categoriasModel.findAll();
    categorias = categorias.map((resulTT) => resulTT.dataValues);

    let libros = [];
    let libros2 = [];

    if (titulo) {
      libros = await librosModel.findAll({ where: { titlulo: titulo } });
      libros = libros.map((resulTT) => resulTT.dataValues);
    }

    if (categoriasbody) {
      libros2 = await librosModel.findAll({
        where: { Categoria: categoriasbody },
      });
      libros2 = libros2.map((resulTT) => resulTT.dataValues);
    }

    let libroscompletos = [...libros, ...libros2];

    res.render("home/index", {
      pageTitle: "CampuLibrary | Home",
      Libros: libroscompletos,
      hasLibros: libroscompletos.length > 0,
      Categoria: categorias,
    });
  } catch (error) {
    console.error("Error al buscar libros:", error);
    res.redirect("/");
  }
};

exports.getDetalle = async (req, res, next) => {
  try {
    const idElemento = req.params.idElement;
    const libro = await librosModel.findOne({ where: { id: idElemento } });

    if (!libro) {
      console.log("Libro no encontrado");
      return res.redirect("/libros");
    }

    const categoria = await categoriasModel.findOne({
      where: { categoríaName: libro.Categoria },
    });

    if (!categoria) {
      console.log("Categoría no encontrada");
      return res.redirect("/categorias");
    }

    res.render("home/detalle", {
      pageTitle: "CampuLibrary | Detalle | Libro",
      Detalle: libro.dataValues,
      Categoria: categoria.dataValues,
    });
  } catch (err) {
    console.error("Error al obtener el detalle del libro: ", err);
    res.redirect("/libros");
  }
};
