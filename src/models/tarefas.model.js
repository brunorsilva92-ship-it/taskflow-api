let tarefas = [
    { id: 1, texto: 'Estudar Node', coluna: 'afazer', prioridade: 'alta' },
    { id: 2, texto: 'Criar rotas Express', coluna: 'concluido', prioridade: 'alta' },
    { id: 3, texto: 'Testar no Postman', coluna: 'concluido', prioridade: 'alta' }
];
let proximoId = 4;

module.exports = {
    listar: () => tarefas,
    listarPorColuna: (coluna) => tarefas.filter(t => t.coluna === coluna),
    buscar: (id) => tarefas.find(t => t.id === id),

    adicionar: ({ texto, coluna, prioridade, usuarioId }) => {
        const novaTarefa = {
            id: proximoId++,
            texto,
            coluna: coluna || 'afazer',
            prioridade: prioridade || 'alta',
            usuarioId: usuarioId || null
        };
        tarefas.push(novaTarefa);
        return novaTarefa;
    },

    atualizar: (id, dados) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return null;
        tarefas[idx] = { ...tarefas[idx], ...dados, id };
        return tarefas[idx];
    },

    remover: (id) => {
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return null;
        return tarefas.splice(idx, 1)[0];
    }
};