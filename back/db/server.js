const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de usuários
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Rotas de plantas
const plantasRoutes = require('./routes/plantas');
app.use('/plantas', plantasRoutes);

// Rotas para buscar as plantas do user
const buscarPlantasRoutes  = require('./routes/buscarPlantas');
app.use('/buscarPlantas', buscarPlantasRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
});