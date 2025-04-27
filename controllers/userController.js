const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si el email ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email ya registrado" });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email no registrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login correcto", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};

module.exports = { register, login };
