import { conmysql } from '../db.js';
import bcrypt from 'bcryptjs';

// =======================================
// LISTAR USUARIOS
// =======================================
export const listarUsuarios = async (req, res) => {

    try {

        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// REGISTRAR USUARIO
// =======================================
export const registrarUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            telefono,
            correo,
            password,
            rol
        } = req.body;

        // Encriptar contraseña
        const passwordEncriptada = await bcrypt.hash(password, 10);

        const [rows] = await conmysql.query(
            `INSERT INTO usuarios
            (nombre, apellido, telefono, correo, password, rol)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nombre,
                apellido,
                telefono,
                correo,
                passwordEncriptada,
                rol
            ]
        );

        res.json({
            mensaje: "Usuario registrado correctamente",
            id_usuario: rows.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// BUSCAR USUARIO POR ID
// =======================================
export const buscarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ACTUALIZAR USUARIO
// =======================================
export const actualizarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            apellido,
            telefono,
            correo,
            password,
            rol
        } = req.body;

        // Encriptar contraseña
        const passwordEncriptada = await bcrypt.hash(password, 10);

        const [resultado] = await conmysql.query(
            `UPDATE usuarios
            SET nombre=?,
                apellido=?,
                telefono=?,
                correo=?,
                password=?,
                rol=?
            WHERE id_usuario=?`,
            [
                nombre,
                apellido,
                telefono,
                correo,
                passwordEncriptada,
                rol,
                id
            ]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ELIMINAR USUARIO
// =======================================
export const eliminarUsuario = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await conmysql.query(
            'DELETE FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};