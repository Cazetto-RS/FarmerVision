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
        const cmdSql = `
            SELECT 
                usuario_plantas.*, 
                usuarios.*, 
                plantas.*
            FROM 
                usuario_plantas
            JOIN 
                usuarios ON usuario_plantas.usuario_id = usuarios.id
            JOIN 
                plantas ON usuario_plantas.planta_id = plantas.id
            WHERE 
                usuario_plantas.usuario_id = ?;
        `;
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

export const cadastrar = async ({ usuario_id, planta_id }) => {
    let cx;
    try {
        cx = await pool.getConnection();

        // 1. Verifica se o usuário existe
        const [usuario] = await cx.query(
            'SELECT id FROM usuarios WHERE id = ?',
            [usuario_id]
        );
        if (usuario.length === 0) {
            throw new Error("Usuário não encontrado");
        }

        // 2. Verifica se a planta existe
        const [planta] = await cx.query(
            'SELECT id FROM plantas WHERE id = ?',
            [planta_id]
        );
        if (planta.length === 0) {
            throw new Error("Planta não encontrada");
        }

        // 3. Insere na tabela de ligação
        const cmdSql = 'INSERT INTO usuario_plantas (usuario_id, planta_id) VALUES (?, ?)';
        await cx.query(cmdSql, [usuario_id, planta_id]);

        // 4. Busca o registro recém-criado
        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await cx.query(
            'SELECT * FROM usuario_plantas WHERE id = ?',
            [lastId]
        );

        return dados[0];
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
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