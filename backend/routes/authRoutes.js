const router = require("express").Router();
const { login, callback } = require("../controllers/authController");

router.get("/login", login);
router.get("/callback", callback);
module.exports = router;
