import express from 'express';
import * as usuario from '../controllers/usuario.js';

const router = express.Router();

router.get('/usuario/:id',usuario.consultarPorId)
router.get('/usuarios', usuario.consultarTodos);
router.post('/usuario',usuario.cadastrar);
router.delete('/usuario/:id',usuario.deletar);

export default router;