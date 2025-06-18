const {query} = require('../db/db_config')

class Notificacao {
    static async buscarIdFuncionario(funcionarioId) {
      const rows = await query('SELECT * FROM NOTIFICACAO WHERE FK_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ mensagem, FK_FUNCIONARIO_id }) {
      const [result] = await query(
        'INSERT INTO NOTIFICACAO (mensagem, FK_FUNCIONARIO_id) VALUES (?, ?)',
        [mensagem, FK_FUNCIONARIO_id]
      );
      return result.insertId;
    }
  
    static async marcarComoLido(id) {
      await query('UPDATE NOTIFICACAO SET lida = 1 WHERE id = ?', [id]);
    }
  
    static async apagar(id) {
      await query('DELETE FROM NOTIFICACAO WHERE id = ?', [id]);
    }
  }
  
  module.exports = Notificacao;