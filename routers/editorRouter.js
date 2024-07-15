const express = require("express");
const router = express.Router();
const homeController = require("../controllers/editorController");

router.get("/editoriales", homeController.getHome);

module.exports = router;
