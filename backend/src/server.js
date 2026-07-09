import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUserApp from './routers/userApp_routes.js';
import routerCultivoUser from './routers/cultivoUser_routes.js';
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import routerTratamientos from './routers/tratamiento_routes.js'



const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => res.send("Hola server"))

app.use('/api', routerUserApp)
app.use('/api', routerCultivoUser)

// Rutas para tratamientos
app.use('/api',routerTratamientos)

export default app;
