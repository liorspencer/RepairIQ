class GrupoFuncionario {
    static async buscarTodos(dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM GRUPO_FUNCIONARIO');
      return rows;
    }
  
    static async cadastrar({ nome_grupo, descricoes }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO GRUPO_FUNCIONARIO (nome_grupo, descricoes) VALUES (?, ?)',
        [nome_grupo, descricoes]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { nome_grupo, descricoes }, dbPool) {
      await dbPool.query(
        'UPDATE GRUPO_FUNCIONARIO SET nome_grupo = ?, descricoes = ? WHERE id = ?',
        [nome_grupo, descricoes, id]
      );
    }
  
    static async apagar(id, dbPool) {
      await dbPool.query('DELETE FROM GRUPO_FUNCIONARIO WHERE id = ?', [id]);
    }
  }
  
  module.exports = GrupoFuncionario;