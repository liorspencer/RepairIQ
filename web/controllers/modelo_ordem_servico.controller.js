const ModeloOrdemServico = require('../models/modelo_ordem_servico.model.js');

const modeloOrdemServicoController = {
  buscarTodos: async (req, res) => {
    try {
      const modelos = await ModeloOrdemServico.buscarTodos(req.dbPool);
      res.json(modelos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const modelo = await ModeloOrdemServico.buscarPorId(req.params.id, req.dbPool);
      if (!modelo) {
        return res.status(404).json({ message: 'Modelo não encontrado' });
      }
      res.json(modelo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await ModeloOrdemServico.cadastrar(req.body, req.dbPool);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      await ModeloOrdemServico.atualizar(req.params.id, req.body, req.dbPool);
      res.json({ message: 'Modelo atualizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await ModeloOrdemServico.apagar(req.params.id, req.dbPool);
      res.json({ message: 'Modelo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = modeloOrdemServicoController;