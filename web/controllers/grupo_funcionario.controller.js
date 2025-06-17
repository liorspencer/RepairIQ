const GrupoFuncionario = require('../models/grupo_funcionario.model');

const grupoFuncionarioController = {
  buscarTodos: async (req, res) => {
    try {
      const grupos = await GrupoFuncionario.buscarTodos();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const grupo = await GrupoFuncionario.buscarPorId(req.params.id);
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await GrupoFuncionario.cadastrar(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      await GrupoFuncionario.atualizar(req.params.id, req.body);
      res.json({ message: 'Grupo atualizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await GrupoFuncionario.apagar(req.params.id);
      res.json({ message: 'Grupo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = grupoFuncionarioController;