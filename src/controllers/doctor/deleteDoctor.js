import { doctors } from "../../database/doctor.database.js"

export const deleteDoctors = (req, res) => {
    const idParameter = Number(req.params.id)

    const doctorDelete = doctors.findIndex((doctor) => doctor.id == idParameter)

    if (doctorDelete != -1) {
        doctors.splice(doctorDelete, 1)
        res.status(200).send({
            message: "Doctor successfully deleted"
        })
    } else {
        res.status(404).send({
            error: "Doctor not found"
        })
    }
}

