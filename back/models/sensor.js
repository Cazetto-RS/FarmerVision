import pool from '../database/data.js';

// Adota uma placa (associa MAC a planta_usuario)
export const adotarPlaca = async (mac_placa, usuario_planta_id) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO adocao (mac_placa, planta_usuario) VALUES (?, ?);';
        await cx.query(cmdSql, [mac_placa, usuario_planta_id]);
        return true;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const verificarMacExistente = async (mac) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM mac WHERE mac = ?;';
        const [dados] = await cx.query(cmdSql, [mac]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const verificarMacExistenteCadastrado = async (mac_placa) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM adocao WHERE mac_placa = ?;';
        const [dados] = await cx.query(cmdSql, [mac_placa]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

// Registra uma leitura enviada pelo sensor
export const registrarLeitura = async (mac_placa, valores) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'INSERT INTO dados_sensor (mac_placa, valores) VALUES (?, ?);';
        await cx.query(cmdSql, [mac_placa, JSON.stringify(valores)]);
        return true;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

// Busca histórico de leituras
export const buscarHistorico = async (mac_placa, limit = 50) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = `
            SELECT valores 
            FROM dados_sensor 
            WHERE mac_placa = ? 
            ORDER BY data DESC 
            LIMIT ?;
        `;
        const [dados] = await cx.query(cmdSql, [mac_placa, limit]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

// Busca adoção por MAC
export const buscarAdoçãoPorMac = async (mac_placa) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM adocao WHERE mac_placa = ?;';
        const [dados] = await cx.query(cmdSql, [mac_placa]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

// Verifica se a planta pertence ao usuário
export const verificarPlantaDoUsuario = async (usuario_planta_id, usuario_id) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = `
            SELECT id FROM usuario_plantas 
            WHERE id = ? AND usuario_id = ?;
        `;
        const [dados] = await cx.query(cmdSql, [usuario_planta_id, usuario_id]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};