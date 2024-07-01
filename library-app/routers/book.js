const express = require("express");
const BookCtrl = require("../controllers/book-ctrl");
const router = express.Router();

router.get("/", BookCtrl.getAll);
router.get("/available", BookCtrl.getAvailable);
router.get("/unavailable", BookCtrl.getUnavailable);

module.exports = router;
