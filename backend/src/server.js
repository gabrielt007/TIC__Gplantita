import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUserApp from './routers/userApp_routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => res.send("Hola server"))

app.use('/api', routerUserApp)

export default app;
