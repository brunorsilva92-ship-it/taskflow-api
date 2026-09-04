let usuarios = [
    { id: 1, nome: 'Bruno', email: 'brn@gmail.com' },
    { id: 2, nome: 'Fernanda', email: 'frnd@email.com' },
    { id: 3, nome: 'Lucas', email: 'luq@email.com' }
];

let proximoIdUsuario = 4;

module.exports = {
    listar: () => usuarios,
    buscar: (id) => usuarios.find(u => u.id === id),
    buscarPorEmail: (email) => usuarios.find(u => u.email === email),

    adicionar: ({ nome, email }) => {
        const novo = { id: proximoIdUsuario++, nome, email };
        usuarios.push(novo);
        return novo;
    },
    
    atualizar: (id, dados) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return null;
        usuarios[idx] = { ...usuarios[idx], ...dados, id };
        return usuarios[idx];
    },

    remover: (id) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return null;
        return usuarios.splice(idx, 1)[0];
    }
};