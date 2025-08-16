const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importa as rotas de usuários
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
});