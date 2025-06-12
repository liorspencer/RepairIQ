async function cadastrarEquipamento(pool, equipamento) {
    const sql = `INSERT INTO equipamento (nome,tipo,numero_serie,localizacao,data_aquisicao,status) VALUES (?,?,?,?,?,?)`;
    const valores = [equipamento.nome, equipamento.tipo, equipamento.numero_serie, equipamento.localizacao, equipamento.data_aquisicao, equipamento.status];
    const [resultado] = await pool.execute(sql,valores);
    return resultado;
}