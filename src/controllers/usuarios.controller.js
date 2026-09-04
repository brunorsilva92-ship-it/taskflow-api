const usuarioModel = require('../models/usuarios.model');
const tarefaModel = require('../models/tarefas.model');

const usuariosController = {
    listar(req, res) {
        res.json(usuarioModel.listar());
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const usuario = usuarioModel.buscar(id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    },

    criar(req, res) {
        const { nome, email } = req.body;
        if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' });

        if (usuarioModel.buscarPorEmail(email)) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        const novoUsuario = usuarioModel.adicionar({ nome, email });
        res.status(201).json(novoUsuario);
    },

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const atualizado = usuarioModel.atualizar(id, req.body);
        if (!atualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(atualizado);
    },

    remover(req, res) {
        const id = parseInt(req.params.id);

        const tarefasDoUsuario = tarefaModel.listar().filter(t => t.usuarioId === id);

        if (tarefasDoUsuario.length > 0) {
            return res.status(400).json({ 
                erro: 'Usuário possui tarefas. Remova as tarefas antes de deletar o usuário.' 
            });
        }

        const removido = usuarioModel.remover(id);
        if (!removido) return res.status(404).json({ erro: 'Usuário não encontrado' });

        res.json({ mensagem: 'Usuário removido com sucesso', usuario: removido });
    }
};

module.exports = usuariosController;