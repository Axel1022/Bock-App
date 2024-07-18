const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorialeController");

router.get("/editoriales", editorController.getHome);
router.get("/adminAdd/editoriales", editorController.getAdmAdd); //* Agregar
router.post("/postEditoriales", editorController.postAdmAdd); //* Post Agregar
router.post("/eliminarEditorial", editorController.postEliminar); //* Post Agregar
router.get("/adminEdd/editoriales/:elemetnId", editorController.getAdmEdd); //* Editar
router.post("/adminEdd/editoriales/post", editorController.postEditar); //* Post Editar

module.exports = router;
