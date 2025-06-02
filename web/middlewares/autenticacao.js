const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Espera: Bearer <token>

    if (!token) return res.status(401).json({ erro: "Token não fornecido" });

    jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
        if (erro) {
            console.error("Token inválido:", erro.message);
            return res.status(403).json({ erro: "Token inválido ou expirado" });
        }

        req.usuario = usuario; // Dados do token disponíveis nas próximas funções
        next();
    });
}

module.exports = { autenticarToken };