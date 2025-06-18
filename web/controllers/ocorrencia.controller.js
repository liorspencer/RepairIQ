const Ocorrencia = require('../models/ocorrencia.model');

const ocorrenciaController = {
  buscarTodos: async (req, res) => {
    try {
      const ocorrencias = await Ocorrencia.buscarTodos();
      res.json(ocorrencias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarComFiltros: async (req, res) => {
    try {
      const { status, prioridade, dataInicio, dataFim, page = 1, limit = 10 } = req.query;

      // Construir objeto de filtro
      const filtro = {};
      if (status) filtro.status = status;
      if (prioridade) filtro.prioridade = prioridade;
      if (dataInicio) filtro.data_ocorrencia = { [Op.gte]: new Date(dataInicio) };
      if (dataFim) {
        filtro.data_ocorrencia = filtro.data_ocorrencia || {};
        filtro.data_ocorrencia[Op.lte] = new Date(dataFim);
      }

      // Configurar paginação
      const offset = (page - 1) * limit;

      const { count, rows } = await Ocorrencia.findAndCountAll({
        where: filtro,
        include: [{
          model: Equipamento,
          attributes: ['id', 'tag', 'nome']
        }],
        order: [['data_ocorrencia', 'DESC']],
        limit: parseInt(limit),
        offset: offset
      });

      res.json({
        itens: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const ocorrencia = await Ocorrencia.buscarPorId(req.params.id);
      if (!ocorrencia) {
        return res.status(404).json({ message: 'Ocorrência não encontrada' });
      }
      res.json(ocorrencia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buscarPorEquipamento: async (req, res) => {
    try {
      const ocorrencias = await Ocorrencia.buscarPorIdEquipamento(req.params.equipamentoId);
      res.json(ocorrencias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const id = await Ocorrencia.cadastrar(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      await Ocorrencia.atualizar(req.params.id, req.body);
      res.json({ message: 'Ocorrência atualizada com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  apagar: async (req, res) => {
    try {
      await Ocorrencia.apagar(req.params.id);
      res.json({ message: 'Ocorrência deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ocorrenciaController;