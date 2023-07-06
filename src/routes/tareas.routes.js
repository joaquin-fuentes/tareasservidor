import { Router } from "express";
import {
    borrarTarea,
    crearTarea,
    editarTarea,
    obtenerTarea,
    obtenerTareas
} from "../controllers/tareas.controllers";
import {check} from "express-validator"

const router = Router()


router.route("/tareas")
    .get(obtenerTareas)
    .post([check("tarea")
           .notEmpty()
           .withMessage("La tarea es un dato obligatorio")]
                ,crearTarea)
router.route("/tareas/:id")
    .get(obtenerTarea)
    .delete(borrarTarea)
    .put(editarTarea)

export default router