const express = require("express");
const BorrowCtrl = require("../controllers/borrow-ctrl");
const router = express.Router();

router.post("/", BorrowCtrl.toBorrow);
router.get("/");

module.exports = router;
