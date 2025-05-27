async function cadastrarFuncionario(pool, funcionario) {
    const sql = `INSERT INTO funcionario (nome, login, senha) VALUES (?, ?, ?)`;
    const valores = [funcionario.nome, funcionario.login, funcionario.senha];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function buscarFuncionarios(pool) {
    
}

async function buscarLogin(pool, login) {
    const sql = `SELECT * FROM funcionario WHERE login = ?`;
    const [resultado] = await pool.execute(sql, login);
    return resultado;
}

async function Funcionario(pool, id, estado) {
    const sql = `UPDATE funcionario SET ativo = ? WHERE id - ?`;
    const valores = [estado, id];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}