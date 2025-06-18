const express = require('express');
const router = express.Router();
const modeloOrdemServicoController = require('../controllers/modelo_ordem_servico.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação e autorização (apenas admin)
router.use(funcionarioController.autenticar);

// Rotas CRUD
router.get('/', modeloOrdemServicoController.buscarTodos);
router.get('/:id', modeloOrdemServicoController.buscarPorId);
router.post('/', funcionarioController.authorizePlanejador, modeloOrdemServicoController.cadastrar);
router.put('/:id', funcionarioController.authorizePlanejador, modeloOrdemServicoController.atualizar);
router.delete('/:id', funcionarioController.authorizePlanejador, modeloOrdemServicoController.apagar);

module.exports = router;