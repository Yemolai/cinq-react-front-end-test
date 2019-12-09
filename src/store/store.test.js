import { store } from "."
import { USERS_FETCH } from "./users.actions"

describe('redux store test', () => {
    it('should create an store', () => {
        expect(store).toBeDefined()
    })
    it('should register users', async () => {
        const JohnDoe = {id: 1, firstName: 'John', lastName: 'Doe', age: 45, description: 'Lorem Ipsum stuff'}
        const firstState = store.getState()
        expect(firstState.users).toHaveLength(0)
        expect(await store.dispatch({
            type: USERS_FETCH,
            users: [JohnDoe]
        })).toBeTruthy()
        const secondState = store.getState()
        expect(secondState.users).toContain(JohnDoe)
    })
})