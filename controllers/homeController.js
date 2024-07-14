exports.getHome = (req, res, next) => {
  res.render("home/index", {
    pageTitle: "CampuLibrary | Home",
  });
};
