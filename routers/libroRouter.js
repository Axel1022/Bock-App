const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/libros", libroController.getHome);
router.get("/adminAdd/libros", libroController.getAdmAdd); //* Agregar
router.post("/postLibros", libroController.postAdmAdd); //* Post Agregar
router.post("/eliminarLibro", libroController.postEliminar); //* Post Agregar
router.get("/adminEdd/libros/:elemetnId", libroController.getAdmEdd); //* Editar
router.post("/adminEdd/libros/post", libroController.postEditar); //* Post Editar
module.exports = router;
