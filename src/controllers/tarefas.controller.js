const usuarioModel = require('../models/usuarios.model');
const tarefaModel = require('../models/tarefas.model');

const prioridades = ['alta', 'media', 'baixa'];
const colunas = ['afazer', 'andamento', 'concluido'];
const limitet = 3;

const tarefasController = {
    listar(req, res) {
        const { coluna, usuarioId } = req.query;
        let resultado = tarefaModel.listar();

        if (usuarioId) {
            resultado = resultado.filter(t => t.usuarioId === parseInt(usuarioId));
        }

        if (coluna) {
            resultado = resultado.filter(t => t.coluna === coluna);
        }

        res.json(resultado);
    },

    buscarPorId(req, res) {
        const tarefa = tarefaModel.buscar(parseInt(req.params.id));
        if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
        res.json(tarefa);
    },

    criar(req, res) {
        const { texto, prioridade, coluna, usuarioId } = req.body;

        if (!texto) {
            return res.status(400).json({ erro: 'Texto obrigatório' });
        }

        if (prioridade && !prioridades.includes(prioridade)) {
            return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });
        }

        if (coluna && !colunas.includes(coluna)) {
            return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });
        }

        if (usuarioId) {
            const existeUsuario = usuarioModel.buscar(parseInt(usuarioId));
            if (!existeUsuario) {
                return res.status(400).json({ erro: 'Usuário não encontrado' });
            }
        }

        if (usuarioId && coluna === 'andamento') {
            const tarefasEmAndamento = tarefaModel.listar().filter(t => t.usuarioId === parseInt(usuarioId) && t.coluna === 'andamento');

            if (tarefasEmAndamento.length >= limitet) {
                return res.status(400).json({ erro: `Usuário já possui ${limitet} tarefas em andamento. Conclua uma antes de adicionar outra.` });
            }
        }

        const novaTarefa = tarefaModel.adicionar(req.body);
        res.status(201).json(novaTarefa);
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