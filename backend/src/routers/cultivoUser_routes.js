import { Router } from "express";
import { registrarCultivo  } 
from '../controllers/cultivoUser_controller.js'
import { verificarTokenJWT } from "../middleware/JWT.js";



const routerCultivoUser = Router();

routerCultivoUser.post("/cultivo/registro",verificarTokenJWT, registrarCultivo)

export default routerCultivoUser