const {query} = require('../db/db_config')
class Equipamento {
    static async buscarTodos() {
        const [rows] = await query('SELECT * FROM EQUIPAMENTO');
        return rows;
    }

    static async buscarId(id) {
        const [rows] = await query('SELECT * FROM EQUIPAMENTO WHERE id = ?', [id]);
        return rows[0];
    }

    static async cadastrar({ tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo }) {
        const [result] = await query(
            'INSERT INTO EQUIPAMENTO (tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo]
        );
        return result.insertId;
    }

    static async atualizar(id, { tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo }) {
        await query(
            'UPDATE EQUIPAMENTO SET tag = ?, nome = ?, tipo = ?, numero_serie = ?, localizacao = ?, data_aquisicao = ?, ativo = ? WHERE id = ?',
            [tag, nome, tipo, numero_serie, localizacao, data_aquisicao, ativo, id]
        );
    }

    static async apagar(id) {
        await query('DELETE FROM EQUIPAMENTO WHERE id = ?', [id]);
    }
}

module.exports = Equipamento;