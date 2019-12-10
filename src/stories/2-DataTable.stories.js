import React from 'react'
import { DataTable } from '../components/DataTable/DataTable'
import { CardGrid } from '../components/DataTable/CardGrid'

export default {
    title: 'DataTable'
}

const columns = [
    {
        name: 'id',
        label: 'ID',
        hideOnCards: true,
        format: v => `#${Number(v).toString().padStart(3, 0)}`
    },
    {
        name: 'name',
        label: 'Name',
        hideLabel: true,
        format: v => `${v}`.toLocaleUpperCase()
    }
]
let data = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Doe'}]

const downloadDataHandler = () => alert('mocking download data')
const showItemDetailsHandler = item => alert(`Item ${item.id}: ${item.name}`)
const deleteItemsHandler = items => {
    data = data.filter(item => {
        const exists = items.indexOf(item) > -1
        return !exists
    })
}

export const table = () => (
    <DataTable
        data={data}
        columns={columns}
        downloadDataHandler={downloadDataHandler}
        handleDelete={deleteItemsHandler}
        handleShowDetails={showItemDetailsHandler}
    />
)

export const cardGrid = () => (
    <DataTable
        showCards
        data={data}
        columns={columns}
        downloadDataHandler={downloadDataHandler}
        handleDelete={deleteItemsHandler}
        handleShowDetails={showItemDetailsHandler}
    />
)