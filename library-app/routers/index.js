const express = require("express");
const BorrowCtrl = require("../controllers/borrow-ctrl");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello!! you connected with the API");
});

router.use("/members", require("./member"));
router.use("/books", require("./book"));

router.post("/borrows", BorrowCtrl.toBorrow);
router.post("/returns", BorrowCtrl.toReturn);

module.exports = router;
