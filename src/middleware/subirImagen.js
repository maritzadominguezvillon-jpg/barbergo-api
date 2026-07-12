import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },

    filename: (req, file, cb) => {

        const nombre = Date.now() + path.extname(file.originalname);

        cb(null, nombre);

    }

});

// Validar que sea una imagen
const fileFilter = (req, file, cb) => {

    const tipos = /jpeg|jpg|png|webp/;

    const extension = tipos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = tipos.test(file.mimetype);

    if (extension && mimetype) {

        return cb(null, true);

    }

    cb(new Error('Solo se permiten imágenes'));

};

// Exportar middleware
export const subirImagen = multer({

    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }

});