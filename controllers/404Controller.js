exports.get404 = (req, res, next) => {
  res.render("404", {
    pageTitle: "CampuLibrary | 404",
  });
};
