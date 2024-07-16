const express = require("express");
const router = express.Router();
const autorController = require("../controllers/autorController");

router.get("/autores", autorController.getHome);
router.get("/adminAdd/autores", autorController.getAdmAdd); //* Agregar
router.post("/postAutores", autorController.postAdmAdd); //* Agregar
router.get("/adminEdd/autores", autorController.getAdmEdd); //* Editar
module.exports = router;
