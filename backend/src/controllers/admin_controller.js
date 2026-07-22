import Admin from "../models/admin.js";
import userApp from "../models/userApp.js";
import { crearTokenJWT } from "../middleware/JWT.js";

// Registro de un Administrador
const registro = async (req, res) => {
    try {
        const { email, password, nombre } = req.body
        if (Object.values(req.body).includes("") || !email || !password || !nombre) {
            return res.status(400).json({ msg: "Debes llenar todos los campos requeridos" })
        }

        const emailExistente = await Admin.findOne({ email })
        if (emailExistente) {
            return res.status(400).json({ msg: "El correo electrónico ya se encuentra registrado" })
        }

        const nuevoAdmin = new Admin(req.body)
        nuevoAdmin.password = await nuevoAdmin.encryptPassword(password)
        await nuevoAdmin.save()

        res.status(201).json({ msg: "Administrador registrado exitosamente" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message || error}` })
    }
}

// Login del Administrador
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (Object.values(req.body).includes("") || !email || !password) {
            return res.status(400).json({ msg: "Debes llenar todos los campos requeridos" })
        }

        const adminBDD = await Admin.findOne({ email })
        if (!adminBDD) {
            return res.status(404).json({ msg: "El correo electrónico no está registrado" })
        }

        const verificarPassword = await adminBDD.matchPassword(password)
        if (!verificarPassword) {
            return res.status(401).json({ msg: "La contraseña es incorrecta" })
        }

        const token = crearTokenJWT(adminBDD._id, adminBDD.rol)
        const { nombre, _id, rol } = adminBDD

        res.status(200).json({
            msg: "Inicio de sesión exitoso como Administrador",
            token,
            rol,
            nombre,
            email: adminBDD.email,
            _id
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message || error}` })
    }
}

// Ver perfil del Admin logueado
const perfil = (req, res) => {
    try {
        const { password, token, __v, ...datosAdmin } = req.adminHeader
        res.status(200).json(datosAdmin)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al obtener el perfil del administrador" })
    }
}

// Listar todos los usuarios activos (status: true)
const listarUsuariosActivos = async (req, res) => {
    try {
        const usuarios = await userApp.find({ status: true }).select("-password -token -__v -updatedAt")
        res.status(200).json(usuarios)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al listar los usuarios activos" })
    }
}

// Desactivar usuario por su correo electrónico (soft-delete / cambiar status a false)
const desactivarUsuario = async (req, res) => {
    try {
        const email = req.body?.email || req.params?.email

        if (!email) {
            return res.status(400).json({ msg: "Debes proporcionar el correo electrónico del usuario" })
        }

        const userBDD = await userApp.findOne({ email })
        if (!userBDD) {
            return res.status(404).json({ msg: "El usuario no existe o no se encuentra registrado" })
        }

        if (!userBDD.status) {
            return res.status(400).json({ msg: "El usuario ya se encuentra inactivo" })
        }

        userBDD.status = false
        await userBDD.save()

        res.status(200).json({ msg: `El usuario con email ${email} ha sido desactivado exitosamente` })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message || error}` })
    }
}

export {
    registro,
    login,
    perfil,
    listarUsuariosActivos,
    desactivarUsuario
}
