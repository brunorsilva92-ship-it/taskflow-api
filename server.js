const express = require('express');
const app = express();
app.use(express.json());

let proximoIdUsuario = 2;
let usuarios = [{
  id: 1, nome: 'admin', email: 'admin@taskflow.com', senha: '123'},
];

let tarefas = [
    { id: 1, texto: 'Estudar Node', coluna: 'afazer', prioridade: 'alta' },
    { id: 2, texto: 'Criar rotas Express', coluna: 'concluido', prioridade: 'alta' },
    { id: 3, texto: 'Testar no Postman', coluna: 'concluido', prioridade: 'alta' }
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/estatisticas', (req, res) => {
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

app.get('/estatisticas/resumo', (req, res) => {
    const total = tarefas.length;
    const afazer = tarefas.filter(t => t.coluna === 'afazer').length;
    const andamento = tarefas.filter(t => t.coluna === 'andamento').length;
    const concluido = tarefas.filter(t => t.coluna === 'concluido').length;

    const baixa = tarefas.filter(t => t.prioridade === 'baixa').length;
    const media = tarefas.filter(t => t.prioridade === 'media').length;
    const alta = tarefas.filter(t => t.prioridade === 'alta').length;

    const totalPrioridade = { baixa, media, alta };
    const prioridade = Object.entries(totalPrioridade).sort((a, b) => b[1] - a[1])[0][0];

    res.json(`Você tem ${total} tarefas. ${concluido} concluída(s), ${andamento} em andamento e ${afazer} a fazer. Prioridade mais comum: ${prioridade}.`);
});

app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(t => t.id === id);

    if (!usuario) {
        return res.status(404).json({erro: 'Usuário não encontrado'});
    }

    res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  const emailex = usuarios.find(u => u.email === email);

  if (emailex) {
    return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
  }

  const novoUsuario = {
    id:        proximoIdUsuario++,
    nome:      nome,
    email:     email,
    senha:     senha,
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, email, senha } = req.body;

    const indice = usuarios.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({erro: 'Usuário não encontrada'});
    }

    const usuarioAtualizado = {id, nome, email, senha};
    usuarios[indice] = usuarioAtualizado;

    res.json(usuarioAtualizado);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = usuarios.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios = usuarios.filter(t => t.id !== id);

  res.json({ mensagem: 'Usuário removido', id });
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
});