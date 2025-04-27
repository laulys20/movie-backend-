const express = require("express");
const router = express.Router();
const { createMovie, getMovies, deleteMovie, updateMovie } = require("../controllers/movieController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createMovie);
router.get("/", auth, getMovies);
router.delete('/:id', auth, deleteMovie);
router.put("/:id", auth, updateMovie); 

module.exports = router;
