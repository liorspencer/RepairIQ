const express = require('express');
const router = express.Router();
const funcionarioGrupoFuncionarioController = require('../controllers/funcionario_grupo_funcionario.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação e autorização (apenas admin)
router.use(funcionarioController.autenticar, funcionarioController.authorizeAdmin);

// Rotas de associação
router.get('/funcionario/:funcionarioId', funcionarioGrupoFuncionarioController.getByFuncionario);
router.get('/grupo/:grupoId', funcionarioGrupoFuncionarioController.getByGrupo);
router.post('/funcionario/:funcionarioId/grupo/:grupoId', funcionarioGrupoFuncionarioController.addToGroup);
router.delete('/funcionario/:funcionarioId/grupo/:grupoId', funcionarioGrupoFuncionarioController.removeFromGroup);

module.exports = router;