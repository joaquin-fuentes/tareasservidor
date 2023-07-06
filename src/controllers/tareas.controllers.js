import { validationResult } from "express-validator"
import Tarea from "../models/tarea"

//Controlador para obtener tareas

export const obtenerTareas = async (req, res)=>{
    try {
        const tareas = await Tarea.find()
        res.status(200).json(tareas)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "Error al buscar las tareas de la base de datos"
        })
    }
}
//Controlador para obtener una sola tarea

export const obtenerTarea = async (req, res)=>{
    try {
        const {id} = req.params
        const tarea = await Tarea.findById(id)
        res.status(200).json(tarea)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "Error al buscar la tarea de la base de datos"
        })
    }
}

// Controlador para crear una tarea

export const crearTarea = async (req, res)=>{
    try {
         //trabajar con el resultado de la validacion de express-validator
         const errors = validationResult(req)
         // errors.isEmpty() // true: esta vacio, false: hay error
         if(!errors.isEmpty()){
             return res.status(400).json({errores: errors.array()})
         }
        const tareaNueva = new Tarea(req.body)
        await tareaNueva.save()
        res.status(201).json({
            mensaje: "La tarea fue creada correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "Error al crear la tarea"
        })
    }
}

// controlador para eliminar una tarea

export const borrarTarea = async (req, res)=>{
    try {
        //obtener el id y luego solicitar a moongoose el borrar   
        const {id} = req.params   
        await Tarea.findByIdAndDelete(id)
        res.status(200).json({
            mensaje: "La tarea fue eliminada"
        })
    } 
    catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "Error al eliminar la tarea"
        })
    }
}

// controlador para editar una tarea

export const editarTarea = async (req, res)=>{
    try {
        //obtener el id y luego solicitar a moongoose el editar   
        const {id} = req.params   
        await Tarea.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            mensaje: "La tarea fue actualizada correctamente"
        })
    } 
    catch (error) {
        console.log(error)
        res.status(404).json({
            mensaje: "Error al editar la tarea"
        })
    }
}