const {query} = require('../db/db_config')

class FuncionarioGrupoFuncionario {
    static async buscarPorIdFuncionario(funcionarioId) {
      const [rows] = await query('SELECT * FROM FUNCIONARIO_GRUPO_FUNCIONARIO WHERE fk_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async buscarPorIdGrupo(grupoId) {
      const [rows] = await query('SELECT * FROM FUNCIONARIO_GRUPO_FUNCIONARIO WHERE fk_GRUPO_FUNCIONARIO_id = ?', [grupoId]);
      return rows;
    }
  
    static async cadastrar({ fk_FUNCIONARIO_id, fk_GRUPO_FUNCIONARIO_id }) {
      const [result] = await query(
        'INSERT INTO FUNCIONARIO_GRUPO_FUNCIONARIO (fk_FUNCIONARIO_id, fk_GRUPO_FUNCIONARIO_id) VALUES (?, ?)',
        [fk_FUNCIONARIO_id, fk_GRUPO_FUNCIONARIO_id]
      );
      return result;
    }
  
    static async apagar(funcionarioId, grupoId) {
      await query(
        'DELETE FROM FUNCIONARIO_GRUPO_FUNCIONARIO WHERE fk_FUNCIONARIO_id = ? AND fk_GRUPO_FUNCIONARIO_id = ?',
        [funcionarioId, grupoId]
      );
    }
  }
  
  module.exports = FuncionarioGrupoFuncionario;