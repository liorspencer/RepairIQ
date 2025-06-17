const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar);

// Acesso apenas para administradores
router.use(funcionarioController.authorizeAdmin);

// Rotas CRUD
router.get('/', funcionarioController.buscarTodos);
router.get('/:id', funcionarioController.buscarPorId);
router.post('/', funcionarioController.cadastrar);
router.put('/:id', funcionarioController.atualizar);
module.exports = router;