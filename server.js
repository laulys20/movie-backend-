const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes"); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes); 

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  })
  //Error
  //cometarioparacambiobcryptjs
  .catch((err) => console.error("❌ Error conectando MongoDB:", err));
