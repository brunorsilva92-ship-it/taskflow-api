const tarefaModel = require('../models/tarefas.model');

const tarefasController = {
    listar(req, res) {
        const { coluna } = req.query;
        const resultado = coluna 
            ? tarefaModel.listarPorColuna(coluna)
            : tarefaModel.listar();
        res.json(resultado);
    },

    buscarPorId(req, res) {
        const tarefa = tarefaModel.buscar(parseInt(req.params.id));
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    },

    criar(req, res) {
        const { texto } = req.body;
        if (!texto) return res.status(400).json({ erro: 'Texto obrigatório' });
        res.status(201).json(tarefaModel.adicionar(req.body));
    },

    atualizar(req, res) {
        const atualizada = tarefaModel.atualizar(parseInt(req.params.id), req.body);
        if (!atualizada) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(atualizada);
    },

    remover(req, res) {
        const removida = tarefaModel.remover(parseInt(req.params.id));
        if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json({ mensagem: 'Tarefa removida com sucesso', tarefa: removida });
    },

    estatisticas(req, res) {
        const { coluna } = req.query;
        const base = coluna ? tarefaModel.listarPorColuna(coluna) : tarefaModel.listar();
        const porColuna = {
            afazer: base.filter(t => t.coluna === 'afazer').length,
            andamento: base.filter(t => t.coluna === 'andamento').length,
            concluido: base.filter(t => t.coluna === 'concluido').length,
        };
        res.json({ total: base.length, porColuna });
    },

    estatisticasResumo(req, res) {
        const tarefas = tarefaModel.listar();
        
        const total = tarefas.length;
        const afazer = tarefas.filter(t => t.coluna === 'afazer').length;
        const andamento = tarefas.filter(t => t.coluna === 'andamento').length;
        const concluido = tarefas.filter(t => t.coluna === 'concluido').length;

        const baixa = tarefas.filter(t => t.prioridade === 'baixa').length;
        const media = tarefas.filter(t => t.prioridade === 'media').length;
        const alta = tarefas.filter(t => t.prioridade === 'alta').length;

        const contagemPrioridades = { baixa, media, alta };
        const prioridadeMaisComum = Object.entries(contagemPrioridades).sort((a, b) => b[1] - a[1])[0][0];

        res.json(
            `Você tem ${total} tarefas. ${concluido} concluída(s), ${andamento} em andamento e ${afazer} a fazer. Prioridade mais comum: ${prioridadeMaisComum}.`
        );
    }
};

module.exports = tarefasController;