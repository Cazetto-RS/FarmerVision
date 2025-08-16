const express = require('express');
const router = express.Router();

// Importa a conexão do banco
const db = require('../db.js');

router.post('/add', (req, res) => {
    const { nome, telefone, email, password } = req.body;

    if (!nome || !telefone || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const sql = 'INSERT INTO usuarios (nome, telefone, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, telefone, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email já cadastrado!' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.insertId });
    });
});

module.exports = router;