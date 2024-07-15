const express = require("express");
const router = express.Router();
const autorController = require("../controllers/autorController");

router.get("/autores", autorController.getHome);
router.get("/admin/autores", autorController.getAdm);
module.exports = router;
