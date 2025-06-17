const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = process.env.JWT_SECRET || 'seuSegredoMuitoSecreto';

class Funcionario {
    static async buscarTodos(dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM FUNCIONARIO');
        return rows;
    }

    static async buscarPorId(id, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM FUNCIONARIO WHERE id = ?', [id]);
        return rows[0];
    }

    static async buscarPorLogin(login, dbPool) {
        const [rows] = await dbPool.query('SELECT * FROM FUNCIONARIO WHERE login = ?', [login]);
        return rows[0];
    }

    static async cadastrar({ nome, login, senha, ativo, nivel_acesso }, dbPool) {
        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        const [result] = await dbPool.query(
            'INSERT INTO FUNCIONARIO (nome, login, senha, ativo, nivel_acesso) VALUES (?, ?, ?, ?, ?)',
            [nome, login, hashedPassword, ativo, nivel_acesso]
        );
        return result.insertId;
    }

    static async atualizar(id, { nome, login, senha, ativo, nivel_acesso }, dbPool) {
        let updateQuery = 'UPDATE FUNCIONARIO SET nome = ?, login = ?, ativo = ?, nivel_acesso = ?';
        let params = [nome, login, ativo, nivel_acesso];

        // Se senha foi fornecida, atualiza
        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            updateQuery += ', senha = ?';
            params.push(hashedPassword);
        }

        updateQuery += ' WHERE id = ?';
        params.push(id);

        await dbPool.query(updateQuery, params);
    }

    // Método para verificar a senha
    static async checarSenha(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }

    // Gerar token JWT
    static gerarToken(funcionario) {
        return jwt.sign(
            {
                id: funcionario.id,
                login: funcionario.login,
                nivel_acesso: funcionario.nivel_acesso
            },
            secret,
            { expiresIn: '730h' } // Token expira em 1 mês
        );
    }

    // Verificar token JWT
    static verificarToken(token) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
}

module.exports = Funcionario;