const Usuario = require("../models/funcionario.model.js");
const bcrypt = require(bcrypt);
const jwt = require("jsonwebtoken");
const { obterPool } = require ("../db/db_config.js");

// Tempo de expiração do token em segundos
const EXPIRACAO_TOKEN = 2 * 60 * 60;

async function login(req, res) {
    const nomeBanco = req.headers["x-nome-banco"];
    if (!nomeBanco) return res.status(400).json({ erro: "Domínio não especificado."});

    const {login,senha} = req.body;
    if(!login || !senha) return res.status(400).json ({ erro: "Login e senha são obrigatórios."});

    try {
        const pool = obterPool(nomeBanco);
        const funcionario = await Usuario.buscarLogin(pool,login);

        if (!funcionario) return res.status(401).json({ erro: "Login/Senha inválidos."});

        const senhaCorreta = await bcrypt.compare(senha, funcionario.senha_hash);
        if (!senhaCorreta) return res.status(401).json({ erro: "Login/Senha inválidos."});

        const payload = {
            id: funcionario.id,
            nome: funcionario.nome,
            login: funcionario.login
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: EXPIRACAO_TOKEN})

        return res.json({
            mensagem: "Login realizado com sucesso",
            token,
            funcionario: payload
        })
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: "Erro no login."});
    }
}
