const express = require('express');
const path = require('path');
const authRoutes = require('./auth.routes');
const funcionarioRoutes = require('./funcionario.routes');
//const funcionarioGrupoFuncionarioRoutes = require('./funcionario_grupo_funcionario.routes');
const equipamentoRoutes = require('./equipamento.routes');
const ocorrenciaRoutes = require('./ocorrencia_routes');
const ordemServicoRoutes = require('./ordem_servico.routes');
//const ordemServicoFuncionarioRoutes = require('./ordem_servico_funcionario.routes');
//const modeloOrdemServicoRoutes = require('./modelo_ordem_servico.routes');
const notificacaoRoutes = require('./notificacao.routes');
const grupoFuncionarioRoutes = require('./grupo_funcionario.routes');
const registroAuditoriaRoutes = require('./registro_auditoria.routes');

// Função para definir as rotas no aplicativo Express
exports.definirRotas = (app) => {

  // Rota principal - página inicial
  app.get('/', (req, res) => {
    res.render('index',{
      titulo: "Página Inicial"
    });
  });

  // Rota principal - página inicial
  app.get('/vendas', (req, res) => {
    res.render('pages/vendas',{
      titulo: "Contato"
    });
  });
  
  // Rotas para as páginas
  app.get('/login', (req, res) => {
    res.render('pages/login',{
      titulo: "Login"
    });
  });
  
  app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard',{
      titulo: "Dashboard"
    });
  });
  
  app.get('/ocorrencias', (req, res) => {
    res.render('partials/ocorrencias',{
      titulo: "Ocorrências"
    });
  });
  
  app.get('/lista-ocorrencias', (req, res) => {
    res.render('pages/listaOcorrencias',{
      titulo: "Ocorrências"
    });
  });
  
  app.get('/lista-os', (req, res) => {
    res.render('pages/listaOs',{
      titulo: "Ordens de Serviço"
    });
  });
  
  app.get('/cadastro-funcionario', (req, res) => {
    res.render('pages/cadastroFuncion',{
      titulo: "Cadastrar Funcionário"
    });
  });
  
  app.get('/gerenciar-equipamentos', (req, res) => {
    res.render('pages/gerenEquipamentos',{
      titulo: "Gerenciar Equipamentos"
    });
  });
  
  app.get('/notificacoes', (req, res) => {
    res.render('pages/notificacoes',{
      titulo: "Notificações"
    });
  });
  
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/funcionarios', funcionarioRoutes);
  //app.use('/api/fgf', funcionarioGrupoFuncionarioRoutes);
  app.use('/api/equipamentos', equipamentoRoutes);
  app.use('/api/ocorrencias', ocorrenciaRoutes);
  app.use('/api/ordens-servico', ordemServicoRoutes);
  //app.use('/api/osf', ordemServicoFuncionarioRoutes)
  app.use('/api/notificacoes', notificacaoRoutes);
  //app.use('/api/mos', modeloOrdemServicoRoutes);
  app.use('/api/grupos-funcionarios', grupoFuncionarioRoutes);
  app.use('/api/registro-auditoria', registroAuditoriaRoutes);
};