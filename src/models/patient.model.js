let autoId = 1
export class Patient{
	constructor(name, age, gender, phoneNumber, sickness) {
        this.id = autoId++
		this.name = name
		this.age = age
		this.gender = gender
        this.phoneNumber = phoneNumber
        this.sickness = sickness
	}
}
