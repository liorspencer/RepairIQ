class OrdemServicoFuncionario {
    static async buscarPorIdOrdemServico(ordemServicoId, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_ORDEM_SERVICO_id = ?', [ordemServicoId]);
      return rows;
    }
  
    static async buscarPorIdFuncionario(funcionarioId, dbPool) {
      const [rows] = await dbPool.query('SELECT * FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_FUNCIONARIO_id = ?', [funcionarioId]);
      return rows;
    }
  
    static async cadastrar({ fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim }, dbPool) {
      const [result] = await dbPool.query(
        'INSERT INTO ORDEM_SERVICO_FUNCIONARIO (fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim) VALUES (?, ?, ?)',
        [fk_ORDEM_SERVICO_id, fk_FUNCIONARIO_id, data_fim]
      );
      return result.insertId;
    }
  
    static async atualizarDataFim(ordemServicoId, funcionarioId, data_fim, dbPool) {
      await dbPool.query(
        'UPDATE ORDEM_SERVICO_FUNCIONARIO SET data_fim = ? WHERE fk_ORDEM_SERVICO_id = ? AND fk_FUNCIONARIO_id = ?',
        [data_fim, ordemServicoId, funcionarioId]
      );
    }
  
    static async apagar(ordemServicoId, funcionarioId, dbPool) {
      await dbPool.query(
        'DELETE FROM ORDEM_SERVICO_FUNCIONARIO WHERE fk_ORDEM_SERVICO_id = ? AND fk_FUNCIONARIO_id = ?',
        [ordemServicoId, funcionarioId]
      );
    }
  }
  
  module.exports = OrdemServicoFuncionario;