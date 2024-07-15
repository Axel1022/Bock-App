exports.getHome = (req, res, next) => {
  res.render("editores/home", {
    pageTitle: "CampuLibrary | Editores",
  });
};
