import { Patient } from "../../models/patient.model.js"
import { patients } from "../../database/patient.database.js"

export const createPatients = (req, res) => {
    const { name, age, gender, phoneNumber, sickness } = req.body

    try {
        if (!name) { throw new Error("Name is required") }

        const newPatient = new Patient(name, age, gender, phoneNumber, sickness)

        patients.push(newPatient)

        res.status(201).send({
            message: `The patient ${newPatient.name} has been successfully inserted!`
        })
    } catch (e) {
        res.status(400).send({
            error: "Unable to create the patient"
        })
    }
};
