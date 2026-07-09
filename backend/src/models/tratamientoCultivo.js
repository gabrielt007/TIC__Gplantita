import mongoose, {Schema,model} from 'mongoose'

const tratamientoSchema = new Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },
    detalle:{
        type:String,
        required:true,
        trim:true
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
    cultivoUser:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cultivoUser'
    }]
    
},{
    timestamps:true
})

export default model('Tratamiento',tratamientoSchema)