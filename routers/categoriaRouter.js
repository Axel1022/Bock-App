const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.get("/categorias", categoriaController.getHome);
router.get("/admin/categorias", categoriaController.getAdm);
module.exports = router;
