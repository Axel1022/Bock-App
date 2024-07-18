const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getHome);
router.get("/detalle/:idElement", homeController.getDetalle);
router.post("/libros/filtrar", homeController.postFiltro);


module.exports = router;
