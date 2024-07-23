import { doctors } from "../../database/doctor.database.js"

export const updateDoctors = (req, res) => {
    const idParameter = req.params.id
    const { name, age, gender, phoneNumber, cpf, specialty } = req.body

    const doctor = doctors.find((doctor) => doctor.id == idParameter)
            
    if (doctor) {
        doctor.name = name
        doctor.age = age
        doctor.gender = gender
        doctor.phoneNumber = phoneNumber
        doctor.cpf = cpf
        doctor.specialty = specialty

        res.status(200).send({
            message: 'Doctor successfully updated'
            })
        }
    else {
        res.status(404).send({
            error: 'Unable to update the doctor'
            })
        }
}