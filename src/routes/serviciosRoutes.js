import { Router } from 'express';

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
router.post('/servicios', registrarServicio);

// Actualizar servicio
router.put('/servicios/:id', actualizarServicio);

// Eliminar servicio
router.delete('/servicios/:id', eliminarServicio);

export default router;