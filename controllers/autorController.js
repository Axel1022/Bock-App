exports.getHome = (req, res, next) => {
  res.render("autores/home", {
    pageTitle: "CampuLibrary | Autores",
  });
};
