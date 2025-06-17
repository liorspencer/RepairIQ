const {query} = require('../db/db_config')

class Ocorrencia {
    static async buscarTodos() {
      const [rows] = await query('SELECT * FROM OCORRENCIA');
      return rows;
    }
  
    static async buscarPorId(id) {
      const [rows] = await query('SELECT * FROM OCORRENCIA WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async cadastrar({ descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id }) {
      const [result] = await query(
        'INSERT INTO OCORRENCIA (descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id) VALUES (?, ?, ?, ?, ?, ?)',
        [descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id }) {
      await query(
        'UPDATE OCORRENCIA SET descricao = ?, status = ?, prioridade = ?, recomendacao_ia = ?, FK_EQUIPAMENTO_id = ? WHERE id = ?',
        [descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id, id]
      );
    }
  
    static async apagar(id) {
      await query('DELETE FROM OCORRENCIA WHERE id = ?', [id]);
    }
  
    static async buscarPorIdEquipamento(equipamentoId) {
      const [rows] = await query('SELECT * FROM OCORRENCIA WHERE FK_EQUIPAMENTO_id = ?', [equipamentoId]);
      return rows;
    }
  }
  
  module.exports = Ocorrencia;