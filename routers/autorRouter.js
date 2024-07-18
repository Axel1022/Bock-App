const express = require("express");
const router = express.Router();
const autorController = require("../controllers/autorController");

router.get("/autores", autorController.getHome);
router.get("/adminAdd/autores", autorController.getAdmAdd); //* Agregar
router.post("/postAutores", autorController.postAdmAdd); //* Post Agregar
router.post("/eliminarAutor", autorController.postEliminar); //* Post Eliminar
router.get("/adminEdd/autores/:elemetnId", autorController.getAdmEdd); //* Post Editar
router.post("/adminEdd/autores/post", autorController.postEditar); //* Post Editar
module.exports = router;
