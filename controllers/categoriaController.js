exports.getHome = (req, res, next) => {
  res.render("categorias/home", {
    pageTitle: "CampuLibrary | Categorias",
  });
};
