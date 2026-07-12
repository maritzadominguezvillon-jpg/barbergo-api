import { conmysql } from '../db.js';

// =======================================
// LISTAR SERVICIOS
// =======================================
export const listarServicios = async (req, res) => {

    try {

        const [rows] = await conmysql.query(
            'SELECT * FROM servicios'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// BUSCAR SERVICIO POR ID
// =======================================
export const buscarServicio = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(
            'SELECT * FROM servicios WHERE id_servicio = ?',
            [id]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: 'Servicio no encontrado'
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
// REGISTRAR SERVICIO
// =======================================
export const registrarServicio = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            precio,
            duracion,
            categoria
        } = req.body;

        const [rows] = await conmysql.query(
            `INSERT INTO servicios
            (nombre, descripcion, precio, duracion, categoria)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nombre,
                descripcion,
                precio,
                duracion,
                categoria
            ]
        );

        res.json({
            mensaje: 'Servicio registrado correctamente',
            id_servicio: rows.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ACTUALIZAR SERVICIO
// =======================================
export const actualizarServicio = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            precio,
            duracion,
            categoria
        } = req.body;

        const [resultado] = await conmysql.query(
            `UPDATE servicios
            SET nombre=?,
                descripcion=?,
                precio=?,
                duracion=?,
                categoria=?
            WHERE id_servicio=?`,
            [
                nombre,
                descripcion,
                precio,
                duracion,
                categoria,
                id
            ]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: 'Servicio no encontrado'
            });

        }

        res.json({
            mensaje: 'Servicio actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ELIMINAR SERVICIO
// =======================================
export const eliminarServicio = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await conmysql.query(
            'DELETE FROM servicios WHERE id_servicio = ?',
            [id]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: 'Servicio no encontrado'
            });

        }

        res.json({
            mensaje: 'Servicio eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};