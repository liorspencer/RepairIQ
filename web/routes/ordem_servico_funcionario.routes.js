const express = require('express');
const router = express.Router();
const ordemServicoFuncionarioController = require('../controllers/ordem_servico_funcionario.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar,funcionarioController.authorizeTecnico);

// Rotas de atribuição
router.get('/ordem-servico/:ordemServicoId', ordemServicoFuncionarioController.buscarPorOrdemServico);
router.get('/funcionario/:funcionarioId', ordemServicoFuncionarioController.buscarPorFuncionario);
router.post('/ordem-servico/:ordemServicoId/assign', ordemServicoFuncionarioController.atribuir);
router.put('/ordem-servico/:ordemServicoId/funcionario/:funcionarioId/complete', ordemServicoFuncionarioController.completar);
router.delete('/ordem-servico/:ordemServicoId/funcionario/:funcionarioId', ordemServicoFuncionarioController.remove);

module.exports = router;