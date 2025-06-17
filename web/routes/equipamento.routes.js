const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamento.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar);

// Restrições por nível de acesso
router.use(funcionarioController.authorizeTecnico);

// Rotas CRUD
router.get('/', equipamentoController.buscarTodos);
router.get('/:id', equipamentoController.buscarPorId);
router.post('/', equipamentoController.cadastrar);
router.put('/:id', equipamentoController.atualizar);
router.delete('/:id',funcionarioController.authorizePlanejador,
    equipamentoController.apagar);

module.exports = router;