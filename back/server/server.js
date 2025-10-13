import express from "express";
import cors from "cors";
import pool from "../database/data.js";

import usuarioRoutes from "../routes/usuario.js";
import plantasRoutes from "../routes/plantas.js";
import UserplantasRoutes from "../routes/usuariosPlantas.js";
import sensores from "../routes/sensor.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BD iniciado com sucesso!");
});

app.get("/dbtest", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ success: true, db_response: rows });
  } catch (err) {
    console.error("Erro ao conectar no banco:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/", usuarioRoutes);
app.use("/", plantasRoutes);
app.use("/", UserplantasRoutes);
app.use("/", sensores);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});