class Notificacao {
    static async buscarIdFuncionario(funcionarioId, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM NOTIFICACAO WHERE FK_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ mensagem, FK_FUNCIONARIO_id }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO NOTIFICACAO (mensagem, FK_FUNCIONARIO_id) VALUES (?, ?)',
        [mensagem, FK_FUNCIONARIO_id]
      );
      return result.insertId;
    }
  
    static async marcarComoLido(id, dbPool) {
      await dbPool.query('UPDATE NOTIFICACAO SET lida = 1 WHERE id = ?', [id]);
    }
  
    static async apagar(id, dbPool) {
      await dbPool.query('DELETE FROM NOTIFICACAO WHERE id = ?', [id]);
    }
  }
  
  module.exports = Notificacao;