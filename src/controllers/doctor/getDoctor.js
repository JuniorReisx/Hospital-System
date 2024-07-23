import { doctors } from "../../database/doctor.database.js"

export const getDoctors = (req, res) => {
	res.status(200).send(doctors)
}