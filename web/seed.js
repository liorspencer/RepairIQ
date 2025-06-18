require('dotenv').config();
const { query } = require('./db/db_config');
const bcrypt = require('bcrypt');

async function createInitialUser() {
  try {
    // Verificar se o usuário admin já existe
    
    


    // Dados do usuário admin
    const nome = 'Operador';
    const login = 'operador';
    const senha = 'operador'; // Senha inicial
    const ativo = true;
    const nivel_acesso = 3; // Administrador

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Inserir no banco
    const result = await query(
      `INSERT INTO FUNCIONARIO (nome, login, senha, ativo, nivel_acesso) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, login, hashedPassword, ativo, nivel_acesso]
    );

    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`👉 Login: ${login}`);
    console.log(`👉 Senha: ${senha}`);

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
  }
}

// Executar a função
createInitialUser();