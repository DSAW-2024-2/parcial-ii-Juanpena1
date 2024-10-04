const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const loginRouter = require('./routes/login');
const weatherRouter = require('./routes/weather');

dotenv.config();
const app = express();

app.use(express.json());


app.use('/login', loginRouter);
app.use('/weather', weatherRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Esta ruta no existe' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
