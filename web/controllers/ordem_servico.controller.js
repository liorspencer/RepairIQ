const OrdemServico = require('../models/ordem_servico.model.js');

const ordemServicoController = {
  buscarTodos: async (req, res) => {
    try {
      const ordens = await OrdemServico.buscarTodos(req.dbPool);
      res.json(ordens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const ordem = await OrdemServico.buscarPorId(req.params.id, req.dbPool);
      if (!ordem) {
        return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
      }
      res.json(ordem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorEquipamento: async (req, res) => {
    try {
      const ordens = await OrdemServico.buscarPorIdEquipamento(req.params.equipamentoId, req.dbPool);
      res.json(ordens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorOcorrencia: async (req, res) => {
    try {
      const ordens = await OrdemServico.buscarPorIdOcorrencia(req.params.ocorrenciaId, req.dbPool);
      res.json(ordens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await OrdemServico.cadastrar(req.body, req.dbPool);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      await OrdemServico.atualizar(req.params.id, req.body, req.dbPool);
      res.json({ message: 'Ordem de serviço atualizada com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  fechar: async (req, res) => {
    try {
      await OrdemServico.atualizar(req.params.id, { 
        status: 2, // Status para "Fechada"
        data_fechamento: new Date() 
      }, req.dbPool);
      res.json({ message: 'Ordem de serviço fechada com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await OrdemServico.apagar(req.params.id, req.dbPool);
      res.json({ message: 'Ordem de serviço deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ordemServicoController;