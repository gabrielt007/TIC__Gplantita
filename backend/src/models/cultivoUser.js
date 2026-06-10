import mongoose, {Schema, model} from "mongoose";
import bcrypt from "bcrypt";        

const cultivoSchema = new Schema({
    nombrePropietario: {
        type: String,
        required: true,
        trim: true
    },
    passwordPropietario: {
        type: String,
        required: true,
        trim: true
    },
    nombreCultivo: {
        type: String,
        required: true,
        trim: true,
        required: true
    },
    tipoPlanta: {
        type: String,
        required: true,
        trim: true,
        required: true
    },
    cantidad: {
        type: String,
        default: 1,
        required: true
    },
    nivelhumedad: {
        type: String,
        required: true,
        trim: true
    },
    nivelRiego: {
        type: String,
        required: true,
        trim: true
    },
    nivelLuz: {
        type: String,
        required: true,
        trim: true
    },
    avatarCultivo: {
        type: String,
        trim: true
    },
    avatarCultivoID: {
        type: String,
        trim: true
    },
    avatarCultivoIA: {
        type: String,
        trim: true
    },
    detalleCultivo: {
        type: String,
        trim: true,
        required: true
    },
    fechaIngresoCultivo: {
        type: Date,
        default: Date.now,
        required: true
    },
    estadoCultivo: {
        type: String,
        default: "activo",
        required: true
    },
    tiempoCosecha: {
        type: String,
        required: true,
        trim: true
    },  
    estadoMadurezCultivo: {
        type: String,
        required: true,
        trim: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "userApp",
        required: true
    },
    emailPropietario: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
})
cultivoSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

cultivoSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export default model("cultivoUser", cultivoSchema)


