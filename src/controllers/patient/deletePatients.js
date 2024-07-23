import { patients } from "../../database/patient.database.js"

export const deletePatients = (req, res) => {
    const idParameter = Number(req.params.id)

    const patientDelete = patients.findIndex((patient) => patient.id == idParameter)

    if (patientDelete != -1) {
        patients.splice(patientDelete, 1)
        res.status(200).send({
            message: "Patient successfully deleted"
        })
    } else {
        res.status(404).send({
            error: "Patient not found"
        })
    }
}
