import { Router } from "express"
import { createPatients } from "../controllers/patient/createPatients.js"
import { deletePatients } from "../controllers/patient/deletePatients.js"
import { getPatients } from "../controllers/patient/getPatients.js"
import { updatePatients } from "../controllers/patient/updatePatients.js"
const patientRouter = Router()

patientRouter.get("/patient/all", getPatients)
patientRouter.post("/patient", createPatients)
patientRouter.delete("/patient/delete/:id", deletePatients)
patientRouter.put("/patient/update/:id", updatePatients)

export { patientRouter }
