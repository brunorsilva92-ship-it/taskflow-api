const tarefasUtils = require('./utils/tarefas');

// Destructuring — extrair funções do objeto:
const { listarTodas, adicionar } = require('./utils/tarefas');

adicionar({ id: 1, texto: 'Estudar Node', coluna: 'afazer' });
console.log(listarTodas()); // [{ id: 1, texto: 'Estudar Node', ... }]