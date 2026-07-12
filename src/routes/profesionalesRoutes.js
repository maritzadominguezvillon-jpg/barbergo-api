import { Router } from 'express';

import {
    listarProfesionales,
    buscarProfesional,
    registrarProfesional,
    actualizarProfesional,
    eliminarProfesional
} from '../controladores/profesionalesCtrl.js';

import { subirImagen } from '../middleware/subirImagen.js';

const router = Router();

// Listar
router.get('/profesionales', listarProfesionales);

// Buscar por ID
router.get('/profesionales/:id', buscarProfesional);

// Registrar con foto
router.post(
    '/profesionales',
    subirImagen.single('foto'),
    registrarProfesional
);

// Actualizar con foto
router.put(
    '/profesionales/:id',
    subirImagen.single('foto'),
    actualizarProfesional
);

// Eliminar
router.delete('/profesionales/:id', eliminarProfesional);

export default router;