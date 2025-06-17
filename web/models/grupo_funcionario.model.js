const {query} = require('../db/db_config')

class GrupoFuncionario {
    static async buscarTodos() {
      const [rows] = await query('SELECT * FROM GRUPO_FUNCIONARIO');
      return rows;
    }
  
    static async cadastrar({ nome_grupo, descricoes }) {
      const [result] = await query(
        'INSERT INTO GRUPO_FUNCIONARIO (nome_grupo, descricoes) VALUES (?, ?)',
        [nome_grupo, descricoes]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { nome_grupo, descricoes }) {
      await query(
        'UPDATE GRUPO_FUNCIONARIO SET nome_grupo = ?, descricoes = ? WHERE id = ?',
        [nome_grupo, descricoes, id]
      );
    }
  
    static async apagar(id) {
      await query('DELETE FROM GRUPO_FUNCIONARIO WHERE id = ?', [id]);
    }
  }
  
  module.exports = GrupoFuncionario;