import jwt from 'jsonwebtoken';

export const validarToken = (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                auth: false,
                mensaje: 'Token no proporcionado'
            });
        }

        const tokenLimpio = token.replace('Bearer ', '');

        const decoded = jwt.verify(
            tokenLimpio,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            auth: false,
            mensaje: 'Token inválido'
        });

    }

};