import Tratamiento from "../models/tratamientoCultivo.js"
import cultivoUser from "../models/cultivoUser.js"
import mongoose from "mongoose"


const registrarTratamiento = async (req, res) => {
    try {
        const { nombreCultivo } = req.body

        if (!req.body || Object.values(req.body).includes("") || !nombreCultivo) {
            return res.status(400).json({ msg: "Debes llenar todos los campos requeridos" })
        }


        const cultivoBDD = await cultivoUser.findOne( {nombreCultivo} )
        if (!cultivoBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        const idCultivo = cultivoBDD._id

        let tratamientoBDD = await Tratamiento.findOne({ cultivoUser: idCultivo })

        if (tratamientoBDD) {
            // Si ya existe un tratamiento para este cultivo, actualizamos sus campos
            tratamientoBDD.nivelhumedad = req.body.nivelhumedad ?? tratamientoBDD.nivelhumedad
            tratamientoBDD.nivelRiego = req.body.nivelRiego ?? tratamientoBDD.nivelRiego
            tratamientoBDD.nivelLuz = req.body.nivelLuz ?? tratamientoBDD.nivelLuz
            await tratamientoBDD.save()
            return res.status(200).json({ msg: "Tratamiento actualizado exitosamente" })
        }

        // Si no existe, creamos el tratamiento y guardamos la relación
        const nuevoTratamiento = new Tratamiento({
            ...req.body,
            cultivoUser: idCultivo
        })

        await nuevoTratamiento.save()

        cultivoBDD.tratamientos.push(nuevoTratamiento._id)
        await cultivoBDD.save()

        res.status(201).json({ msg: "Registro exitoso del tratamiento" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message || error}` })
    }
}

const eliminarTratamiento = async (req, res) => {
    try {
        const { nombreCultivo } = req.body
        if (!req.body || Object.values(req.body).includes("") || !nombreCultivo) {
            return res.status(400).json({ msg: "Debes llenar todos los campos requeridos" })
        }
        const cultivoBDD = await cultivoUser.findOne({ nombreCultivo })
        if (!cultivoBDD) {
            return res.status(404).json({ msg: "Lo sentimos, el cultivo no existe" })
        }

        const idCultivo = cultivoBDD._id

        const tratamiento = await Tratamiento.findOne({ cultivoUser: idCultivo })

        if (!tratamiento) {
            return res.status(404).json({ msg: "Lo sentimos, el tratamiento no existe" })
        }

        tratamiento.nivelhumedad = null
        tratamiento.nivelRiego = null
        tratamiento.nivelLuz = null
        await tratamiento.save()
        res.status(200).json({ msg: "Tratamiento eliminado exitosamente" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `❌ Error en el servidor - ${error.message || error}` })
    }
}


export {
    registrarTratamiento,
    eliminarTratamiento
}