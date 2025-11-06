// routes/sensor.js
import express from 'express';
import * as SensorController from '../controllers/sensor.js';
import autenticar from '../middleware/autenticacao.js';

const router = express.Router();

// Adotar uma placa (usuário cadastra sensor pelo MAC)
router.post('/sensor/adotar', autenticar, SensorController.adotarPlaca);
// Verifica se um MAC existe no sistema
router.get('/sensor/verificar/:mac', autenticar, SensorController.verificarMac);
router.get('/sensor/verificarCadastrado/:mac', autenticar, SensorController.verificarMacCadastrado);
// Sensor envia dados de leitura (sem autenticação)
router.post('/sensor/dados/:mac', SensorController.receberDados);
// Buscar histórico de leituras por MAC (para gráfico)
router.get('/sensor/historico/:mac/:limit', autenticar, SensorController.historicoPorMac);
router.get('/sensor/historico/:mac', autenticar, SensorController.historicoPorMac);
//Buscar última leitura por usuário_planta_id (para mostrar dados atuais)
router.get('/sensor/ultima/:usuario_planta_id', autenticar, SensorController.ultimaLeitura);

// Listar sensores adotados por um usuário (para o front saber quais plantas têm sensores)
router.get('/sensor/adocoes/:usuario_id', autenticar, async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const pool = (await import('../database/data.js')).default;

        const [dados] = await pool.query(`
            SELECT a.mac_placa, a.planta_usuario, up.usuario_id, p.nome_comum AS planta_nome
            FROM adocao a
            JOIN usuario_plantas up ON up.id = a.planta_usuario
            JOIN plantas p ON p.id = up.planta_id
            WHERE up.usuario_id = ?;
        `, [usuario_id]);

        res.json({
            sucesso: true,
            total: dados.length,
            data: dados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;