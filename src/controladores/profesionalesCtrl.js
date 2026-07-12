import { conmysql } from '../db.js';

// =======================================
// LISTAR PROFESIONALES
// =======================================
export const listarProfesionales = async (req, res) => {

    try {

        const [rows] = await conmysql.query(
            'SELECT * FROM profesionales'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// BUSCAR PROFESIONAL POR ID
// =======================================
export const buscarProfesional = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(
            'SELECT * FROM profesionales WHERE id_profesional = ?',
            [id]
        );

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: 'Profesional no encontrado'
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
// REGISTRAR PROFESIONAL
// =======================================
export const registrarProfesional = async (req, res) => {

    try {

        const {
            nombre,
            especialidad,
            telefono,
            estado
        } = req.body;

        const foto = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const [rows] = await conmysql.query(
            `INSERT INTO profesionales
            (nombre, especialidad, telefono, foto, estado)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nombre,
                especialidad,
                telefono,
                foto,
                estado
            ]
        );

        res.json({
            mensaje: 'Profesional registrado correctamente',
            id_profesional: rows.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ACTUALIZAR PROFESIONAL
// =======================================
export const actualizarProfesional = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            especialidad,
            telefono,
            estado,
            foto
        } = req.body;

        const rutaFoto = req.file
            ? `/uploads/${req.file.filename}`
            : foto;

        const [resultado] = await conmysql.query(
            `UPDATE profesionales
            SET nombre=?,
                especialidad=?,
                telefono=?,
                foto=?,
                estado=?
            WHERE id_profesional=?`,
            [
                nombre,
                especialidad,
                telefono,
                rutaFoto,
                estado,
                id
            ]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: 'Profesional no encontrado'
            });

        }

        res.json({
            mensaje: 'Profesional actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ELIMINAR PROFESIONAL
// =======================================
export const eliminarProfesional = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await conmysql.query(
            'DELETE FROM profesionales WHERE id_profesional = ?',
            [id]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: 'Profesional no encontrado'
            });

        }

        res.json({
            mensaje: 'Profesional eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};