import { Router } from 'express';
import {listarUsuarios, registrarCliente, registrarUsuario, buscarUsuario, actualizarUsuario, actualizarPerfil, cambiarPassword, recuperarPassword, eliminarUsuario } from '../controladores/usuariosCtrl.js';

const router = Router();

router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', buscarUsuario);
router.post('/usuarios', registrarUsuario);
router.post('/registro', registrarCliente);
router.put('/usuarios/:id', actualizarUsuario);
router.put('/usuarios/perfil/:id', actualizarPerfil);
router.put('/usuarios/password/:id', cambiarPassword);
router.put('/usuarios/recuperar-password', recuperarPassword);
router.delete('/usuarios/:id', eliminarUsuario);

export default router;