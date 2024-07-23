document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    const doctorsList = document.getElementById('doctors')

    const getAllDoctors = () => {
        fetch('/doctor/all')
            .then(response => response.json())
            .then(doctors => showDoctors(doctors))
            .catch(error => console.error('Error encountered:', error))
    }
    
    const showDoctors = (doctors) => {
        doctorsList.innerHTML = ''
        doctors.forEach(doctor => {
            const li = document.createElement('li')
            li.textContent = `Name: ${doctor.name},
            Age: ${doctor.age}, Gender: ${doctor.gender},
            Phone: ${doctor.phoneNumber}, 
            CPF: ${doctor.cpf}, Specialty: ${doctor.specialty}`
            li.appendChild(buttonDelete(doctor.id))
            li.appendChild(buttonUpdate(doctor))
            doctorsList.appendChild(li)
        })
    }

    const buttonDelete = (id) => {
        const button = document.createElement('button')
        button.textContent = 'Delete'
        button.className = 'button-delete'
        button.addEventListener('click', () => {
            fetch(`/doctor/delete/${id}`, { method: 'DELETE' })
                .then(() => { getAllDoctors() })
                .catch(error => { console.error('Error doctor:', error)})
        })
        return button
    }

    let doctorId = null

    const buttonUpdate = (doctor) => {
        const button = document.createElement('button')
        button.textContent = 'Update'
        button.className = 'button-update'
        button.addEventListener('click', () => {
            doctorId = doctor.id;
            document.getElementById('name').value = doctor.name
            document.getElementById('age').value = doctor.age
            document.getElementById('gender').value = doctor.gender
            document.getElementById('phoneNumber').value = doctor.phoneNumber
            document.getElementById('cpf').value = doctor.cpf
            document.getElementById('specialty').value = doctor.specialty
        })
        return button
    }

    form.addEventListener('submit', (stop) => {
        stop.preventDefault()

        const name = document.getElementById('name').value
        const age = document.getElementById('age').value
        const gender = document.getElementById('gender').value
        const phoneNumber = document.getElementById('phoneNumber').value
        const cpf = document.getElementById('cpf').value
        const specialty = document.getElementById('specialty').value

        if (doctorId) {
            fetch(`/doctor/update/${doctorId}`, 
                { method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, age, gender, phoneNumber, cpf, specialty })})
                .then(response => {
                    if (response.status === 404) {
                        return fetch('/doctor', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({ name, age, gender, phoneNumber, cpf, specialty })
                        })
                    }
                    return response
                })
                .then(() => {
                    form.reset()
                    doctorId = null
                    getAllDoctors()
                })
                .catch(error => { console.error('Error doctor:', error) })
        } else {
            fetch('/doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ name, age, gender, phoneNumber, cpf, specialty })
            })
            .then(() => {
                form.reset()
                getAllDoctors()
            })
            .catch(error => { console.error('Error doctor:', error) })
        }
    })

    getAllDoctors()
})
