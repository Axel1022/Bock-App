const express = require("express");
const router = express.Router();
const homeController = require("../controllers/autorController");

router.get("/autores", homeController.getHome);

module.exports = router;
