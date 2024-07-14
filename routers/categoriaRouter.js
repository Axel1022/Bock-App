const express = require("express");
const router = express.Router();
const homeController = require("../controllers/categoriaController");

router.get("/categorias", homeController.getHome);

module.exports = router;
