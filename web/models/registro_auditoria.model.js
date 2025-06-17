class RegistroAuditoria {
    static async buscarTodos(dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM REGISTRO_AUDITORIA');
      return rows;
    }
  
    static async buscarPorId(id, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM REGISTRO_AUDITORIA WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async buscarPorIdFuncionario(funcionarioId, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM REGISTRO_AUDITORIA WHERE FK_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ acao, FK_FUNCIONARIO_id }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO REGISTRO_AUDITORIA (acao, FK_FUNCIONARIO_id) VALUES (?, ?)',
        [acao, FK_FUNCIONARIO_id]
      );
      return result.insertId;
    }
  }
  
  module.exports = RegistroAuditoria;