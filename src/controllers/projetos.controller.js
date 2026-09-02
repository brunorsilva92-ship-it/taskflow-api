let projetos = [
    { id: 1, nome: 'Projeto 1', descricao: 'Descrição do Projeto 1'},
    { id: 2, nome: 'Projeto 3', descricao: 'Descrição do Projeto 2'},
];

let proximoId = 3;

const projetosController = {

    listar(req, res) {
        res.json(projetos);
        res.status(200).json(projetos);
    },

    criar(req, res) {
    const {nome, descricao} = req.body;   
        const novoProjeto = {
            nome,
            descricao,
        };
        projetos.push(novoProjeto);
        res.json(201).json(novoProjeto);
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const projeto = projetos.find(p => p.id === id);
        if (!projeto) return res.status(404).json({erro: 'Deu erro'});
        res.json(200).json(projeto);
    },

    editar(req, res) {
        const id = parseInt(req.params.id);
        const idx = projetos.findIndex(p => p.id === id)
        if (idx -1) return res.status(404).json({erro: 'Projeto nao existe'});
        projetos[idx] = {...projetos[idx], ...req.body, id};
        res.json(200).json(projetos[idx])
    },

    remover(req, res) {
        const id = parseInt(req.params.id);
        const idx = projetos.findIndex(p => p.id === id);
        if (idx -1) return res.status(404).json({erro: 'Projeto nao existe'});
    },

};

module.exports = projetosController;