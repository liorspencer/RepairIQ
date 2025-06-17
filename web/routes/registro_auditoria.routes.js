const express = require('express');
const router = express.Router();
const registroAuditoriaController = require('../controllers/registro_auditoria.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação e autorização (apenas admin)
router.use(funcionarioController.autenticar);

// Rotas CRUD
router.get('/', funcionarioController.authorizePlanejador, registroAuditoriaController.buscarTodos);
router.get('/:id', funcionarioController.authorizePlanejador, registroAuditoriaController.buscarPorId);
router.get('/funcionario/:funcionarioId', funcionarioController.authorizePlanejador, registroAuditoriaController.buscarPorFuncionario);
router.post('/', registroAuditoriaController.cadastrar);

module.exports = router;