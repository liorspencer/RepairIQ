
const RegistroAuditoria = require('../models/registro_auditoria.model');

const registroAuditoriaController = {
  buscarTodos: async (req, res) => {
    try {
      const registros = await RegistroAuditoria.buscarTodos(req.dbPool);
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const registro = await RegistroAuditoria.buscarPorId(req.params.id, req.dbPool);
      if (!registro) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }
      res.json(registro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorFuncionario: async (req, res) => {
    try {
      const registros = await RegistroAuditoria.buscarPorIdFuncionario(req.params.funcionarioId, req.dbPool);
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await RegistroAuditoria.cadastrar(req.body, req.dbPool);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = registroAuditoriaController;