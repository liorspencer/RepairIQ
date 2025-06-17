const OrdemServicoFuncionario = require('../models/ordem_servico_funcionario.model.js');

const ordemServicoFuncionarioController = {
  buscarPorOrdemServico: async (req, res) => {
    try {
      const funcionarios = await OrdemServicoFuncionario.buscarPorIdOrdemServico(req.params.ordemServicoId);
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorFuncionario: async (req, res) => {
    try {
      const ordens = await OrdemServicoFuncionario.buscarPorIdFuncionario(req.params.funcionarioId);
      res.json(ordens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  atribuir: async (req, res) => {
    try {
      await OrdemServicoFuncionario.create({
        fk_ORDEM_SERVICO_id: req.params.ordemServicoId,
        fk_FUNCIONARIO_id: req.body.funcionarioId
      });
      res.status(201).json({ message: 'Funcionário atribuído à ordem de serviço' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  completar: async (req, res) => {
    try {
      await OrdemServicoFuncionario.updateDataFim(
        req.params.ordemServicoId,
        req.params.funcionarioId,
        new Date()
      );
      res.json({ message: 'Tarefa marcada como concluída' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      await OrdemServicoFuncionario.delete(
        req.params.ordemServicoId,
        req.params.funcionarioId
      );
      res.json({ message: 'Funcionário removido da ordem de serviço' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ordemServicoFuncionarioController;