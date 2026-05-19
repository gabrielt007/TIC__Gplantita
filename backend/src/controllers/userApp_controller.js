import userApp  from "../models/userApp.js";
import { sendMailToRecoveryPassword, sendMailToRegister} from "../helpers/sendMail.js";

const registro = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(Object.values(req.body).includes("")){
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos del formulario"})
        }
        const verificarEmailBDD = await userApp.findOne({ email });

        if(verificarEmailBDD){
            return res.status(400).json({ msg : "Lo sentimos, el email ya se encuentra registrado"})
        }
        const nuevoUserApp = new userApp(req.body)
        nuevoUserApp.password = await nuevoUserApp.encryptPassword(password)
        const token = nuevoUserApp.createToken();
        await sendMailToRegister(email, token);
        await nuevoUserApp.save();
        res.status(200).json({ msg : "Revisa tu correo electrónico para confirmar tu ceunta"})

    }catch (error){
        res.status(500).json({msg: `Error en el servidor - ${error}`});
    }
}

const confirmarMail = async (req, res) =>{
    try{
        const  { token } = req.params
        const userAppBDD = await userApp.findOne({ token })
        if(!userAppBDD){
            return res.status(404).json({ msg: "Token inválido o cuenta ya confirmada"})
        }
        userAppBDD.token = null
        userAppBDD.confirmEmail = true
        await userAppBDD.save();

        res.status(200).json({msg: "Cuenta confirmada, ya puedes inciar sesión"})
    }catch(error){
        res.status(500).json({msg: `Error en el servidor - ${error}`})
    }
}

const recuperarPassword = async (req, res) => {

    try {
        // Paso 1
        const { email } = req.body
        // Paso 2
        if (!email) return res.status(400).json({ msg: "Debes ingresar un correo electrónico" })
        const userAppBDD = await userApp.findOne({ email })
        if (!userAppBDD) return res.status(404).json({ msg: "El usuario no se encuentra registrado" })
        // Paso 3
        const token = userAppBDD.createToken()
        userAppBDD.token = token
        await sendMailToRecoveryPassword(email, token)
        await userAppBDD.save()
        // Paso 4
        res.status(200).json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" })
        
    } catch (error) {
    console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}



const comprobarTokenPasword = async (req,res)=>{
    try {
        // Paso 1
        const {token} = req.params
        // Paso 2
        const userAppBDD = await userApp.findOne({token})
        if(userAppBDD?.token !== token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        // Paso 3

        // Paso 4
        res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
    
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}



const crearNuevoPassword = async (req,res)=>{

    try {
        // Paso 1
        const{password,confirmpassword} = req.body
        const { token } = req.params
        // Paso 2
        if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Debes llenar todos los campos"})
        if(password !== confirmpassword) return res.status(404).json({msg:"Los passwords no coinciden"})
        const userAppBDD = await userApp.findOne({token})
        if(!userAppBDD) return res.status(404).json({msg:"No se puede validar la cuenta"})
        // Paso 3
        userAppBDD.token = null
        userAppBDD.password = await userAppBDD.encryptPassword(password)
        await userAppBDD.save()
        // Paso 4
        res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error}` })
    }
}




export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPasword,
    crearNuevoPassword

}