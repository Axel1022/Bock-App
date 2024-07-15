exports.getHome = (req, res, next) => {
  res.render("editoriales/home", {
    pageTitle: "CampuLibrary | Editores",
  });
};
exports.getAdm = (req, res, next) => {
  res.render("editoriales/adm", {
    pageTitle: "CampuLibrary | Adm - Editoriales",
  });
};
