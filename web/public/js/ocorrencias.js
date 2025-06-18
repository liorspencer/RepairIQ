let ocorrencias = [];
let paginaAtual = 1;
const itensPorPagina = 10;

// Configurar eventos do modal
function setupModalEvents() {
    // Botão Nova Ocorrência
    const btnNovaOcorrencia = document.getElementById('btn-nova-ocorrencia');
    if (btnNovaOcorrencia) {
        btnNovaOcorrencia.addEventListener('click', openNewOcorrenciaModal);
    } else {
        console.error('Botão "Nova Ocorrência" não encontrado');
    }
    
    // Botão Salvar
    const btnSalvar = document.getElementById('btn-salvar');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarOcorrencia);
    }
    
    // Botão Gerar IA
    const btnGerarIA = document.getElementById('btn-gerar-ia');
    if (btnGerarIA) {
        btnGerarIA.addEventListener('click', gerarRecomendacaoIA);
    }
    
    // Botão Cancelar
    const btnCancelar = document.getElementById('btn-cancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            document.getElementById('modal-ocorrencia').close();
        });
    }
}

// Modifique o event listener no final do arquivo:
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ocorrencias-content')) {
        initOcorrencias();
    }
});

async function carregarOcorrencias() {
    try {
        // Mostrar loading
        document.getElementById('tabela-ocorrencias').innerHTML = `
           <tr>
               <td colspan="7" class="text-center py-8">
                   <span class="loading loading-spinner loading-lg"></span>
               </td>
           </tr>
       `;

        const params = new URLSearchParams({
            page: paginaAtual,
            limit: itensPorPagina,
            status: document.getElementById('filtro-status').value,
            prioridade: document.getElementById('filtro-prioridade').value,
            dataInicio: document.getElementById('filtro-data-inicio').value,
            dataFim: document.getElementById('filtro-data-fim').value
        });

        const response = await fetch(`/api/ocorrencias/filtradas?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) throw new Error('Erro ao carregar ocorrências');

        const data = await response.json();
        ocorrencias = data.itens;
        atualizarTabelaOcorrencias();
        atualizarPaginacao(data.total);

        atualizarContadoresFiltros(data.total);
    } catch (error) {
        console.error('Erro:', error);
        mostrarErroCarregamento();
    }
}

function atualizarContadoresFiltros(total) {
    const filtroStatus = document.getElementById('filtro-status').value;
    const filtroPrioridade = document.getElementById('filtro-prioridade').value;
    const filtroData = document.getElementById('filtro-data-inicio').value;

    let textoFiltro = `Total: ${total}`;

    if (filtroStatus || filtroPrioridade || filtroData) {
        textoFiltro += ' (filtrado';
        if (filtroStatus) {
            textoFiltro += ` - Status: ${document.getElementById('filtro-status').options[document.getElementById('filtro-status').selectedIndex].text}`;
        }
        if (filtroPrioridade) {
            textoFiltro += ` - Prioridade: ${document.getElementById('filtro-prioridade').options[document.getElementById('filtro-prioridade').selectedIndex].text}`;
        }
        if (filtroData) {
            textoFiltro += ` - A partir de: ${document.getElementById('filtro-data-inicio').value}`;
        }
        textoFiltro += ')';
    }

    document.getElementById('contador-filtros').textContent = textoFiltro;
}

function mostrarErroCarregamento() {
    document.getElementById('tabela-ocorrencias').innerHTML = `
       <tr>
           <td colspan="7" class="text-center py-8 text-error">
               <div class="flex flex-col items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                   </svg>
                   <p class="mt-2">Falha ao carregar ocorrências</p>
                   <button onclick="carregarOcorrencias()" class="btn btn-sm btn-error mt-4">
                       Tentar novamente
                   </button>
               </div>
           </td>
       </tr>
   `;
}

function filtrarOcorrencias() {
    paginaAtual = 1;
    carregarOcorrencias();

    const filtros = {
        status: document.getElementById('filtro-status').value,
        prioridade: document.getElementById('filtro-prioridade').value,
        dataInicio: document.getElementById('filtro-data-inicio').value
    };
    localStorage.setItem('ultimosFiltrosOcorrencias', JSON.stringify(filtros));
}

function carregarUltimosFiltros() {
    const filtrosSalvos = localStorage.getItem('ultimosFiltrosOcorrencias');
    if (filtrosSalvos) {
        const filtros = JSON.parse(filtrosSalvos);
        document.getElementById('filtro-status').value = filtros.status || '';
        document.getElementById('filtro-prioridade').value = filtros.prioridade || '';
        document.getElementById('filtro-data-inicio').value = filtros.dataInicio || '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ocorrencias-content')) {
        carregarUltimosFiltros();
        carregarOcorrencias();
        carregarEquipamentos();
    }
});

async function carregarOcorrencias() {
    try {
        document.getElementById('tabela-ocorrencias').innerHTML = `
               <tr>
                   <td colspan="7" class="text-center py-8">
                       <span class="loading loading-spinner loading-lg"></span>
                   </td>
               </tr>
           `;

        const params = new URLSearchParams({
            page: paginaAtual,
            limit: itensPorPagina,
            status: document.getElementById('filtro-status').value,
            prioridade: document.getElementById('filtro-prioridade').value,
            dataInicio: document.getElementById('filtro-data-inicio').value
        });

        const response = await fetch(`/api/ocorrencias?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) throw new Error('Erro ao carregar ocorrências');

        const data = await response.json();
        ocorrencias = data.itens;
        atualizarTabelaOcorrencias();
        atualizarPaginacao(data.total);
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('tabela-ocorrencias').innerHTML = `
               <tr>
                   <td colspan="7" class="text-center py-8 text-error">
                       Falha ao carregar ocorrências. Tente novamente.
                   </td>
               </tr>
           `;
    }
}

function atualizarTabelaOcorrencias() {
    const tbody = document.getElementById('tabela-ocorrencias');
    tbody.innerHTML = '';

    if (ocorrencias.length === 0) {
        tbody.innerHTML = `
               <tr>
                   <td colspan="7" class="text-center py-8">
                       Nenhuma ocorrência encontrada
                   </td>
               </tr>
           `;
        return;
    }

    ocorrencias.forEach(ocorrencia => {
        const tr = document.createElement('tr');
        tr.className = 'hover';
        tr.innerHTML = `
               <td>${ocorrencia.id}</td>
               <td>${ocorrencia.equipamento_nome || 'N/A'}</td>
               <td class="max-w-xs truncate">${ocorrencia.descricao}</td>
               <td>
                   <span class="badge ${getStatusBadgeClass(ocorrencia.status)}">
                       ${getStatusText(ocorrencia.status)}
                   </span>
               </td>
               <td>
                   <span class="badge ${getPrioridadeBadgeClass(ocorrencia.prioridade)}">
                       ${getPrioridadeText(ocorrencia.prioridade)}
                   </span>
               </td>
               <td>${new Date(ocorrencia.data_ocorrencia).toLocaleDateString()}</td>
               <td>
                   <div class="flex space-x-2">
                       <button onclick="editarOcorrencia(${ocorrencia.id})" class="btn btn-xs btn-info">
                           Editar
                       </button>
                       <button onclick="verDetalhes(${ocorrencia.id})" class="btn btn-xs btn-primary">
                           Detalhes
                       </button>
                   </div>
               </td>
           `;
        tbody.appendChild(tr);
    });
}

function getStatusText(status) {
    const statusMap = { 1: 'Aberto', 2: 'Em Andamento', 3: 'Fechado' };
    return statusMap[status] || 'Desconhecido';
}

function getStatusBadgeClass(status) {
    const classMap = { 1: 'badge-warning', 2: 'badge-info', 3: 'badge-success' };
    return classMap[status] || 'badge-neutral';
}

function getPrioridadeText(prioridade) {
    const prioridadeMap = { 1: 'Baixa', 2: 'Média', 3: 'Alta', 4: 'Crítica' };
    return prioridadeMap[prioridade] || 'Não definida';
}

function getPrioridadeBadgeClass(prioridade) {
    const classMap = { 1: 'badge-success', 2: 'badge-info', 3: 'badge-warning', 4: 'badge-error' };
    return classMap[prioridade] || 'badge-neutral';
}

function atualizarPaginacao(totalItens) {
    document.getElementById('ocorrencias-total').textContent = totalItens;
    const inicio = (paginaAtual - 1) * itensPorPagina + 1;
    const fim = Math.min(paginaAtual * itensPorPagina, totalItens);
    document.getElementById('ocorrencias-inicio').textContent = inicio;
    document.getElementById('ocorrencias-fim').textContent = fim;
    document.getElementById('pagina-atual').textContent = paginaAtual;

    document.getElementById('btn-anterior').disabled = paginaAtual === 1;
    document.getElementById('btn-proximo').disabled = fim >= totalItens;
}

function mudarPagina(direcao) {
    if (direcao === 'anterior' && paginaAtual > 1) {
        paginaAtual--;
    } else if (direcao === 'proxima') {
        paginaAtual++;
    }
    carregarOcorrencias();
}

function openNewOcorrenciaModal() {
    console.log("Abrindo modal de nova ocorrência...");
    
    const modal = document.getElementById('modal-ocorrencia');
    if (!modal) {
        console.error('Modal não encontrado');
        return;
    }
    
    // Resetar o formulário
    document.getElementById('modal-titulo').textContent = 'Nova Ocorrência';
    document.getElementById('ocorrencia-id').value = '';
    document.getElementById('form-ocorrencia').reset();
    document.getElementById('campo-recomendacao').classList.add('hidden');
    
    // Mostrar o modal
    modal.showModal();
}
async function editarOcorrencia(id) {
    try {
        const ocorrencia = ocorrencias.find(o => o.id === id);
        if (!ocorrencia) throw new Error('Ocorrência não encontrada');

        document.getElementById('modal-titulo').textContent = 'Editar Ocorrência';
        document.getElementById('ocorrencia-id').value = ocorrencia.id;
        document.getElementById('equipamento').value = ocorrencia.FK_EQUIPAMENTO_id;
        document.getElementById('prioridade').value = ocorrencia.prioridade;
        document.getElementById('descricao').value = ocorrencia.descricao;

        if (ocorrencia.recomendacao_ia) {
            document.getElementById('recomendacao').value = ocorrencia.recomendacao_ia;
            document.getElementById('campo-recomendacao').classList.remove('hidden');
        } else {
            document.getElementById('campo-recomendacao').classList.add('hidden');
        }

        document.getElementById('modal-ocorrencia').showModal();
    } catch (error) {
        console.error('Erro ao editar ocorrência:', error);
        alert('Erro ao carregar ocorrência para edição');
    }
}

// Salvar ocorrência
async function salvarOcorrencia() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const saveButton = document.getElementById('btn-salvar');
    const loading = document.getElementById('save-loading');
    
    try {
        saveButton.disabled = true;
        loading.classList.remove('hidden');
        
        const ocorrenciaData = {
            descricao: document.getElementById('descricao').value,
            prioridade: document.getElementById('prioridade').value,
            FK_EQUIPAMENTO_id: document.getElementById('equipamento').value,
            recomendacao_ia: document.getElementById('recomendacao').value || null
        };
        
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Em produção, substitua por:
        // const response = await fetch('/api/ocorrencias', {
        //     method: 'POST',
        //     body: JSON.stringify(ocorrenciaData),
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //     }
        // });
        
        showToast('Ocorrência criada com sucesso!', 'success');
        modal.close();
        
        // Recarregar a lista de ocorrências
        if (window.carregarOcorrencias) {
            carregarOcorrencias();
        }
        
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao salvar ocorrência', 'error');
    } finally {
        saveButton.disabled = false;
        loading.classList.add('hidden');
    }
}

// Carrega equipamentos para o select
async function carregarEquipamentos() {
    try {
        const response = await fetch('/api/equipamentos/ativos', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) throw new Error('Erro ao carregar equipamentos');

        equipamentos = await response.json();
        const select = document.getElementById('equipamento');

        equipamentos.forEach(equip => {
            const option = document.createElement('option');
            option.value = equip.id;
            option.textContent = `${equip.tag} - ${equip.nome}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro:', error);
        showToast('Erro ao carregar equipamentos', 'error');
    }
}

async function gerarRecomendacaoIA() {
    const descricao = document.getElementById('descricao').value;
    if (!descricao) {
        showToast('Digite uma descrição antes', 'warning');
        return;
    }
    
    const iaButton = document.getElementById('btn-gerar-ia');
    const loading = document.getElementById('ia-loading');
    
    try {
        iaButton.disabled = true;
        loading.classList.remove('hidden');
        
        // Simulação de chamada à API de IA
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Em produção, substitua por:
        // const response = await fetch('/api/ia/recomendacao', {
        //     method: 'POST',
        //     body: JSON.stringify({ descricao }),
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //     }
        // });
        // const data = await response.json();
        
        const data = { 
            recomendacao: "Baseado na descrição, recomendo:\n1. Verificar a conexão elétrica\n2. Trocar o sensor XYZ\n3. Realizar calibração"
        };
        
        document.getElementById('recomendacao').value = data.recomendacao;
        document.getElementById('recomendacao-container').classList.remove('hidden');
        
    } catch (error) {
        console.error('Erro IA:', error);
        showToast('Erro ao gerar recomendação', 'error');
    } finally {
        iaButton.disabled = false;
        loading.classList.add('hidden');
    }
}


function filtrarOcorrencias() {
    paginaAtual = 1;
    carregarOcorrencias();
}

function verDetalhes(id) {
    console.log('Ver detalhes da ocorrência:', id);
}

function showToast(message, type = 'info') {
    // Implemente com sua biblioteca preferida (ex: Toastify)
    alert(`${type.toUpperCase()}: ${message}`);
}

function limparFiltros() {
    document.getElementById('filtro-status').value = '';
    document.getElementById('filtro-prioridade').value = '';
    document.getElementById('filtro-data-inicio').value = '';
    document.getElementById('filtro-data-fim').value = '';
    localStorage.removeItem('ultimosFiltrosOcorrencias');
    filtrarOcorrencias();
}

async function exportarParaExcel() {
    try {
        const params = new URLSearchParams({
            status: document.getElementById('filtro-status').value,
            prioridade: document.getElementById('filtro-prioridade').value,
            dataInicio: document.getElementById('filtro-data-inicio').value,
            dataFim: document.getElementById('filtro-data-fim').value,
            export: 'excel'
        });

        const response = await fetch(`/api/ocorrencias/filtradas?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) throw new Error('Erro ao exportar dados');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ocorrencias_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Erro ao exportar:', error);
        showToast('Erro ao exportar ocorrências', 'error');
    }
}

// Função para inicializar a página de ocorrências
function initOcorrencias() {
    console.log("Inicializando módulo de ocorrências...");
    
    // Configurar eventos do modal
    setupModalEvents();
    
    // Carregar dados iniciais
    carregarUltimosFiltros();
    carregarOcorrencias();
    carregarEquipamentos();
}