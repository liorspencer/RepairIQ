async function cadastrarFuncionario(pool, funcionario) {
    const sql = `INSERT INTO funcionario (nome, login, senha) VALUES (?, ?, ?)`;
    const valores = [funcionario.nome, funcionario.login, funcionario.senha];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function buscarFuncionarios(pool, busca) {
    
}

async function buscarLogin(pool, login) {
    const sql = `SELECT * FROM funcionario WHERE login = ? AND ativo = 1`;
    const [resultado] = await pool.execute(sql, login);
    return resultado[0];
}

async function statusFuncionario(pool, id, estado) {
    const sql = `UPDATE funcionario SET ativo = ? WHERE id - ?`;
    const valores = [estado, id];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}