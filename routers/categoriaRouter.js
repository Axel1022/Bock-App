const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/categorias", categoriaController.getHome);
router.get("/adminAdd/categorias", categoriaController.getAdmAdd); //* Agregar
router.post("/postCategorias", categoriaController.postAdmAdd); //* Post Agregar
router.get("/adminEdd/categorias", categoriaController.getAdmEdd); //* Editar
module.exports = router;
