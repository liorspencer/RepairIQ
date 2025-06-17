document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.createElement('div');
    
    // Configurar container de erro
    errorContainer.className = 'text-red-500 text-center mb-4 text-sm';
    loginForm.insertBefore(errorContainer, loginForm.firstChild);

    
    // Manipular envio do formulário
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpar erros anteriores
        clearError();
        
        // Validar campos
        if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
            showError('Por favor, preencha todos os campos');
            return;
        }
        
        // Desabilitar botão durante a requisição
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading loading-spinner"></span> Entrando...';
        
        try {
            // Fazer requisição de login
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: usernameInput.value.trim(),
                    senha: passwordInput.value.trim()
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
                
            }
            
            // Armazenar token e dados do usuário
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify({
                id: data.id,
                nome: data.nome,
                login: data.login,
                nivel_acesso: data.nivel_acesso
            }));
            
            // Redirecionar para dashboard
            window.location.href = '/dashboard';
            
        } catch (error) {
            showError(error.message);
            console.error('Login error:', error);
        } finally {
            // Reabilitar botão
            submitButton.disabled = false;
            submitButton.textContent = 'Entrar';
        }
    });
    
    // Funções auxiliares
    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        
        // Adicionar classes de erro aos inputs
        usernameInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
    }
    
    function clearError() {
        errorContainer.textContent = '';
        errorContainer.classList.add('hidden');
        
        // Remover classes de erro dos inputs
        usernameInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
    }
    
    // Adicionar efeito visual ao focar nos inputs
    usernameInput.addEventListener('focus', () => {
        usernameInput.classList.add('ring-2', 'ring-primary');
    });
    
    usernameInput.addEventListener('blur', () => {
        usernameInput.classList.remove('ring-2', 'ring-primary');
    });
    
    passwordInput.addEventListener('focus', () => {
        passwordInput.classList.add('ring-2', 'ring-primary');
    });
    
    passwordInput.addEventListener('blur', () => {
        passwordInput.classList.remove('ring-2', 'ring-primary');
    });
});