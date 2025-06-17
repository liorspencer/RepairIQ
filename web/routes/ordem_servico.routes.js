const express = require('express');
const router = express.Router();
const ordemServicoController = require('../controllers/ordem_servico.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar);

// Restrições por nível de acesso
router.use(funcionarioController.authorizeTecnico);

// Rotas CRUD
router.get('/', ordemServicoController.buscarTodos);
router.get('/:id', ordemServicoController.buscarPorId);
router.get('/equipamento/:equipamentoId', ordemServicoController.buscarPorEquipamento);
router.get('/ocorrencia/:ocorrenciaId', ordemServicoController.buscarPorOcorrencia);
router.post('/', ordemServicoController.cadastrar);
router.put('/:id', ordemServicoController.atualizar);
router.put('/:id/fechar', ordemServicoController.fechar);
router.delete('/:id',
    funcionarioController.authorizePlanejador,
    ordemServicoController.apagar);

module.exports = router;