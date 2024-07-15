exports.getHome = (req, res, next) => {
  res.render("home/index", {
    pageTitle: "CampuLibrary | Home",
  });
};
exports.getDetalle = (req, res, next) => {
  res.render("home/detalle", {
    pageTitle: "CampuLibrary | Detalle | Libro!",
  });
};
