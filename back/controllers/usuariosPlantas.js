import * as UsuarioPlantas from '../models/usuariosPlantas.js'
import * as Response from '../utils/responses.js';
export const consultarTodos = async (req, res) => {
    try {
        const data = await UsuarioPlantas.consultarTodos();
        return Response.success(res,{data: data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Buscar todas as plantas de um usuário
export const listarPorUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId;
        const dados = await UsuarioPlantas.consultarPorUsuario(usuarioId);
        if (!dados.length) {
            return Response.success(res, {
                success: true,
                data: [],
                message: "Usuário ainda não tem plantas"
            });
        }
        return Response.success(res, { data: dados });
    } catch (error) {
        console.error(error);
        return Response.error(res, 500, error.message);
    }
};

// Buscar uma planta específica (planta_usuario.id)
export const consultarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const dados = await UsuarioPlantas.consultarPorId(id);
        return Response.success(res, { data: dados });
    } catch (error) {
        console.error(error);
        return Response.error(res, 500, error.message);
    }
};

export const cadastrar = async (req, res) => {
    try {
        const {planta_id } = req.body;
        const usuario_id = req.loginId;

        console.log(planta_id, usuario_id)

        if (!usuario_id || !planta_id) {
            return res.status(400).json({ error: "usuario_id e planta_id são obrigatórios" });
        }

        const data = await UsuarioPlantas.cadastrar({ usuario_id, planta_id });
        res.status(201).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("🗑️ Tentando deletar vínculo ID:", id);

        const data = await UsuarioPlantas.deletar(id);
        return res.status(200).json({
            message: "Planta do usuário deletada com sucesso.",
            data
        });
    } catch (error) {
        console.error("Erro no controller deletar:", error);
        res.status(500).json({ error: error.message });
    }
};