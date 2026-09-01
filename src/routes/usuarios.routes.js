const express = require('express');
const router = express.Router();

let usuarios = [
    { id: 1, nome: 'Bruno', email: 'brn@gmai.com' },
    { id: 2, nome: 'Fernanda', email: 'frnd@email.com' },
    { id: 3, nome: 'Lucas', email: 'luq@email.com' }
];

let proximoIdUsuario = 4;

router.get('/', (req, res) => {
    res.json(usuarios);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
});

router.post('/', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoUsuario = {
        id: proximoIdUsuario++,
        nome,
        email
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios[indice] = { ...usuarios[indice], ...req.body, id };

    res.json(usuarios[indice]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const removido = usuarios.splice(indice, 1)[0];

    res.json({ mensagem: 'Usuário removido com sucesso', usuario: removido });
});

module.exports = router;