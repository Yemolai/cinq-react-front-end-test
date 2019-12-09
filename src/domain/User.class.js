import { throwException } from "../utils/throwException";
import { isString } from "../utils/isType";

export class User {
    constructor (data) {
        const { id, firstName, lastName, age, description } = data

        this.id = !isNaN(Number(id)) &&
            Number(id) ||
            throwException('invalid id')

        this.firstName = isString(firstName) &&
            firstName.length >= 3 &&
            firstName ||
            throwException('invalid firstName')

        this.lastName = isString(lastName) &&
            lastName.length >= 3 &&
            lastName ||
            throwException('invalid lastName')
        
        this.age = !isNaN(Number(age)) &&
            Number(age) > 0 &&
            Number(age) ||
            throwException('invalid age')
        
        this.description = isString(description) &&
            description ||
            throwException('invalid description')
    }
}