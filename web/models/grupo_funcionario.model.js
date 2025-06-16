async function cadastrarGrupoFuncionario(pool, grupo_funcinario) {
    const sql = `INSERT INTO grupo_funcionario (nome_grupo, descricoes, permicoes) VALUES (?, ?, ?)`;
    const valores = [grupo_funcionario.nome_grupo, grupo_funcionario.descricoes, grupo_funcionario.permicoes];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function buscarGrupoFuncionarios(pool, busca) {
    let sql = `SELECT * FROM grupo_funcionario WHERE 1=1`;
    const valores = [];

    // Adiciona filtro por login, se fornecido
    if (busca) {
        sql += ` AND nome_grupo LIKE ?`;
        valores.push(`%${busca}%`);
    }

    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function statusFuncionario(pool, id, estado) {
    const sql = `UPDATE funcionario SET ativo = ? WHERE id - ?`;
    const valores = [estado, id];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function atualizarGrupoFuncionario(pool, id, grupo_funcionario) {
    const sql = `UPDATE funcionario SET nome_grupo = ?, descricoes = ?, permicoes = ? WHERE id = ?`;
    const valores = [grupo_funcionario.nome_grupo, grupo_funcionario.descricoes, grupo_funcionario.permicoes, id];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

module.exports = {
    cadastrarGrupoFuncionario,
    buscarGrupoFuncionarios,
    statusFuncionario,
    atualizarGrupoFuncionario
}