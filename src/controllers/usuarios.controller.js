let usuarios = [
    { id: 1, nome: 'Bruno', email: 'brn@gmail.com' },
    { id: 2, nome: 'Fernanda', email: 'frnd@email.com' },
    { id: 3, nome: 'Lucas', email: 'luq@email.com' }
];

let proximoIdUsuario = 4;

const usuariosController = {

    listar(req, res) {
        res.json(usuarios);
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    },

    criar(req, res) {
        const { nome, email } = req.body;
        if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
        if (usuarios.find(u => u.email === email)) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }
        const novoUsuario = {
            id: proximoIdUsuario++,
            nome, 
            email
        };
        usuarios.push(novoUsuario);
        res.status(201).json(novoUsuario);
    },

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
        
        usuarios[idx] = { ...usuarios[idx], ...req.body, id };
        res.json(usuarios[idx]);
    },

    remover(req, res) {
        const id = parseInt(req.params.id);
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
        
        const removido = usuarios.splice(idx, 1)[0];
        res.json({ mensagem: 'Usuário removido', usuario: removido });
    }
};

module.exports = usuariosController;