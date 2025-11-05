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

// Buscar todas as plantas de um usuário
export const consultarPorUsuario = async (usuarioId) => {
  let cx;
  try {
    cx = await pool.getConnection();
    const cmdSql = `
      SELECT 
        usuario_plantas.id AS id_vinculo,
        usuario_plantas.usuario_id,
        usuario_plantas.planta_id,
        plantas.*,
        usuarios.nome AS nome_usuario,
        usuarios.email,
        usuario_plantas.data_cadastro
      FROM usuario_plantas
      JOIN plantas ON usuario_plantas.planta_id = plantas.id
      JOIN usuarios ON usuario_plantas.usuario_id = usuarios.id
      WHERE usuario_plantas.usuario_id = ?
      ORDER BY usuario_plantas.data_cadastro DESC;
    `;
    const [dados] = await cx.query(cmdSql, [usuarioId]);
    return dados;
  } finally {
    if (cx) cx.release();
  }
};


// Buscar uma planta específica (relacionamento direto)
export const consultarPorId = async (id) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = `
            SELECT 
                usuario_plantas.*, 
                plantas.*, 
                usuarios.nome, 
                usuarios.email
            FROM 
                usuario_plantas
            JOIN plantas 
                ON usuario_plantas.planta_id = plantas.id
            JOIN usuarios 
                ON usuario_plantas.usuario_id = usuarios.id
            WHERE 
                usuario_plantas.id = ?;
        `;
        const [dados] = await cx.query(cmdSql, [id]);
        return dados;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
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
        cx = await pool.getConnection();

        // 🧠 executa o delete e verifica o resultado
        const [resultado] = await cx.query(
            'DELETE FROM usuario_plantas WHERE id = ? LIMIT 1',
            [id]
        );

        console.log("🗑️ Resultado do DELETE:", resultado);

        if (resultado.affectedRows === 0) {
            throw new Error('Nenhum registro encontrado com este ID.');
        }

        return { success: true, id };
    } catch (error) {
        console.error("Erro no model usuario_plantas.deletar:", error);
        throw error;
    } finally {
        if (cx) cx.release();
    }
};
