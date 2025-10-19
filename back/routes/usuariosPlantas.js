import express from 'express';
import * as usuarioPlantas from '../controllers/usuariosPlantas.js';
import autenticar from "../middleware/autenticacao.js";

const router = express.Router();

router.get('/UserPlantas/:id',autenticar,usuarioPlantas.consultarPorId)
router.get('/UserPlantas', autenticar,usuarioPlantas.consultarTodos);
router.delete('/UserPlantas/:id',autenticar,usuarioPlantas.deletar);
router.get('/UserPlantas/usuario/:usuarioId', autenticar, usuarioPlantas.listarPorUsuario);
router.post('/UserPlantas', autenticar,usuarioPlantas.cadastrar);

export default router;