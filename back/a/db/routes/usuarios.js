const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");

// Importa a conexão do banco
const db = require('../db.js');

router.post('/add', async (req, res) => {
    const { nome, telefone, email, password } = req.body;

    if (!nome || !telefone || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        // gera hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO usuarios (nome, telefone, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [nome, telefone, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Email já cadastrado!' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.insertId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas!' });
        }

        const usuario = results[0];

        try {
            const senhaValida = await bcrypt.compare(password, usuario.password);
            if (!senhaValida) {
                return res.status(401).json({ error: 'Credenciais inválidas!' });
            }

            // Aqui você já tinha um token simples
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
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao validar senha' });
        }
    });
});

module.exports = router;