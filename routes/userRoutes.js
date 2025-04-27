const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);


router.get("/test", (req, res) => {
  res.json({ message: "Funciona el test" });
});

module.exports = router;
