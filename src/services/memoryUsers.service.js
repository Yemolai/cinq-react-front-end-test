import { User } from '../domain/User.class'
import { inMemory } from '../utils/inMemory'
import { isString } from '../utils/isType'
import rawUsersJson from '../users.json'

const UserValidator = (newUser, list) => {
    const idList = list.map(({ id }) => Number(id))
    const biggerId = Math.max(0, ...idList)
    const id = biggerId + 1
    const data = { id, ...newUser }
    return new User(data)
}

const initialData = isString(rawUsersJson) ? JSON.parse(rawUsersJson) : rawUsersJson

export const UsersService = inMemory(UserValidator, 'id', initialData)