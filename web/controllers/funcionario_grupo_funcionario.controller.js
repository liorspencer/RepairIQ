const FuncionarioGrupoFuncionario = require('../models/funcionario_grupo_funcionario.model.js');

const funcionarioGrupoFuncionarioController = {
  buscarPorFuncionario: async (req, res) => {
    try {
      const grupos = await FuncionarioGrupoFuncionario.buscarPorIdFuncionario(req.params.funcionarioId);
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorGrupo: async (req, res) => {
    try {
      const funcionarios = await FuncionarioGrupoFuncionario.buscarPorIdGrupo(req.params.grupoId);
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  adicionarNoGrupo: async (req, res) => {
    try {
      await FuncionarioGrupoFuncionario.cadastrar({
        fk_FUNCIONARIO_id: req.params.funcionarioId,
        fk_GRUPO_FUNCIONARIO_id: req.params.grupoId
      }, );
      res.status(201).json({ message: 'Funcionário adicionado ao grupo' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  removerDoGrupo: async (req, res) => {
    try {
      await FuncionarioGrupoFuncionario.apagar(
        req.params.funcionarioId,
        req.params.grupoId
      );
      res.json({ message: 'Funcionário removido do grupo' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = funcionarioGrupoFuncionarioController;