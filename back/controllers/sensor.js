// controllers/sensor.js
import * as Sensor from '../models/sensor.js';

// Função auxiliar para normalizar MAC
const normalizeMac = (mac) => {
    if (!mac) return null;

    // Remove tudo que não for caractere hexadecimal e deixa maiúsculo
    const onlyHex = mac.trim().replace(/[^a-fA-F0-9]/g, '').toUpperCase();

    // Aceita entre 8 e 12 caracteres (para placas que não têm o MAC completo)
    if (onlyHex.length < 8 || onlyHex.length > 12) {
        console.log(`❌ MAC inválido (tamanho ${onlyHex.length}):`, onlyHex);
        return null;
    }

    console.log(`✅ MAC normalizado (${onlyHex.length} chars):`, onlyHex);
    return onlyHex;
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

        console.log(`Recebido MAC antes de normalizar: ${mac_placa}`);
        const mac = normalizeMac(mac_placa);

        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        console.log(`MAC normalizado: ${mac}`);

        // Verifica se a planta pertence ao usuário
        const planta = await Sensor.verificarPlantaDoUsuario(usuario_planta_id, usuario_id);
        if (planta.length === 0) {
            return res.status(403).json({ error: 'Planta não pertence ao usuário' });
        }

        // 🚨 NOVO: Verifica se o MAC existe na tabela mac
        const macExiste = await Sensor.verificarMacExistente(mac);
        if (macExiste.length === 0) {
            return res.status(404).json({ error: 'Este MAC não está registrado no sistema.' });
        }

        // Verifica se o MAC já está adotado
        const existente = await Sensor.buscarAdoçãoPorMac(mac);
        if (existente.length > 0) {
            return res.status(409).json({ error: 'Este MAC já está cadastrado.' });
        }

        // Faz a adoção
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
        const mac = normalizeMac(req.params.mac);
        const { umidade, temperatura, valores } = req.body;

        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        // Caso venha o formato antigo { valores: {...} }, mantém compatibilidade
        const dados = valores || { umidade, temperatura };

        if (!dados.umidade || !dados.temperatura) {
            return res.status(400).json({ error: 'Campos umidade e temperatura são obrigatórios' });
        }

        // Verifica se o MAC foi adotado
        const existe = await Sensor.buscarAdoçãoPorMac(mac);
        if (existe.length === 0) {
            return res.status(404).json({ error: 'MAC não encontrado ou não adotado' });
        }

        // Registra leitura no banco
        await Sensor.registrarLeitura(mac, dados);

        res.status(201).json({ sucesso: true, mensagem: 'Leitura registrada com sucesso!' });
    } catch (error) {
        console.error('❌ Erro ao receber dados do sensor:', error);
        res.status(500).json({ error: error.message });
    }
};

// ------------------------
// 4️⃣ Verificar se MAC existe
// ------------------------
export const verificarMac = async (req, res) => {
    try {
        const macRaw = req.params.mac;
        const mac = normalizeMac(macRaw);
        
        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        const macExiste = await Sensor.verificarMacExistente(mac);
        return res.json({
            sucesso: true,
            existe: macExiste.length > 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// ------------------------
// 4️⃣ Verificar se MAC esta cadastrado
// ------------------------
export const verificarMacCadastrado = async (req, res) => {
    try {
        const macRaw = req.params.mac;
        const mac = normalizeMac(macRaw);
        
        if (!mac) {
            return res.status(400).json({ error: 'MAC inválido' });
        }

        const macExiste = await Sensor.verificarMacExistenteCadastrado(mac);
        return res.json({
            sucesso: true,
            existe: macExiste.length > 0
        });
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
