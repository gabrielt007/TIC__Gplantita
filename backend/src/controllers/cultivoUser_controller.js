import { sendMailToOwner } from '../helpers/sendMail.js'
import cultivoUser from '../models/cultivoUser.js'
import mongoose from 'mongoose';

const registrarCultivo = async(req, res) => {
try{
    //paso1
    const {emailPropietario}=req.body
    if(Object.values(req.body).includes("")){
        return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos del formulario"})
    }

    //paso2
    const emailExiste = await cultivoUser.findOne({emailPropietario})

    if(emailExiste) return res.status(400).json({msg: "Lo sentimos, el email ya existe"})


    const password = Math.random().toString(36).toUpperCase().slice(2, 5)

    const nuevoCultivo = new cultivoUser({
            ...req.body,
            passwordPropietario: await cultivoUser.prototype.encryptPassword("GH"+password),
            usuario: req.userAppHeader._id
    })
    
    if(req.files?.image){
        const {secure_url, public_id} = await subirImagenCloudinary(req.files.image.tempFilePath)
        nuevoCultivo.avatarCultivo = secure_url
        nuevoCultivo.avatarCultivoID = public_id
    }
    if(req.body?.avatarCultivo){
        const {secure_url} = await subirBase64Cloudinary(req.body.avatarCultivo)
        nuevoCultivo.avatarCultivo = secure_url
    }

    await sendMailToOwner(emailPropietario, "GH"+password)



    res.send("Cultivo registrado exitosamente")
    await nuevoCultivo.save();



}catch(error){
    console.log(error)
    res.status(500).json({msg: "Error al registrar el cultivo"})
}

}

const listarCultivos = async (req, res)=>{
    try {







        const cultivos = await cultivoUser.find({estadoCultivo:true,usuario:req.userAppHeader._id}).select("-passwordPropietario -__v -createdAt -updatedAt").populate("usuario", "nombre")

        res.status(200).json(cultivos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Error al listar los cultivos"})
    }
}


const detalleCultivo = async (req, res) =>{
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: "Lo sentimos, el cultivo no existe"})
        }

        const cultivoDBB = await cultivoUser.findById(id).select("-passwordPropietario -__v -createdAt -updatedAt").populate("usuario", "nombre")
        
        res.status(200).json(cultivoDBB)

        
 
        
    } catch (error) {

        res.status(500).json({msg: "Error al obtener el cultivo"})
        
    }
}

const eliminarCultivo = async (req, res) => {
    try {

        const {id} = req.params
        const {tiempoCosecha} = req.body

        if(Object.values(req.body).includes("")){
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos del formulario"})
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: "Lo sentimos, el cultivo no existe"})
        }

        await cultivoUser.findByIdAndUpdate(id, {estadoCultivo:false, tiempoCosecha: Date.parse(tiempoCosecha)})




        res.status(200).json({msg: "Fecha de eliminado resgistrado correctamente"})


    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error al eliminar el cultivo"})
    }
}


export {
    registrarCultivo,
    listarCultivos,
    detalleCultivo,
    eliminarCultivo
}
