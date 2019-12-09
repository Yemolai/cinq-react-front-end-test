import { User } from "./User.class"

const JohnDoe = {id: 1, firstName: 'John', lastName: 'Doe', age: 15, description: 'Stuff stuff stuff'}

describe('User class', () => {
    it('should create User correctly', () => {
        const data = JohnDoe
        const user = new User(data)
        expect(user).toBeDefined
        expect(user.id).toEqual(data.id)
        expect(user.firstName).toEqual(data.firstName)
        expect(user.lastName).toEqual(data.lastName)
        expect(user.age).toEqual(data.age)
        expect(user.description).toEqual(data.description)
    })
    it('should convert age number', () => {
        const data = {...JohnDoe, age: '40'}
        const user = new User(data)
        expect(user.age).toEqual(40)
    })
})