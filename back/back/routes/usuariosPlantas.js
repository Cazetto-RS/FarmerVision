import express from 'express';
import * as usuarioPlantas from '../controllers/usuariosPlantas.js';

const router = express.Router();

router.get('/UserPlantas/:id',usuarioPlantas.consultarPorId)
router.get('/UserPlantas', usuarioPlantas.consultarTodos);
router.get('/UserPlantas/:id',usuarioPlantas.deletar)
router.get('/UserPlantas', usuarioPlantas.cadastrar);

export default router;