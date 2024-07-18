const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/categorias", categoriaController.getHome);
router.get("/adminAdd/categorias", categoriaController.getAdmAdd); //* Agregar
router.post("/postCategorias", categoriaController.postAdmAdd); //* Post Agregar
router.post("/eliminarCategoria", categoriaController.postEliminar); //* Post Eliminar
router.get("/adminEdd/categorias/:elemetnId", categoriaController.getAdmEdd); //* Editar
router.post("/adminEdd/categorias/post", categoriaController.postEditar); //* Post Editar

module.exports = router;
