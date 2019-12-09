import { throwException } from "./throwException"

describe('throwException', () => {
    it('should throw an exception', () => {
        try {
            throwException(new Error('fail'))
        }
        catch (err) {
            expect(err.message).toBeDefined()
            expect(err.message).toEqual('fail')
        }
    })
})