/*const express = require('express');
const app = express();
app.use(express.json());

let tarefas = [
    { id: 1, texto: 'Estudar Node', coluna: 'afazer', prioridade: 'alta' },
    { id: 2, texto: 'Criar rotas Express', coluna: 'andamento', prioridade: 'alta' },
    { id: 3, texto: 'Testar no Postman', coluna: 'afazer', prioridade: 'baixa' }
];

app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({erro: 'Tarefa não encontrada'});
    }

    res.json(tarefa);
});

app.get('/tarefas', (req, res) => {

    const { coluna, prioridade } = req.query;
    let resultado = tarefas;

    if (coluna) {
        resultado = resultado.filter(t => t.coluna === coluna);
    }

    if (prioridade) {
        resultado = resultado.filter(t => t.prioridade === prioridade);
    }

    res.json(resultado);
});

app.get('/', (req, res) => {
    res.json({ mensagem: 'TaskFlow API funcionando!' });
});

app.get('/ok', (req, res) => {
    res.json({ status: 'ok', dados: [1, 2, 3] });
});

app.get('/criado', (req, res) => {
    res.status(201).json({ mensagem: 'Criado com sucesso' });
});

app.get('/erro', (req, res) => {
    res.status(400).json({ erro: 'Dados inválidos' });
});

app.get('/texto', (req, res) => {
    res.send('Resposta em texto simples!');
});

let proximoId = 4;

app.post('/tarefas', (req, res) => {
  const { texto, prioridade, coluna, cidade } = req.body;

  const novaTarefa = {
    id:        proximoId++,
    texto:     texto,
    prioridade:prioridade || 'media',
    coluna:    coluna    || 'afazer',
    cidade:    cidade    || '',
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const { texto, prioridade, coluna, cidade } = req.body;

    const indice = tarefas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({erro: 'tarefa não encontrada'});
    }

    const tarefaAtualizada = {id, texto, prioridade, coluna, cidade};
    tarefas[indice] = tarefaAtualizada;

    res.json(tarefaAtualizada);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas = tarefas.filter(t => t.id !== id);

  res.json({ mensagem: 'Tarefa removida com sucesso', id });
});

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    metodo: req.method,
    caminho: req.url,
  });
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});*/