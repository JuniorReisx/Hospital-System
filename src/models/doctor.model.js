let idAuto = 1
export class Doctor{
	#cpf
	constructor(name, age, gender, phoneNumber, cpf,  specialty) {
		this.id = idAuto++
		this.name = name
		this.age = age
		this.gender = gender
        this.phoneNumber = phoneNumber
        this.#cpf = cpf //CPF goes from undefined on purpose, because I put Private
        this.specialty = specialty
	}
}
