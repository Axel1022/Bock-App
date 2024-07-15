exports.getHome = (req, res, next) => {
  res.render("autores/home", {
    pageTitle: "CampuLibrary | Autores",
  });
};
exports.getAdm = (req, res, next) => {
  res.render("autores/adm", {
    pageTitle: "CampuLibrary | Adm - Autores",
  });
};
