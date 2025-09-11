import * as UsuarioPlantas from '../models/usuariosPlantas.js'

export const consultarTodos = async (req, res) => {
    try {
        const data = await UsuarioPlantas.consultarTodos();
        res.json(data); // retorna todos os usuários como JSON
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
      return res.status(404).json({ message: "Planta do usuario não encontrada" });
    }

    res.json(data[0]); // retorna apenas o objeto do usuário
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const cadastrar = async (req, res)=>{
    try {
        const usuarioPlanta = req.body; 
        const novaPlantaUsuario = await UsuarioPlantas.cadastrar(usuarioPlanta);
        res.status(201).json(novaPlantaUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await UsuarioPlantas.deletar(id);
        res.status(200).json({ method: 'DELETE', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}