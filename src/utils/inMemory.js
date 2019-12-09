const paginate = arr => (limit, from = 0) => arr.slice(+from, +from + limit)

export const inMemory = (validator, key = 'id', initialData = []) => {
    let data = [...initialData]

    const count = async () => data.length

    const getAll = async (limit = 10, from = 0) => paginate(data)(limit, from)
    
    const get = async id => data.find(item => item[key] === id)
    
    const find = async (q, limit = 10, from = 0) => paginate(
        data.filter(item => {
            const matcher = new RegExp(q, 'gm').compile()

            const values = Object.keys(item).map(key => `${item[key]}`)
            
            const match = values.find(val => matcher.test(val))
            
            return match
        })
    )(limit, from)

    const create = async newItem => {
        data = [...data, validator(newItem, data)]
        return newItem
    }

    const remove = async id => {
        data = data.filter(item => item[key] !== id)
        return id
    }

    const update = async (id, newItem) => {
        const item = await get(id)

        if (!item || !validator(newItem, data)) {
            return undefined
        }

        const position = data.indexOf(item)

        if (position < 0) {
            console.error('Found item but could not find its position')
            return undefined
        }

        data[position] = newItem
        return newItem
    }

    return {
        getAll,
        get,
        count,
        find,
        create,
        update,
        remove
    }
}