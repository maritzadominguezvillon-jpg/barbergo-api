import { conmysql } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        // Verificar que el usuario exista
        const [rows] = await conmysql.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                auth: false,
                mensaje: 'Correo no registrado'
            });

        }

        const usuario = rows[0];

        // Comparar contraseña
        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {

            return res.status(401).json({
                auth: false,
                mensaje: 'Contraseña incorrecta'
            });

        }

        // Crear Token JWT
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        res.json({
    auth: true,
    mensaje: 'Login correcto',
    token,
    usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo,
        rol: usuario.rol,
        fecha_registro: usuario.fecha_registro
    }
});

    } catch (error) {

        res.status(500).json({
            auth: false,
            mensaje: error.message
        });

    }

};