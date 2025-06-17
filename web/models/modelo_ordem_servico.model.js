const {query} = require('../db/db_config')

class ModeloOrdemServico {
    static async buscarTodos() {
      const [rows] = await query('SELECT * FROM MODELO_ORDEM_SERVICO');
      return rows;
    }
  
    static async buscarPorId(id) {
      const [rows] = await query('SELECT * FROM MODELO_ORDEM_SERVICO WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async cadastrar({ modelo }) {
      const [result] = await query(
        'INSERT INTO MODELO_ORDEM_SERVICO (modelo) VALUES (?)',
        [modelo]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { modelo }) {
      await query(
        'UPDATE MODELO_ORDEM_SERVICO SET modelo = ? WHERE id = ?',
        [modelo, id]
      );
    }
  
    static async apagar(id) {
      await query('DELETE FROM MODELO_ORDEM_SERVICO WHERE id = ?', [id]);
    }
  }
  
  module.exports = ModeloOrdemServico;