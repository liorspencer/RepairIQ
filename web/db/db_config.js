// Importa a versão promise do mysql2
const mysql = require('mysql2/promise');

// Objeto que armazena pools de banco
const pools = {};

// Retorna (ou cria) um pool de conexão para o banco de dados especificado.
function obterPool(nomeBanco) {
    // Se já existe um pool, retorna ele
    if (pools[nomeBanco]) {
        return pools[nomeBanco];
    }

    // Se não existe, cria um novo pool e armazena no cache
    pools[nomeBanco] = mysql.createPool({
        host: process.env.DB_HOST, //IP do Banco
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: nomeBanco,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0 
    });

    return pools[nomeBanco];
}



//Exportar o conteudo do objeto bd para acessar fora do arquivo banco.js
module.exports = {
    obterPool
};