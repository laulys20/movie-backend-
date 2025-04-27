const Movie = require("../models/Movie");

// Crear una nueva película
const createMovie = async (req, res) => {
  try {
    const { title, genre, year } = req.body;

    const newMovie = new Movie({
      title,
      genre,
      year,
      user: req.userId, 
    });

    const savedMovie = await newMovie.save();
    res.status(201).json({ message: "Película guardada con éxito", movie: savedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la película", error: error.message });
  }
};

// Obtener todas las películas del usuario autenticado
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.userId });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas", error: error.message });
  }
};

// Eliminar una película por ID, solo si pertenece al usuario autenticado
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Película no encontrada o no autorizada" });
    }

    res.status(200).json({ message: "Película eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película", error: error.message });
  }
};

// Actualizar una película por ID
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, year } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, genre, year },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Película no encontrada o no autorizada" });
    }

    res.status(200).json({ message: "Película actualizada con éxito", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la película", error: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  updateMovie,
};
