const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrencia.controller');
const funcionarioController = require('../controllers/funcionario.controller');

// Middleware de autenticação
router.use(funcionarioController.autenticar);

// Rotas CRUD
router.get('/',
    funcionarioController.authorizeTecnico,
    ocorrenciaController.buscarTodos
);

router.get('/:id',
    funcionarioController.authorizeTecnico,
    ocorrenciaController.buscarTodos
);

router.get('/equipamento/:equipamentoId',
    funcionarioController.authorizeTecnico,
    ocorrenciaController.buscarPorEquipamento
);

router.get('/filtradas', 
    funcionarioController.authorizeTecnico,
    ocorrenciaController.buscarComFiltros
);

router.post('/', ocorrenciaController.cadastrar);

router.put('/:id',
    funcionarioController.authorizeTecnico,
    ocorrenciaController.atualizar
);

router.delete('/:id',
    funcionarioController.authorizePlanejador,
    ocorrenciaController.apagar
);

module.exports = router;