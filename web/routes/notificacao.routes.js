const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacao.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar);

// Restrições por nível de acesso
router.use(funcionarioController.authorizeTecnico);

// Rotas CRUD
router.get('/funcionario/:funcionarioId', notificacaoController.buscarPorFuncionario);
router.post('/', notificacaoController.cadastrar);
router.put('/:id/marcar-lida', notificacaoController.marcarComoLido);
router.delete('/:id',
    funcionarioController.authorizePlanejador,
    notificacaoController.apagar
);

module.exports = router;