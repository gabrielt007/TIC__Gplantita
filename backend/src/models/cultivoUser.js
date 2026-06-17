import mongoose, {Schema, model} from "mongoose";
import bcrypt from "bcrypt";        

const cultivoSchema = new Schema({
    nombrePropietario: {
        type: String,
        required: false,
        trim: true
    },
    passwordPropietario: {
        type: String,
        required: false,
        trim: true
    },
    nombreCultivo: {
        type: String,
        required: false,
        trim: true,
    },
    tipoPlanta: {
        type: String,
        required: false,
        trim: true

    },
    cantidad: {
        type: String,
        default: 1,
        required: false
    },
    nivelhumedad: {
        type: String,
        required: false,
        trim: true
    },
    nivelRiego: {
        type: String,
        required: false,
        trim: true
    },
    nivelLuz: {
        type: String,
        required: false,
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
        required: false
    },
    fechaIngresoCultivo: {
        type: Date,
        default: Date.now,
        required: false
    },
    estadoCultivo: {
        type: Boolean,
        default: false,
        required: false
    },
    tiempoCosecha: {
        type: String,
        required: false,
        trim: true
    },  
    estadoMadurezCultivo: {
        type: String,
        required: false,
        trim: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "userApp",
        required: false
    },
    emailPropietario: {
        type: String,
        required: false,
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


