const express = require("express");
const router = express.Router();
const db = require("../db");

// Adicionar planta à conta do usuário
router.post("/add", (req, res) => {
    const { usuarioid, plantaid } = req.body;

    if (!usuarioid || !plantaid) {
        return res.status(400).json({ error: "Usuário e planta são obrigatórios" });
    }

    const sql = "INSERT INTO usuario_plantas (usuario_id, planta_id, data_cadastro) VALUES (?, ?, NOW())";
    db.query(sql, [usuarioid, plantaid], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
            message: "Planta adicionada com sucesso!",
            id: result.insertId
        });
    });
});

module.exports = router;