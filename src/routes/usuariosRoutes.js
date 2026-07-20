import { Router } from 'express';
import {listarUsuarios, registrarUsuario, buscarUsuario, actualizarUsuario, actualizarPerfil, cambiarPassword, eliminarUsuario } from '../controladores/usuariosCtrl.js';

const router = Router();

router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', buscarUsuario);
router.post('/usuarios', registrarUsuario);
router.put('/usuarios/:id', actualizarUsuario);
router.put('/usuarios/perfil/:id', actualizarPerfil);
router.put('/usuarios/password/:id', cambiarPassword);
router.delete('/usuarios/:id', eliminarUsuario);

export default router;