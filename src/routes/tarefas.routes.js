const express = require('express');
const router = express.Router();

let tarefas = [
    { id: 1, texto: 'Estudar Node', coluna: 'afazer', prioridade: 'alta' },
    { id: 2, texto: 'Criar rotas Express', coluna: 'concluido', prioridade: 'alta' },
    { id: 3, texto: 'Testar no Postman', coluna: 'concluido', prioridade: 'alta' }
];
let proximoId = 4;

router.get('/', (req, res) => {
    const { coluna } = req.query;
    let resultado = tarefas;
    if (coluna) resultado = tarefas.filter(t => t.coluna === coluna);
    res.json(resultado);
});

router.get('/estatisticas', (req, res) => {
    const { coluna } = req.query;

    let lista = tarefas;
    if (coluna) {
        lista = tarefas.filter(t => t.coluna === coluna);
    }

    const afazer = lista.filter(t => t.coluna === 'afazer').length;
    const andamento = lista.filter(t => t.coluna === 'andamento').length;
    const concluido = lista.filter(t => t.coluna === 'concluido').length;

    const baixa = lista.filter(t => t.prioridade === 'baixa').length;
    const media = lista.filter(t => t.prioridade === 'media').length;
    const alta = lista.filter(t => t.prioridade === 'alta').length;

    const totalPorColuna = { afazer, andamento, concluido };
    const totalPorPrioridade = { baixa, media, alta };
    const totalColunas = Object.entries(totalPorColuna).sort((a, b) => b[1] - a[1])[0][0];

    res.json({
        totalTarefas: lista.length,
        totalPorColuna,
        totalPorPrioridade,
        totalColunas
    });
});

router.get('/estatisticas/resumo', (req, res) => {
    const total = tarefas.length;
    const afazer = tarefas.filter(t => t.coluna === 'afazer').length;
    const andamento = tarefas.filter(t => t.coluna === 'andamento').length;
    const concluido = tarefas.filter(t => t.coluna === 'concluido').length;

    const baixa = tarefas.filter(t => t.prioridade === 'baixa').length;
    const media = tarefas.filter(t => t.prioridade === 'media').length;
    const alta = tarefas.filter(t => t.prioridade === 'alta').length;

    const totalPrioridade = { baixa, media, alta };
    const prioridade = Object.entries(totalPrioridade).sort((a, b) => b[1] - a[1])[0][0];

    res.json(`Você tem ${total} tarefas.${concluido} concluída(s), ${andamento} em andamento e${afazer} a fazer. Prioridade mais comum: ${prioridade}.`);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
});

router.post('/', (req, res) => {
    const { texto, prioridade, coluna } = req.body;
    if (!texto) return res.status(400).json({ erro: 'Texto obrigatório' });
    const nova = {
        id: proximoId++, 
        texto,
        prioridade: prioridade || 'media',
        coluna: coluna || 'afazer'
    };
    tarefas.push(nova);
    res.status(201).json(nova);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    tarefas[idx] = { ...tarefas[idx], ...req.body, id };
    res.json(tarefas[idx]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    const removida = tarefas.splice(idx, 1)[0];
    res.json({ mensagem: 'Tarefa removida', tarefa: removida });
});

module.exports = router;