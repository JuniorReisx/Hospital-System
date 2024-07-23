import { patients } from "../../database/patient.database.js"

export const getPatients = (req, res) => {
	res.status(200).send(patients)
}