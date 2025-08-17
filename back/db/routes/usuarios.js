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

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas!' });
        }

        const usuario = results[0];

        // Aqui criamos um token simples
        const token = `${usuario.id}_${Date.now()}`;

        res.json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone
            }
        });
    });
});

module.exports = router;