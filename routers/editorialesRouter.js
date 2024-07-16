const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorialeController");

router.get("/editoriales", editorController.getHome);
router.get("/adminAdd/editoriales", editorController.getAdmAdd);
router.post("/postEditoriales", editorController.postAdmAdd);
router.get("/adminEdd/editoriales", editorController.getAdmEdd);


module.exports = router;
