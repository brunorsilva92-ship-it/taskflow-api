let projetos = [
    { id: 1, nome: 'Projeto 1', descricao: 'Descrição do Projeto 1' },
    { id: 2, nome: 'Projeto 2', descricao: 'Descrição do Projeto 2' }
];

let proximoId = 3;

module.exports = {
    listar: () => projetos,
    buscar: (id) => projetos.find(p => p.id === id),
    
    adicionar: ({ nome, descricao }) => {
        const novoProjeto = {
            id: proximoId++,
            nome,
            descricao: descricao || ''
        };
        projetos.push(novoProjeto);
        return novoProjeto;
    },

    atualizar: (id, dados) => {
        const idx = projetos.findIndex(p => p.id === id);
        if (idx === -1) return null;
        projetos[idx] = { ...projetos[idx], ...dados, id };
        return projetos[idx];
    },

    remover: (id) => {
        const idx = projetos.findIndex(p => p.id === id);
        if (idx === -1) return null;
        return projetos.splice(idx, 1)[0];
    }
};