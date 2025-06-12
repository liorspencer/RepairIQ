async function cadastrarFuncionario(pool, funcionario) {
    const sql = `INSERT INTO funcionario (nome, login, senha) VALUES (?, ?, ?)`;
    const valores = [funcionario.nome, funcionario.login, funcionario.senha];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

async function buscarFuncionarios(pool, busca) {
    let sql = `SELECT * FROM funcionario WHERE 1=1`;
    const valores = [];

    // Adiciona filtro por login, se fornecido
    if (busca.login) {
        sql += ` AND login LIKE ?`;
        valores.push(`%${busca.login}%`);
    }

    // Adiciona filtro por status (ativo/inativo), se fornecido
    if (busca.ativo !== undefined) {
        sql += ` AND ativo = ?`;
        valores.push(busca.ativo);
    }

    const [resultado] = await pool.execute(sql, valores);
    return resultado;
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

async function atualizarFuncionario(pool, id, funcionario) {
    const sql = `UPDATE funcionario SET nome = ?, login = ?, senha = ? WHERE id = ?`;
    const valores = [funcionario.nome, funcionario.login, funcionario.senha, id];
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
}

module.exports = {
    cadastrarFuncionario,
    buscarFuncionarios,
    buscarLogin,
    statusFuncionario,
    atualizarFuncionario
}