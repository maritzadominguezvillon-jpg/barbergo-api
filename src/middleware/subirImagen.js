import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, '../uploads'));

    },


    filename: (req, file, cb) => {

        const nombre = Date.now() + path.extname(file.originalname);

        cb(null, nombre);

    }

});


const fileFilter = (req, file, cb) => {

    const tipos = /jpeg|jpg|png|webp/;

    const extension = tipos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = tipos.test(file.mimetype);


    if(extension && mimetype){

        cb(null,true);

    }else{

        cb(new Error('Solo se permiten imágenes'));

    }

};


export const subirImagen = multer({

    storage,

    fileFilter,

    limits:{
        fileSize:5 * 1024 * 1024
    }

});