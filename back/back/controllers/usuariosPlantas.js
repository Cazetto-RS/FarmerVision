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

export const consultarPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UsuarioPlantas.consultarPorId(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Usuario não encontrado ou não possui plantas" });
    }
    return Response.success(res,{data: data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
    const usuario_id = req.loginId;
    const planta_id = req.params.id;
    const data = await UsuarioPlantas.deletar(usuario_id, planta_id);
    res.status(200).json({ method: 'DELETE', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};