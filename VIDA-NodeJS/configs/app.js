//Imports
/*
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import alertRoutes from '../src/alerta/alerta.routes.js'


//Configuration
//const app = express()
//config()


/*
const port = process.env.PORT || 3200


//Configurating the server 
//(Configurando el servidor de express)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Acepta o reniega las solicitudes.
app.use(helmet()) //Seguridad
app.use(morgan('dev'))



//Routes
app.use(alertRoutes)

//Levantamos el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)

}

*/

// Imports necesarios
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import alertRoutes from '../src/alerta/alerta.routes.js';
import multer from 'multer'; // Importar multer para manejar la subida de archivos

const app = express();
config(); // Cargar las variables de entorno desde un archivo .env

const port = process.env.PORT || 3200;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5 MB
});

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imgBuffer = req.file.buffer; // Obtener el buffer del archivo
    const imgBase64 = imgBuffer.toString('base64'); // Convertir el buffer a base64
    // Aquí podrías almacenar imgBase64 en MongoDB
    res.send({ base64: imgBase64 });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(alertRoutes);

// Iniciar el servidor
export const initServer = () => {
    app.listen(port, () => {
        console.log(`Server HTTP running in port ${port}`);
    });
};
