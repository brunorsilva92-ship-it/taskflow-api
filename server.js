const express = require('express');
const cors = require('cors');
const logger = require('./src/middlewares/logger');
const validarContentType = require('./src/middlewares/validarContentType');
const tarefasRoutes = require('./src/routes/tarefas.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const projetosRoutes = require('./src/routes/projetos.routes');

const app = express();
const PORTA = 3000;

app.use(cors({
    origin: (process.env.CORS && process.env.CORS.ORIGIN) || ['http://localhost:5173', 'https://www.google.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
}));

app.use(express.json());
app.use(validarContentType);
app.use(logger);

app.use('/tarefas', tarefasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/projetos', projetosRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});