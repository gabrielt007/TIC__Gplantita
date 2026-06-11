import { Router } from "express";
import { registrarCultivo, listarCultivos  } 
from '../controllers/cultivoUser_controller.js'
import { verificarTokenJWT } from "../middleware/JWT.js";



const routerCultivoUser = Router();

routerCultivoUser.post("/cultivo/registro",verificarTokenJWT, registrarCultivo)

routerCultivoUser.get("/cultivo/listar",verificarTokenJWT, listarCultivos)

export default routerCultivoUser