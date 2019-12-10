import React, { useState } from 'react'
import { DataTable } from '../components/DataTable/DataTable'

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

export function Table () {
    const [data, updateData] = useState([
        {id: 1, name: 'John Smith'},
        {id: 2, name: 'Jane Smith'},
        {id: 3, name: 'Jorja Smith'},
        {id: 4, name: 'Lord Smith'}
    ])
    const deleteItemsHandler = items => {
        const newData = data.filter(item => items.indexOf(item) < 0)
        updateData(newData)
    }
    const showDetailsHandler = item => alert(`item #${item.id}: ${item.name}`)
    const downloadDataHandler = item => alert(`downloadind item #${item.id}`)
    return <DataTable
        data={data}
        columns={columns}
        downloadDataHandler={downloadDataHandler}
        handleDelete={deleteItemsHandler}
        handleShowDetails={showDetailsHandler}
    />
}

export function CardGrid() {
    const [data, updateData] = useState([
        {id: 1, name: 'John Smith'},
        {id: 2, name: 'Jane Smith'},
        {id: 3, name: 'Jorja Smith'},
        {id: 4, name: 'Lord Smith'}
    ])
    const deleteItemsHandler = items => {
        const newData = data.filter(item => items.indexOf(item) < 0)
        updateData(newData)
    }
    const showDetailsHandler = item => alert(`item #${item.id}: ${item.name}`)
    const downloadDataHandler = item => alert(`downloadind item #${item.id}`)
    return (
        <DataTable
            showCards
            data={data}
            columns={columns}
            downloadDataHandler={downloadDataHandler}
            handleDelete={deleteItemsHandler}
            handleShowDetails={showDetailsHandler}
        />
    )
}
