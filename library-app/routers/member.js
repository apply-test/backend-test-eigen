const express = require("express");
const MemberCtrl = require("../controllers/member-ctrl");
const router = express.Router();

router.get("/", MemberCtrl.getAllMember);

module.exports = router;
