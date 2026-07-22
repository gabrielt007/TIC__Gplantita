import { sendMailToOwner } from '../helpers/sendMail.js'
import { subirImagenCloudinary, subirBase64Cloudinary } from '../helpers/uploadCloudinary.js';
import cultivoUser from '../models/cultivoUser.js'
import mongoose from 'mongoose';
import { crearTokenJWT } from '../middleware/JWT.js';
import Tratamiento from "../models/tratamientoCultivo.js"
import userApp from '../models/userApp.js';

const registrarCultivo = async (req, res) => {
    try {
        //paso1
        const { nombreCultivo } = req.body
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos del formulario" })
        }

        //paso2
        const cultivoExiste = await cultivoUser.findOne({ nombreCultivo })

        if (cultivoExiste) return res.status(400).json({ msg: "Lo sentimos, el nombre del cultivo ya existe" })


        const password = Math.random().toString(36).toUpperCase().slice(2, 5)

        const nuevoCultivo = new cultivoUser({
            ...req.body,
            usuario: req.userAppHeader._id
        })
        nuevoCultivo.passwordPropietario = await nuevoCultivo.encryptPassword(password)

        if (req.files?.imagen) {
            const { secure_url, public_id } = await subirImagenCloudinary(req.files.imagen.tempFilePath)
            nuevoCultivo.avatarCultivo = secure_url
            nuevoCultivo.avatarCultivoID = public_id
        }
        if (req.body?.avatarCultivo) {
            const { secure_url } = await subirBase64Cloudinary(req.body.avatarCultivo)
            nuevoCultivo.avatarCultivo = secure_url
        }

        const user = await userApp.findById(req.userAppHeader._id)
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        }

        const emailUsuario = user.email
        const nombreUsuario = user.nombre

        await sendMailToOwner(emailUsuario, password, nombreUsuario)

        await nuevoCultivo.save();
        res.status(200).json({ msg: "Cultivo registrado exitosamente, revisa tu correo para obtener tu clave de acceso al cultivo" })



    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error al registrar el cultivo" })
    }

}

const listarCultivos = async (req, res) => {
    try {
        const cultivos = await cultivoUser.find({ estadoCultivo: true, usuario: req.userAppHeader._id }).select("-passwordPropietario -__v -createdAt -updatedAt").populate("usuario", "nombre")

        res.status(200).json(cultivos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error al listar los cultivos" })
    }
}


const detalleCultivo = async (req, res) => {
    try {
        // Paso 1 — Obtener el id del cultivo desde la URL
        const { id } = req.params

        // Paso 2 — Validar que el id sea un ObjectId válido de MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        const cultivoBDD = await cultivoUser.findById(id).select(
            "nombrePropietario nombreCultivo tipoPlanta cantidad fechaSalidaCultivo estadoMadurezCultivo fechaIngresoCultivo estadoCultivo detalleCultivo avatarCultivo usuario tratamientos"
        )
        // Paso 2 — Verificar que el cultivo exista en la BDD
        if (!cultivoBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        const tratamientos = await Tratamiento.find().where('cultivoUser').equals(id)
        cultivoBDD.tratamientos = [...tratamientos]

        // Paso 4 — Responder con los datos del cultivo
        res.status(200).json(cultivoBDD)

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al obtener el cultivo" })
    }
}

const eliminarCultivo = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }
        const cultivoEliminado = await cultivoUser.findByIdAndUpdate(id, { estadoCultivo: false, fechaSalidaCultivo: Date.now() })
        if (!cultivoEliminado) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        res.status(200).json({ msg: "Cultivo eliminado correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al eliminar el cultivo" })
    }
}


const login = async (req, res) => {
    try {
        const { password: passwordPropietario, nombre: nombreCultivo } = req.body
        if (Object.values(req.body).includes("") || !passwordPropietario || !nombreCultivo) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos del formulario" })
        }
        const cultivoDB = await cultivoUser.findOne({ nombreCultivo }).select("-__v -createdAt -updatedAt")
        if (!cultivoDB) {
            return res.status(400).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        const passDB = await cultivoDB.matchPassword(passwordPropietario)
        if (!passDB) {
            return res.status(400).json({ msg: "Lo sentimos, la contraseña es incorrecta" })
        }
        const token = crearTokenJWT(cultivoDB._id, cultivoDB.rol)
        cultivoDB.estadoCultivo = true
        await cultivoDB.save()
        const { _id, estadoCultivo } = cultivoDB
        res.status(200).json({
            token,
            estadoCultivo,
            _id
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error.message}` })
    }
}

const perfil = (req, res) => {
    try {
        const { passwordPropietario, token, __v, ...datosPerfil } = req.cultivoHeader
        res.status(200).json(datosPerfil)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al obtener el perfil" })
    }
}



export {
    registrarCultivo,
    listarCultivos,
    detalleCultivo,
    eliminarCultivo,
    login,
    perfil
}
