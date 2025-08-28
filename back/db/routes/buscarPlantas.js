// buscarPlantas.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // conexão mysql

// rota para buscar plantas de um usuário
router.get("/usuario/:usuarioId", (req, res) => {
    const usuarioId = req.params.usuarioId;

    const sql = `
        SELECT p.* 
        FROM usuario_plantas up
        JOIN plantas p ON up.planta_id = p.id
        WHERE up.usuario_id = ?
    `;

    db.query(sql, [usuarioId], (err, results) => {
        if (err) {
            console.error("Erro ao buscar plantas do usuário:", err);
            return res.status(500).json({ error: "Erro no servidor" });
        }
        res.json(results);
    });
});

module.exports = router;