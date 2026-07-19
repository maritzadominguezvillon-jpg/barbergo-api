import { Router } from 'express';
import {
    listarCitas,
    buscarCita,
    registrarCita,
    actualizarCita,
    eliminarCita,
    misCitas
} from '../controladores/citasCtrl.js';

import { validarToken } from '../middleware/validarToken.js';

const router = Router();

// Listar citas
router.get('/citas', listarCitas);

// Buscar cita por ID
router.get('/citas/:id', buscarCita);

// Registrar cita (requiere token)
router.post('/citas', validarToken, registrarCita);

// Actualizar cita (requiere token)
router.put('/citas/:id', validarToken, actualizarCita);

// Eliminar cita (requiere token)
router.delete('/citas/:id', validarToken, eliminarCita);

// Mis citas
router.get('/mis-citas', validarToken, misCitas);

export default router;