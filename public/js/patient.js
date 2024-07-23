document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    const patientsList = document.getElementById('patients')


    const getAllPatients = () => {
        fetch('/patient/all')
            .then(response => response.json())
            .then(patients => showPatients(patients))
            .catch(error => console.error('Error encountered:', error))
    }
    
    const showPatients = (patients) => {
        patientsList.innerHTML = ''
        patients.forEach(patient => {
            const li = document.createElement('li')
            li.textContent = `Name: ${patient.name},
            Age: ${patient.age}, Gender: ${patient.gender},
            Phone: ${patient.phoneNumber},
            Sickness: ${patient.sickness}`
            li.appendChild(buttonDelete(patient.id))
            li.appendChild(buttonUpdate(patient))
            patientsList.appendChild(li)
        })
    }

    const buttonDelete = (id) => {
        const button = document.createElement('button')
        button.textContent = 'Delete'
        button.className = 'button-delete'
        button.addEventListener('click', () => {
            fetch(`/patient/delete/${id}`, { method: 'DELETE' })
                .then(() => { getAllPatients() })
                .catch(error => { console.error('Error patient: ', error)})
        })
        return button
    }
    let patientId = null
    
    const buttonUpdate = (patient) => {
        const button = document.createElement('button')
        button.textContent = 'Update'
        button.className = 'button-update'
        button.addEventListener('click', () => {
            patientId = patient.id
            document.getElementById('name').value = patient.name
            document.getElementById('age').value = patient.age
            document.getElementById('gender').value = patient.gender
            document.getElementById('phoneNumber').value = patient.phoneNumber
            document.getElementById('sickness').value = patient.sickness
        })
        return button
    }

    form.addEventListener('submit', (stop) => {
        stop.preventDefault()

        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const gender = document.getElementById('gender').value
        const phoneNumber = document.getElementById('phoneNumber').value
        const sickness = document.getElementById('sickness').value

        if (patientId) {
            fetch(`/patient/update/${patientId}`,
                { method: 'PUT', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, age, gender, phoneNumber, sickness })})
                .then(response => {
                    if (response.status === 404) {
                        return fetch('/patient',
                            { method: 'POST',
                              headers: { 'Content-Type': 'application/json'},
                              body: JSON.stringify({ name, age, gender, phoneNumber, sickness })
                        })
                    }
                    return response
                })
                .then(() => {
                    form.reset()
                    patientId = null
                    getAllPatients()
                })
                .catch(error => { console.error('Error patient: ', error) })
        } else {
            fetch('/patient',
                { method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify({ name, age, gender, phoneNumber, sickness })})
                .then(() => {
                    form.reset()
                    getAllPatients()
                })
                .catch(error => { console.error('Error patient: ', error) })
        }
    })

    getAllPatients()
})
