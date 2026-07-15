import { Router } from 'express';
import { subirImagen } from '../middleware/subirImagen.js';

import {
    listarServicios,
    buscarServicio,
    registrarServicio,
    actualizarServicio,
    eliminarServicio
} from '../controladores/serviciosCtrl.js';

const router = Router();

// Listar todos los servicios
router.get('/servicios', listarServicios);

// Buscar servicio por ID
router.get('/servicios/:id', buscarServicio);

// Registrar servicio
router.post(
    '/servicios',
    subirImagen.single('imagen'),
    registrarServicio
);

// Actualizar servicio
router.put(
    '/servicios/:id',
    subirImagen.single('imagen'),
    actualizarServicio
);

// Eliminar servicio
router.delete('/servicios/:id', eliminarServicio);

export default router;