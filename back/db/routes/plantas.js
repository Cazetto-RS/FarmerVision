const express = require("express");
const router = express.Router();
const db = require("../db"); // sua conexão mysql

// rota para listar todas as plantas
router.get("/plantas", (req, res) => {
    const sql = "SELECT * FROM plantas";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar plantas:", err);
            return res.status(500).json({ error: "Erro no servidor" });
        }
        res.json(results);
    });
});

// 🔹 Adicionar uma planta para o usuário
router.post('/addUserPlanta', (req, res) => {
    const { usuario_id, planta_id } = req.body;

    if (!usuario_id || !planta_id) {
        return res.status(400).json({ error: 'Usuário e planta são obrigatórios!' });
    }

    const sql = 'INSERT INTO usuario_planta (usuario_id, planta_id, data_criacao) VALUES (?, ?, NOW())';
    db.query(sql, [usuario_id, planta_id], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar planta para usuário:', err);
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: 'Planta adicionada ao usuário com sucesso!',
            id: result.insertId
        });
    });
});

module.exports = router;