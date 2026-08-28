const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [{id: 1, nome: 'admin', email: 'admin@taskflow.com', senha: '123'},];
let proximoIdUsuario = 2;

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
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