import { isType } from "./isType"

describe('isType validator', () => {
    it('should be a function that returns a validator function', () => {
        expect(typeof isType).toEqual('function')
        expect(typeof isType('string')).toEqual('function')
    })
    it('should generate a validator', () => {
        const isNumber = isType('number')
        expect(typeof isNumber).toEqual('function')
        expect(isNumber(29347)).toBeTruthy()
        expect(isNumber(() => '')).toBeFalsy()
        expect(isNumber(-15)).toBe(true)
        expect(isNumber('aa')).toBe(false)
    })
})