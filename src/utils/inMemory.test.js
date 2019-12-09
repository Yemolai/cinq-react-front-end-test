import { inMemory } from "./inMemory"

describe('testing inMemory service', () => {
    it('should create a new in memory database-like structure instance', async () => {
        const validator = v => v
        const instance = inMemory(validator)
        expect(instance).toBeTruthy()
    })
    it('should register and fetch data', async () => {
        const validator = v => v
        const item = {id: 1, name: 'Gabriel'}
        const instance = inMemory(validator, 'id', [item])
        expect(await instance.getAll()).toContain(item)
    })
    it('should create new items and fetch them', async () => {
        const validator = v => v
        const item = {id: 1, name: 'John Doe'}
        const instance = inMemory(validator)
        expect(await instance.getAll()).toHaveLength(0)
        expect(await instance.create(item)).toBeTruthy()
        expect(await instance.get(item.id)).toBeTruthy()
        expect((await instance.get(item.id)).name).toEqual(item.name)
    })
    it('should delete items', async () => {
        const validator = v => v
        const items = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Doe'}]
        const instance = inMemory(validator, 'id', items)
        expect(await instance.getAll()).toHaveLength(items.length)
        expect(await instance.remove(1)).not.toBeFalsy()
        const list = await instance.getAll()
        expect(list).toContain(items[1])
        expect(list).not.toContain(items[0])
    })
    it('should update items', async () => {
        const validator = v => v
        const items = [{id: 1, name: 'John Doe'}]
        const instance = inMemory(validator, 'id', items)
        expect(await instance.update(1, {id: 1, name: 'Jane Doe'})).not.toBeFalsy()
        expect(await instance.get(1)).toHaveProperty('name', 'Jane Doe')
    })
    it('should return undefined when asked for unavailable record', async () => {
        const validator = v => v
        const items = [{id: 1, name: 'Jane Doe'}]
        const instance = inMemory(validator, 'id', items)
        expect(await instance.get(1)).toEqual(items[0])
        expect(await instance.get(2)).toBeUndefined()
    })
})