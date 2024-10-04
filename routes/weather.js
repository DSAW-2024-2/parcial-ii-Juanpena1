const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = decoded;
    next();
  });
};

const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

router.get('/', verifyToken, async (req, res) => {
  const { latitude, longitude } = req.query;

  
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Ingrese latitud y longitud' });
  }
  if (!isNumber(latitude) || !isNumber(longitude)) {
    return res.status(400).json({ message: 'Valores incorrectos' });
  }

  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current_weather: true
      }
    });
    const { temperature } = response.data.current_weather;
    res.json({ temperature });
  } catch (error) {
    res.status(500).json({ message: 'No se pudo obtener valores del clima', error: error.message });
  }
});

module.exports = router;