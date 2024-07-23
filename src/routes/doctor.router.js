import { Router } from "express";
import { createDoctors } from "../controllers/doctor/createDoctor.js"
import { deleteDoctors } from "../controllers/doctor/deleteDoctor.js"
import { getDoctors } from "../controllers/doctor/getDoctor.js"
import { updateDoctors } from "../controllers/doctor/updateDoctor.js"
const doctorRouter = Router()

doctorRouter.get("/doctor/all", getDoctors)
doctorRouter.post("/doctor", createDoctors)
doctorRouter.delete("/doctor/delete/:id", deleteDoctors)
doctorRouter.put("/doctor/update/:id", updateDoctors)

export { doctorRouter }
