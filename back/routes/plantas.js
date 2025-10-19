import express from 'express';
import * as plantas from '../controllers/plantas.js';
import autenticar from "../middleware/autenticacao.js";

const router = express.Router();

router.get('/planta/:id',autenticar,plantas.consultarPorId)
router.get('/plantas', plantas.consultarTodos);

export default router;