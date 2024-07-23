import { Doctor } from "../../models/doctor.model.js"
import { doctors } from "../../database/doctor.database.js"

export const createDoctors = (req, res) => {
    const { name, age, gender, phoneNumber, cpf, specialty } = req.body

    try {
        if (!name) { throw new Error("Name is required") }

        const newDoctor = new Doctor(name, age, gender, phoneNumber, cpf, specialty)

        doctors.push(newDoctor)

        res.status(201).send({
            message: `The doctor ${newDoctor.name} has been successfully inserted!`
        })
    } catch (e) {
        res.status(400).send({
            error: "Unable to create the doctor"
        })
    }
}