//Configurar o acesso ao banco de dados no projeto
const mysql = require('mysql');

// Criar outra const com a configuração do MySQL
const bd = mysql.createConnection({
    host: process.env.DB_HOST, //IP do Banco
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Exportar  o conteudo do objeto bd para acessar fora do arquivo banco.js
module.exports = bd;