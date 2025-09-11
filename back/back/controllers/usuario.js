import * as Usuario from '../models/usuario.js'

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

export const cadastrar = async (req, res)=>{
    try {
        const usuario = req.body; 
        const novoUsuario = await Usuario.cadastrar(usuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await Usuario.deletar(id);
        res.status(200).json({ method: 'DELETE', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}