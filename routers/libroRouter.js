const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");

router.get("/libros", libroController.getHome);
router.get("/adminAdd/libros", libroController.getAdmAdd);
router.post("/postLibros", libroController.postAdmAdd);
router.get("/adminEdd/libros", libroController.getAdmEdd);


module.exports = router;
