const express = require("express");
const router = express.Router();

const { getAllproducts, getAllproductsTesting } = require("../controller/prod");

router.route("/").get(getAllproducts);
router.route("/testing").get(getAllproductsTesting);

module.exports = router;
