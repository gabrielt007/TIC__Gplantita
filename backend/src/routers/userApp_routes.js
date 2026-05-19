import { Router } from "express";
import { comprobarTokenPasword, confirmarMail, crearNuevoPassword, recuperarPassword, registro } 
from '../controllers/userApp_controller.js'


const routerUserApp = Router();

routerUserApp.post("/registro", registro)
routerUserApp.get("/confirmar/:token", confirmarMail)

routerUserApp.post('/recuperarpassword',recuperarPassword)
routerUserApp.get('/recuperarpassword/:token',comprobarTokenPasword)
routerUserApp.post('/nuevopassword/:token',crearNuevoPassword)

export default routerUserApp

