// controllers/sensor.js
import * as Sensor from '../models/sensor.js';

// Função auxiliar para normalizar MAC
const normalizeMac = (mac) => {
    if (!mac) return null;
    
    // Remove os dois pontos (:) e outros caracteres não hexadecimais
    const onlyHex = mac.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
    
    console.log(`MAC após normalização: ${onlyHex}`); // Adiciona um log para ver como o MAC está sendo tratado

    return onlyHex.length === 12 ? onlyHex : null;
};

// ------------------------
// 1️⃣ Adotar uma placa
// ------------------------
export const adotarPlaca = async (req, res) => {
    try {
        const usuario_id = req.loginId;
        const { mac_placa, usuario_planta_id } = req.body;

        if (!mac_placa || !usuario_planta_id) {
            return res.status(400).json({ error: 'mac_placa e usuario_planta_id são obrigatórios' });
        }

        // console.log(`Recebido MAC antes de normalizar: ${mac_placa}`);
        // const mac = normalizeMac(mac_placa);

        // if (!mac) {
        //     return res.status(400).json({ error: 'MAC inválido' });
        // }

        // console.log(`MAC normalizado: ${mac}`);

        // Verifica se planta pertence ao usuário
        const planta = await Sensor.verificarPlantaDoUsuario(usuario_planta_id, usuario_id);
        console.log(`Planta encontrada para o usuário: ${planta.length}`);

        if (planta.length === 0) {
            return res.status(403).json({ error: 'Planta não pertence ao usuário' });
        }

        // Verifica se o MAC já está cadastrado
        const existente = await Sensor.buscarAdoçãoPorMac(mac);
        console.log(`Resultado da busca de adoção por MAC: ${existente.length}`);

        if (existente.length > 0) {
            return res.status(409).json({ error: 'Este MAC já está cadastrado' });
        }

        // Registra a adoção
        await Sensor.adotarPlaca(mac, usuario_planta_id);

        res.status(201).json({
            sucesso: true,
            mensagem: 'Sensor adotado com sucesso!',
            mac_placa: mac,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// ------------------------
// 2️⃣ Receber dados do sensor
// ------------------------
export const receberDados = async (req, res) => {
    try {
        const { mac_placa, valores } = req.body;

        if (!mac_placa || !valores) {
            return res.status(400).json({ error: 'mac_placa e valores são obrigatórios' });
        }

        const mac = normalizeMac(mac_placa);
        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        // Verifica se o sensor foi adotado
        const existe = await Sensor.buscarAdoçãoPorMac(mac);
        if (existe.length === 0) {
            return res.status(404).json({ error: 'MAC não encontrado ou não adotado' });
        }

        // Registra leitura
        await Sensor.registrarLeitura(mac, valores);

        res.status(201).json({ sucesso: true, mensagem: 'Leitura registrada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// ------------------------
// 3️⃣ Histórico (para o gráfico)
// ------------------------
export const historicoPorMac = async (req, res) => {
    try {
        const usuario_id = req.loginId;
        const macRaw = req.params.mac;
        const limit = parseInt(req.params.limit || '50', 10);

        const mac = normalizeMac(macRaw);
        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        // Confirma que esse MAC pertence ao usuário
        const [pertence] = await Sensor.buscarAdoçãoPorMac(mac);
        if (!pertence) {
            return res.status(404).json({ error: 'Sensor não encontrado' });
        }

        // Checa se a planta vinculada ao sensor pertence ao usuário
        const planta = await Sensor.verificarPlantaDoUsuario(pertence.planta_usuario, usuario_id);
        if (planta.length === 0) {
            return res.status(403).json({ error: 'Sensor não pertence ao usuário' });
        }

        // Busca histórico
        const leituras = await Sensor.buscarHistorico(mac, limit);

        res.json({
            sucesso: true,
            total: leituras.length,
            data: leituras.reverse(), // ordena do mais antigo ao mais recente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
