const Equipamento = require('../models/equipamento.model');

const equipamentoController = {
  buscarTodos: async (req, res) => {
    try {
      const equipamentos = await Equipamento.buscarTodos();
      res.json(equipamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const equipamento = await Equipamento.buscarId(req.params.id);
      if (!equipamento) {
        return res.status(404).json({ message: 'Equipamento não encontrado' });
      }
      res.json(equipamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await Equipamento.cadastrar(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      await Equipamento.atualizar(req.params.id, req.body);
      res.json({ message: 'Equipamento atualizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await Equipamento.apagar(req.params.id);
      res.json({ message: 'Equipamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = equipamentoController;