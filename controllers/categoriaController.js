exports.getHome = (req, res, next) => {
  res.render("categorias/home", {
    pageTitle: "CampuLibrary | Categorias",
  });
};
exports.getAdm = (req, res, next) => {
  res.render("categorias/adm", {
    pageTitle: "CampuLibrary | Adm - Categorias",
  });
};
