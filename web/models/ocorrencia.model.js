class Ocorrencia {
    static async buscarTodos(dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM OCORRENCIA');
      return rows;
    }
  
    static async buscarPorId(id, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM OCORRENCIA WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async cadastrar({ descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO OCORRENCIA (descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id) VALUES (?, ?, ?, ?, ?, ?)',
        [descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id }, dbPool) {
      await dbPool.query(
        'UPDATE OCORRENCIA SET descricao = ?, status = ?, prioridade = ?, recomendacao_ia = ?, FK_EQUIPAMENTO_id = ? WHERE id = ?',
        [descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id, id]
      );
    }
  
    static async apagar(id, dbPool) {
      await dbPool.query('DELETE FROM OCORRENCIA WHERE id = ?', [id]);
    }
  
    static async buscarPorIdEquipamento(equipamentoId, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM OCORRENCIA WHERE FK_EQUIPAMENTO_id = ?', [equipamentoId]);
      return rows;
    }
  }
  
  module.exports = Ocorrencia;