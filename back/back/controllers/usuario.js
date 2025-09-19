import * as Usuario from '../models/usuario.js'
import * as Sessoes from '../models/SessoesModel.js';
import * as responses from '../utils/responses.js';

export const consultarTodos = async (req, res) => {
    try {
        const data = await Usuario.consultarTodos();
        res.json(data); // retorna todos os usuários como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const consultarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Usuario.consultarPorId(id);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(data[0]); // retorna apenas o objeto do usuário
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const consultarPorEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const data = await Usuario.consultarPorEmail(email);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(data[0]); // retorna apenas o objeto do usuário
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const cadastrar = async (req, res) => {
    try {
        const usuario = req.body;
        const novoUsuario = await Usuario.cadastrar(usuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Usuario.deletar(id);
        res.status(200).json({ method: 'DELETE', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        const usuario = await Usuario.login(email, password); // <-- aqui corrige
        if (!usuario) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const horas_validade = 36;
        const sessao = await Sessoes.criar(usuario.id, horas_validade);

        const data = {
            token: usuario.id + "." + sessao.token,
            expiracao: sessao.validade,
            usuario
        };

        // Se chegou aqui, login OK
        res.json({ message: "Login realizado com sucesso", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};