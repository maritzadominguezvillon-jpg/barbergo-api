import { conmysql } from '../db.js';

// =======================================
// LISTAR CITAS
// =======================================
export const listarCitas = async (req, res) => {

    try {

        const [rows] = await conmysql.query(`
            SELECT
    c.id_cita,
    u.nombre AS cliente,
    s.nombre AS servicio,
    s.imagen,
    p.nombre AS profesional,
    c.fecha,
    c.hora,
    c.estado
FROM citas c
INNER JOIN usuarios u
    ON c.id_usuario = u.id_usuario
INNER JOIN profesionales p
    ON c.id_profesional = p.id_profesional
INNER JOIN servicios s
    ON c.id_servicio = s.id_servicio
ORDER BY c.fecha, c.hora
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// BUSCAR CITA POR ID
// =======================================
export const buscarCita = async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await conmysql.query(`
            SELECT
                c.id_cita,
                u.nombre AS cliente,
                p.nombre AS profesional,
                s.nombre AS servicio,
                c.fecha,
                c.hora,
                c.estado
            FROM citas c
            INNER JOIN usuarios u
                ON c.id_usuario = u.id_usuario
            INNER JOIN profesionales p
                ON c.id_profesional = p.id_profesional
            INNER JOIN servicios s
                ON c.id_servicio = s.id_servicio
            WHERE c.id_cita = ?
        `, [id]);

        if (rows.length <= 0) {

            return res.status(404).json({
                mensaje: "Cita no encontrada"
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
// REGISTRAR CITA
// =======================================
export const registrarCita = async (req, res) => {

    try {

        const {
            id_usuario,
            id_profesional,
            id_servicio,
            fecha,
            hora
        } = req.body;

        const [rows] = await conmysql.query(
            `INSERT INTO citas
            (
                id_usuario,
                id_profesional,
                id_servicio,
                fecha,
                hora,
                estado
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                'Pendiente'
            )`,
            [
                id_usuario,
                id_profesional,
                id_servicio,
                fecha,
                hora
            ]
        );

        res.json({
            mensaje: "Cita registrada correctamente",
            id_cita: rows.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ACTUALIZAR CITA
// =======================================
export const actualizarCita = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            id_usuario,
            id_profesional,
            id_servicio,
            fecha,
            hora,
            estado
        } = req.body;

        const [resultado] = await conmysql.query(
            `UPDATE citas
            SET
                id_usuario=?,
                id_profesional=?,
                id_servicio=?,
                fecha=?,
                hora=?,
                estado=?
            WHERE id_cita=?`,
            [
                id_usuario,
                id_profesional,
                id_servicio,
                fecha,
                hora,
                estado,
                id
            ]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: "Cita no encontrada"
            });

        }

        res.json({
            mensaje: "Cita actualizada correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// ELIMINAR CITA
// =======================================
export const eliminarCita = async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await conmysql.query(
            'DELETE FROM citas WHERE id_cita = ?',
            [id]
        );

        if (resultado.affectedRows <= 0) {

            return res.status(404).json({
                mensaje: "Cita no encontrada"
            });

        }

        res.json({
            mensaje: "Cita eliminada correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// TODAS LAS CITAS (ADMIN)
// =======================================
export const todasLasCitas = async (req, res) => {

    try {

        const [rows] = await conmysql.query(`
            SELECT
                c.id_cita,
                u.nombre AS cliente,
                s.nombre AS servicio,
                s.imagen,
                p.nombre AS profesional,
                c.fecha,
                c.hora,
                c.estado
            FROM citas c
            INNER JOIN usuarios u
                ON c.id_usuario = u.id_usuario
            INNER JOIN servicios s
                ON c.id_servicio = s.id_servicio
            INNER JOIN profesionales p
                ON c.id_profesional = p.id_profesional
            ORDER BY c.fecha, c.hora
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// =======================================
// MIS CITAS DEL USUARIO LOGUEADO
// =======================================
export const misCitas = async (req, res) => {

    try {

        const id_usuario = req.usuario.id_usuario;

        const [rows] = await conmysql.query(`
            SELECT
                c.id_cita,
                s.nombre,
                s.imagen,
                p.nombre AS profesional,
                c.fecha,
                c.hora,
                c.estado
            FROM citas c
            INNER JOIN servicios s
                ON c.id_servicio = s.id_servicio
            INNER JOIN profesionales p
                ON c.id_profesional = p.id_profesional
            WHERE c.id_usuario = ?
            ORDER BY c.fecha, c.hora
        `,[id_usuario]);

        res.json(rows);

    } catch(error){

        res.status(500).json({
            mensaje:error.message
        });

    }

    export const cambiarEstadoCita = async (req,res)=>{

    try{

        const {id}=req.params;

        const {estado}=req.body;


        const [resultado]=await conmysql.query(
            `
            UPDATE citas
            SET estado=?
            WHERE id_cita=?
            `,
            [
                estado,
                id
            ]
        );


        if(resultado.affectedRows<=0){

            return res.status(404).json({

                mensaje:"Cita no encontrada"

            });

        }


        res.json({

            mensaje:"Estado actualizado correctamente"

        });


    }catch(error){

        res.status(500).json({

            mensaje:error.message

        });

    }

};


}