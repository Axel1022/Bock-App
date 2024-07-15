const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorialeController");

router.get("/editoriales", editorController.getHome);
router.get("/admin/editoriales", editorController.getAdm);


module.exports = router;
