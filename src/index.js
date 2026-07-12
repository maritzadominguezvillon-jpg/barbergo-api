import app from './app.js';
import { PORT } from './config.js';
import { conmysql } from './db.js';

async function main() {
    try {

        const connection = await conmysql.getConnection();

        console.log("Base de datos conectada correctamente");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });

    } catch (error) {

        console.error("Error al conectar con la base de datos");
        console.error(error);

    }
}

main();