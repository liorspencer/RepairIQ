const Funcionario = require('../models/funcionario.model');
const funcionarioController = {
    buscarTodos: async (req, res) => {
        try {
            const funcionarios = await Funcionario.buscarTodos();
            res.json(funcionarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const funcionario = await Funcionario.buscarPorId(req.params.id);
            if (!funcionario) {
                return res.status(404).json({ message: 'Funcionário não encontrado' });
            }
            res.json(funcionario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    cadastrar: async (req, res) => {
        try {
            // Verificar se o login já existe
            const existe = await Funcionario.buscarPorLogin(req.body.login);
            if (existe) {
                return res.status(400).json({ message: 'Login já está em uso' });
            }

            const id = await Funcionario.cadastrar(req.body);

            // Buscar o funcionário recém-criado (sem a senha)
            const novoFuncionario = await Funcionario.buscarPorId(id);

            res.status(201).json(novoFuncionario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { login, senha } = req.body;

            // Buscar funcionário pelo login
            const funcionario = await Funcionario.buscarPorLogin(login);
            console.log('check 0');
            if (!funcionario) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            console.log('check 1');
            
            // Verificar senha
            const senhaCoincide = await Funcionario.checarSenha(senha, funcionario.senha);
            console.log(senha);
            console.log(funcionario.senha);
            console.log(senhaCoincide);
            
            if (!senhaCoincide) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            console.log('check 2');


            // Gerar token JWT
            const token = Funcionario.gerarToken(funcionario);

            // Retornar informações do funcionário (sem senha) e token
            const { senha: _, ...funcionarioSemSenha } = funcionario;
            res.json({
                ...funcionarioSemSenha,
                token
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            await Funcionario.atualizar(req.params.id, req.body);

            // Buscar o funcionário atualizado (sem a senha)
            const updatedFuncionario = await Funcionario.buscarPorId(req.params.id);

            res.json(updatedFuncionario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Middleware de autenticação
    autenticar: async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const token = parts[1];
        const decoded = Funcionario.verificarToken(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        // Verificar se o funcionário ainda existe
        const funcionario = await Funcionario.buscarPorId(decoded.id, query);
        if (!funcionario) {
            return res.status(401).json({ message: 'Funcionário não encontrado' });
        }

        // Adicionar informações do funcionário à requisição
        req.user = decoded;
        next();
    },

    // Middleware de autorização genérico
    authorize: (minLevel) => {
        return (req, res, next) => {
            if (req.user.nivel_acesso < minLevel) {
                return res.status(403).json({
                    message: `Acesso negado - requer nível mínimo ${minLevel}`
                });
            }
            next();
        };
    },

    // Middlewares específicos
    authorizeAdmin: (req, res, next) => {
        if (req.user.nivel_acesso < Funcionario.NIVEIS_ACESSO.ADMINISTRADOR) {
            return res.status(403).json({
                message: 'Acesso negado - requer privilégios de administrador'
            });
        }
        next();
    },

    authorizePlanejador: (req, res, next) => {
        if (req.user.nivel_acesso < Funcionario.NIVEIS_ACESSO.PLANEJADOR) {
            return res.status(403).json({
                message: 'Acesso negado - requer privilégios de planejador'
            });
        }
        next();
    },

    authorizeTecnico: (req, res, next) => {
        if (req.user.nivel_acesso < Funcionario.NIVEIS_ACESSO.TECNICO) {
            return res.status(403).json({
                message: 'Acesso negado - requer privilégios de técnico'
            });
        }
        next();
    }

};

module.exports = funcionarioController;