class Equipamento {
    static async buscarTodos(dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM EQUIPAMENTO');
        return rows;
    }

    static async buscarId(id, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM EQUIPAMENTO WHERE id = ?', [id]);
        return rows[0];
    }

    static async cadastrar({ tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo }, dbPool) {
        const [result] = await dbPool.query(
            'INSERT INTO EQUIPAMENTO (tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo]
        );
        return result.insertId;
    }

    static async atualizar(id, { tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo }, dbPool) {
        await dbPool.query(
            'UPDATE EQUIPAMENTO SET tag = ?, nome = ?, tipo = ?, numero_serie = ?, localizacao = ?, data_aquisicao = ?, ativo = ? WHERE id = ?',
            [tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo, id]
        );
    }

    static async apagar(id, dbPool) {
        await dbPool.query('DELETE FROM EQUIPAMENTO WHERE id = ?', [id]);
    }
}

module.exports = Equipamento;