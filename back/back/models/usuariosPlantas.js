import pool from '../database/data.js'
import bcrypt from 'bcryptjs'

export const consultarTodos = async () => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM usuario_plantas;';
        const [dados] = await cx.query(cmdSql);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const consultarPorId = async (id) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM usuario_plantas WHERE id = ?;';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const cadastrar = async (usuario) => {
    let cx;
    try {        
        const {nome,telefone,email,password} = usuario;
        const cmdSql = 'INSERT INTO usuario_plantas (usuario_id, planta_id) VALUES (?, ?, ?, ?);';
        cx = await pool.getConnection();
        const hashSenha = await bcrypt.hash(password, 10);
        await cx.query(cmdSql, [nome,telefone,email,hashSenha]);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;
 
        const [dados, meta_dados] = await cx.query('SELECT usuario_id, planta_id FROM usuario_plantas WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    } finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const deletar = async (id) => {
    let cx;
    try {
        const cmdSql = 'DELETE FROM usuario_plantas WHERE id = ?;';
        cx = await pool.getConnection();
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};