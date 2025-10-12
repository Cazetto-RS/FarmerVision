import pool from '../database/data.js'
import bcrypt from 'bcryptjs'

export const consultarTodos = async () => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT id, nome, telefone, email, apelidos FROM usuarios;';
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
        const cmdSql = 'SELECT id,nome,telefone,email, apelidos FROM usuarios WHERE id = ?;';
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

export const consultarPorEmail = async (email) => {
    let cx;
    try {
        cx = await pool.getConnection();
        // Aqui precisa trazer a senha também!
        const cmdSql = 'SELECT id, nome, telefone, email, apelidos, password FROM usuarios WHERE email = ?;';
        console.log(email);
        const [dados] = await cx.query(cmdSql, [email]);
        return dados; // array de usuários
    } finally {
        if (cx) cx.release();
    }
};

export const cadastrar = async (usuario) => {
    let cx;
    try {        
        const {nome,telefone,email,password} = usuario;
        const cmdSql = 'INSERT INTO usuarios (nome,telefone,email,password) VALUES (?, ?, ?, ?);';
        cx = await pool.getConnection();
        const hashSenha = await bcrypt.hash(password, 10);
        await cx.query(cmdSql, [nome,telefone,email,hashSenha]);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;
 
        const [dados, meta_dados] = await cx.query('SELECT nome,telefone,email FROM usuarios WHERE id = ?;', [lastId]);
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
        const cmdSql = 'DELETE FROM usuarios WHERE id = ?;';
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

export const login = async (email, password) => {
    const usuarios = await consultarPorEmail(email);
    console.log(usuarios);
    const usuario = usuarios[0]; // pega o primeiro
    if (!usuario) return null;

    const senhaValida = await bcrypt.compare(password, usuario.password);
    if (!senhaValida) return null;

    delete usuario.password; // não retorna a senha
    return usuario;
};