exports.getHome = (req, res, next) => {
  res.render("libros/home", {
    pageTitle: "CampuLibrary | Libros",
  });
};
exports.getAdm = (req, res, next) => {
  res.render("libros/adm", {
    pageTitle: "CampuLibrary | Adm - Libros",
  });
};
