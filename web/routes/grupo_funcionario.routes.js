const express = require('express');
const router = express.Router();
const grupoFuncionarioController = require('../controllers/grupo_funcionario.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação e autorização (apenas admin)
router.use(funcionarioController.autenticar, funcionarioController.authorizeAdmin);

// Rotas CRUD
router.get('/', grupoFuncionarioController.buscarTodos);
router.get('/:id', grupoFuncionarioController.buscarPorId);
router.post('/', grupoFuncionarioController.cadastrar);
router.put('/:id', grupoFuncionarioController.atualizar);
router.delete('/:id', grupoFuncionarioController.apagar);

module.exports = router;