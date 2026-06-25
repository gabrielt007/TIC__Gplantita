import { Router } from "express";
import { registrarCultivo, listarCultivos, detalleCultivo, eliminarCultivo, login, perfil } 
from '../controllers/cultivoUser_controller.js'
import { verificarTokenJWT } from "../middleware/JWT.js";

const routerCultivoUser = Router();
routerCultivoUser.post("/cultivo/login", login)

routerCultivoUser.get("/cultivo/perfil", verificarTokenJWT, perfil)


routerCultivoUser.post("/cultivo/registro",verificarTokenJWT, registrarCultivo)

routerCultivoUser.get("/cultivos",verificarTokenJWT, listarCultivos)

routerCultivoUser.get("/cultivo/detalle/:id", verificarTokenJWT, detalleCultivo)

routerCultivoUser.delete("/cultivo/eliminar/:id", verificarTokenJWT, eliminarCultivo)



export default routerCultivoUser