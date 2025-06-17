require('dotenv').config();
const { query } = require('./db/db_config');
const bcrypt = require('bcrypt');

async function createInitialUser() {
  try {
    // Verificar se o usuário admin já existe
    const [existingAdmin] = await query('SELECT * FROM FUNCIONARIO WHERE login = ?', ['admin']);
    
    if (existingAdmin) {
      console.log('✅ Usuário admin já existe');
      return;
    }

    // Dados do usuário admin
    const nome = 'Administrador';
    const login = 'admin';
    const senha = 'admin123'; // Senha inicial
    const ativo = true;
    const nivel_acesso = 4; // Administrador

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