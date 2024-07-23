import express from "express"
import { patientRouter } from "./src/routes/patient.router.js"
import { doctorRouter } from "./src/routes/doctor.router.js"
const server = express()
const door = process.env.PORT || 3030



server.use(express.json())
server.use(express.static('public'))
server.use(patientRouter)
server.use(doctorRouter)

server.listen(door, () => {
	console.log(`Our server is running at the door: http://localhost:${door}`)
});
