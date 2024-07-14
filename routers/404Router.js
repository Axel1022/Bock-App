const express = require("express");
const router = express.Router();

const error404 = require("../controllers/404Controller");
router.get("/", error404.get404);

module.exports = router;
