import { patients } from "../../database/patient.database.js"

export const updatePatients = (req, res) => {
    const idParameter = Number(req.params.id)
    const { name, age, gender, phoneNumber, sickness } = req.body

    const patient = patients.find((patient) => patient.id == idParameter)

    if (patient) {
        patient.name = name
        patient.age = age
        patient.gender = gender
        patient.phoneNumber = phoneNumber
        patient.sickness = sickness

        res.status(200).send({
            message: "Patient successfully updated"
        })
    } else {
        res.status(404).send({
            error: 'Unable to update the patient'
        })
    }
}
