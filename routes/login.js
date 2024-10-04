const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USER = {
  email: 'admin@admin.com',
  password: 'admin'
};

router.post('/', (req, res) => {
  const { email, password } = req.body;
 
  if (email === USER.email && password === USER.password) {
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Autenticación exitosa', token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

module.exports = router;