class OrdemServico {
    static async buscarTodos(dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO');
        return rows;
    }

    static async buscarPorId(id, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO WHERE id = ?', [id]);
        return rows[0];
    }

    static async cadastrar({
        data_abertura,
        data_fechamento,
        prioridade,
        status,
        descricao,
        conteudo,
        recomendacao_ia,
        FK_EQUIPAMENTO_id,
        FK_OCORRENCIA_id,
        FK_MODELO_ORDEM_SERVICO_id
    }, dbPool) {
        const [result] = await dbPool.query(
            'INSERT INTO ORDEM_SERVICO (data_abertura, data_fechamento, prioridade, status, descricao, conteudo, recomendacao_ia, FK_EQUIPAMENTO_id, FK_OCORRENCIA_id, FK_MODELO_ORDEM_SERVICO_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data_abertura, data_fechamento, prioridade, status, descricao, conteudo, recomendacao_ia, FK_EQUIPAMENTO_id, FK_OCORRENCIA_id, FK_MODELO_ORDEM_SERVICO_id]
        );
        return result.insertId;
    }

    static async atualizar(id, {
        data_fechamento,
        prioridade,
        status,
        descricao,
        conteudo,
        recomendacao_ia,
        FK_EQUIPAMENTO_id,
        FK_OCORRENCIA_id,
        FK_MODELO_ORDEM_SERVICO_id
    }, dbPool) {
        await dbPool.query(
            'UPDATE ORDEM_SERVICO SET data_fechamento = ?, prioridade = ?, status = ?, descricao = ?, conteudo = ?, recomendacao_ia = ?, FK_EQUIPAMENTO_id = ?, FK_OCORRENCIA_id = ?, FK_MODELO_ORDEM_SERVICO_id = ? WHERE id = ?',
            [data_fechamento, prioridade, status, descricao, conteudo, recomendacao_ia, FK_EQUIPAMENTO_id, FK_OCORRENCIA_id, FK_MODELO_ORDEM_SERVICO_id, id]
        );
    }

    static async apagar(id, dbPool) {
        await dbPool.query('DELETE FROM ORDEM_SERVICO WHERE id = ?', [id]);
    }

    static async buscarPorIdEquipamento(equipamentoId, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO WHERE FK_EQUIPAMENTO_id = ?', [equipamentoId]);
        return rows;
    }

    static async buscarPorIdOcorrencia(ocorrenciaId, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO WHERE FK_OCORRENCIA_id = ?', [ocorrenciaId]);
        return rows;
    }
}

module.exports = OrdemServico;