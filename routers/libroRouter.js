const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/libros", libroController.getHome);
router.get("/admin/libros", libroController.getAdm);


module.exports = router;
