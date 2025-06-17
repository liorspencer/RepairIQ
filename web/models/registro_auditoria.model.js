const {query} = require('../db/db_config')

class RegistroAuditoria {
    static async buscarTodos() {
      const [rows] = await query('SELECT * FROM REGISTRO_AUDITORIA');
      return rows;
    }
  
    static async buscarPorId(id) {
      const [rows] = await query('SELECT * FROM REGISTRO_AUDITORIA WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async buscarPorIdFuncionario(funcionarioId) {
      const [rows] = await query('SELECT * FROM REGISTRO_AUDITORIA WHERE FK_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ acao, FK_FUNCIONARIO_id }) {
      const [result] = await query(
        'INSERT INTO REGISTRO_AUDITORIA (acao, FK_FUNCIONARIO_id) VALUES (?, ?)',
        [acao, FK_FUNCIONARIO_id]
      );
      return result.insertId;
    }
  }
  
  module.exports = RegistroAuditoria;