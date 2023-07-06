import {Schema, model} from "mongoose"

const tareaSchema = new Schema({
    tarea: {
        type: String,
        minLength: 2,
        maxLength: 50,
        unique: true,
        required: true
    }
})

const Tarea = model("tarea", tareaSchema)

export default Tarea