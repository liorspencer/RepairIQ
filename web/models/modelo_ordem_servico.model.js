class ModeloOrdemServico {
    static async buscarTodos(dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM MODELO_ORDEM_SERVICO');
      return rows;
    }
  
    static async buscarPorId(id, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM MODELO_ORDEM_SERVICO WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async cadastrar({ modelo }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO MODELO_ORDEM_SERVICO (modelo) VALUES (?)',
        [modelo]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { modelo }, dbPool) {
      await dbPool.query(
        'UPDATE MODELO_ORDEM_SERVICO SET modelo = ? WHERE id = ?',
        [modelo, id]
      );
    }
  
    static async apagar(id, dbPool) {
      await dbPool.query('DELETE FROM MODELO_ORDEM_SERVICO WHERE id = ?', [id]);
    }
  }
  
  module.exports = ModeloOrdemServico;