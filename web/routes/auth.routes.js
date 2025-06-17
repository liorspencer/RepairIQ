const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionario.controller');

// Rota de registro (apenas admin pode registrar novos usuários)
router.post('/register', 
  funcionarioController.autenticar,
  funcionarioController.authorizeAdmin,
  funcionarioController.cadastrar
);

// Rota de login (pública)
router.post('/login', funcionarioController.login);

// Rota de perfil (requer autenticação)
router.get('/profile', 
  funcionarioController.autenticar, 
  (req, res) => {
    res.json({ 
      message: 'Acesso permitido', 
      user: req.user 
    });
  }
);

module.exports = router;