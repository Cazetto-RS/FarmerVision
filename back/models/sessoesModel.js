import crypto from "crypto";
import pool from "../database/data.js";

const consultarPorUsuario = async (usuario, cx = null) => {
  let localCx = cx;
  try {
    if (!localCx) {
      localCx = await pool.getConnection();
    }
    const cmdSql = "SELECT * FROM sessoes WHERE usuario = ?;";
    const [rows] = await localCx.query(cmdSql, [usuario]);
    return (rows.length > 0) ? rows[0] : null;
  } catch (error) {
    throw new Error("Erro ao buscar usuário por ID: " + error.message);
  } finally {
    if (!cx && localCx) {
      localCx.release();
    }
  }
};

export const buscarSessao = async (usuario, token) => {
  try {
    const sessao = await consultarPorUsuario(usuario);
    if (!sessao || sessao.token !== token) {
      return null;
    }
    return sessao;
  } catch (error) {
    throw error;
  }
};

export const criar = async (usuario, validade) => {
  const cx = await pool.getConnection();
  try {
    const token = crypto.randomBytes(64).toString("hex"); // 128 caracteres
    const cmdSql = `
      INSERT INTO sessoes (usuario, token, validade)
      VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR))
      ON DUPLICATE KEY UPDATE 
          token = VALUES(token), 
          validade = VALUES(validade);
    `;
    const [rows] = await cx.query(cmdSql, [usuario, token, validade]);

    if (rows.affectedRows === 0) {
      throw new Error("Erro ao criar uma sessão para o usuário");
    }

    return await consultarPorUsuario(usuario, cx);
    
  } catch (error) {
    throw error;
  } finally {
    if (cx) cx.release();
  }
};

export const extender = async (usuario, tempo_em_horas) => {
  let cx;
  try {
    const cmdSql =
      "UPDATE sessoes SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE usuario = ?;";
    cx = await pool.getConnection();
    const [rows] = await cx.query(cmdSql, [tempo_em_horas, usuario]);
    return rows.affectedRows > 0;
  } catch (error) {
    throw error;
  } finally {
    if (cx) cx.release();
  }
};
