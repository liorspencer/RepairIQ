const {query} = require('../db/db_config')

class Ocorrencia {
    static async buscarTodos() {
      const [rows] = await query('SELECT * FROM OCORRENCIA');
      return rows;
    }

    static async buscarComFiltros(filtros) {
      const { status, prioridade, dataInicio, dataFim, page = 1, limit = 10 } = filtros;
      const offset = (page - 1) * limit;
      
      // Construir where clause
      const where = {};
      if (status) where.status = status;
      if (prioridade) where.prioridade = prioridade;
      
      if (dataInicio || dataFim) {
          where.data_ocorrencia = {};
          if (dataInicio) where.data_ocorrencia[Op.gte] = new Date(dataInicio);
          if (dataFim) where.data_ocorrencia[Op.lte] = new Date(dataFim);
      }
      
      const [rows] = await query(`
          SELECT o.*, e.tag as equipamento_tag, e.nome as equipamento_nome 
          FROM OCORRENCIA o
          LEFT JOIN EQUIPAMENTO e ON o.FK_EQUIPAMENTO_id = e.id
          ${where ? 'WHERE ' + Object.keys(where).map(key => {
              if (key === 'data_ocorrencia') {
                  const conditions = [];
                  if (where[key].gte) conditions.push(`o.data_ocorrencia >= '${where[key].gte.toISOString()}'`);
                  if (where[key].lte) conditions.push(`o.data_ocorrencia <= '${where[key].lte.toISOString()}'`);
                  return conditions.join(' AND ');
              }
              return `o.${key} = ${where[key]}`;
          }).join(' AND ') : ''}
          ORDER BY o.data_ocorrencia DESC
          LIMIT ? OFFSET ?
      `, [parseInt(limit), offset]);
      
      const [count] = await query(`
          SELECT COUNT(*) as total 
          FROM OCORRENCIA
          ${where ? 'WHERE ' + Object.keys(where).map(key => {
              if (key === 'data_ocorrencia') {
                  const conditions = [];
                  if (where[key].gte) conditions.push(`data_ocorrencia >= '${where[key].gte.toISOString()}'`);
                  if (where[key].lte) conditions.push(`data_ocorrencia <= '${where[key].lte.toISOString()}'`);
                  return conditions.join(' AND ');
              }
              return `${key} = ${where[key]}`;
          }).join(' AND ') : ''}
      `);
      
      return {
          itens: rows,
          total: count[0].total,
          totalPages: Math.ceil(count[0].total / limit),
          currentPage: parseInt(page)
      };
  }
  
    static async buscarPorId(id) {
      const [rows] = await query('SELECT * FROM OCORRENCIA WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async cadastrar({ descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id }) {
      const [result] = await query(
        'INSERT INTO OCORRENCIA (descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id) VALUES (?, ?, ?, ?, ?, ?)',
        [descricao, status, prioridade, data_ocorrencia, recomendacao_ia, FK_EQUIPAMENTO_id]
      );
      return result.insertId;
    }
  
    static async atualizar(id, { descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id }) {
      await query(
        'UPDATE OCORRENCIA SET descricao = ?, status = ?, prioridade = ?, recomendacao_ia = ?, FK_EQUIPAMENTO_id = ? WHERE id = ?',
        [descricao, status, prioridade, recomendacao_ia, FK_EQUIPAMENTO_id, id]
      );
    }
  
    static async apagar(id) {
      await query('DELETE FROM OCORRENCIA WHERE id = ?', [id]);
    }
  
    static async buscarPorIdEquipamento(equipamentoId) {
      const [rows] = await query('SELECT * FROM OCORRENCIA WHERE FK_EQUIPAMENTO_id = ?', [equipamentoId]);
      return rows;
    }
  }
  
  module.exports = Ocorrencia;