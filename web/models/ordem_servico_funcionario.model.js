const {query} = require('../db/db_config')

class OrdemServicoFuncionario {
    static async buscarPorIdOrdemServico(ordemServicoId) {
      const [rows] = await query('SELECT * FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_ORDEM_SERVICO_id = ?', [ordemServicoId]);
      return rows;
    }
  
    static async buscarPorIdFuncionario(funcionarioId) {
      const [rows] = await query('SELECT * FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim }) {
      const [result] = await query(
        'INSERT INTO ORDEM_SERVICO_FUNCIONARIO (fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim) VALUES (?, ?, ?)',
        [fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim]
      );
      return result.insertId;
    }
  
    static async atualizarDataFim(ordemServicoId, funcionarioId, data_fim) {
      await query(
        'UPDATE ORDEM_SERVICO_FUNCIONARIO SET data_fim = ? WHERE fk_ORDEM_SERVICO_id = ? AND fk_FUNCIONARIO_id = ?',
        [data_fim, ordemServicoId, funcionarioId]
      );
    }
  
    static async apagar(ordemServicoId, funcionarioId) {
      await query(
        'DELETE FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_ORDEM_SERVICO_id = ? AND fk_FUNCIONARIO_id = ?',
        [ordemServicoId, funcionarioId]
      );
    }
  }
  
  module.exports = OrdemServicoFuncionario;