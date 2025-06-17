const Notificacao = require('../models/notificacao.model');

const notificacaoController = {

    buscarPorFuncionario: async (req, res) => {
        try {
            const notificacoes = await Notificacao.buscarIdFuncionario(req.params.funcionarioId, req.dbPool);
            res.json(notificacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    cadastrar: async (req, res) => {
        try {
            const id = await Notificacao.cadastrar(req.body, req.dbPool);
            res.status(201).json({ id, ...req.body });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    marcarComoLido: async (req, res) => {
        try {
            await Notificacao.marcarComoLido(req.params.id, req.dbPool);
            res.json({ message: 'Notificação marcada como lida' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    apagar: async (req, res) => {
        try {
            await Notificacao.apagar(req.params.id, req.dbPool);
            res.json({ message: 'Notificação deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = notificacaoController;