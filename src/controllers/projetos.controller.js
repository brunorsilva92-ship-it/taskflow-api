const projetoModel = require('../models/projetos.model');

const projetosController = {
    listar(req, res) {
        res.json(projetoModel.listar());
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const projeto = projetoModel.buscar(id);
        if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json(projeto);
    },

    criar(req, res) {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ erro: 'Nome do projeto é obrigatório' });

        const novoProjeto = projetoModel.adicionar(req.body);
        res.status(201).json({
            mensagem: 'Projeto criado com sucesso',
            projeto: novoProjeto
        });
    },

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const atualizado = projetoModel.atualizar(id, req.body);
        if (!atualizado) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json(atualizado);
    },

    remover(req, res) {
        const id = parseInt(req.params.id);
        const removido = projetoModel.remover(id);
        if (!removido) return res.status(404).json({ erro: 'Projeto não encontrado' });
        res.json({ mensagem: 'Projeto removido com sucesso', projeto: removido });
    }
};

module.exports = projetosController;