import React from 'react'
import './Table.css'
import { throwException } from '../../utils/throwException'

export const Table = props => {
    const {
        data = [],
        columns = [],
        formatters = {},
        selected = throwException(new Error('no selected array given')),
        handleSelectionChange = throwException(new Error('no toggle selection handler provided')),
        handleShowDetails = throwException(new Error('no show details handler provided')),
        handleDeleteItem = throwException(new Error('no delete item handler provided'))
    } = props

    const tableHeaders = columns.map(column => {
            const key = `${column.name}-header`
            const value = `${column.label[0].toUpperCase()}${column.label.slice(1)}`
            return <th key={key}>{value}</th>
        }
    )

    const isSelected = item => !!selected.find(selectedItem => selectedItem === item)

    const tableBody = data.map(item => {
        const rowCells = Object.keys(item)
            .map(columnName => {
                const format = formatters[columnName] || (v => v)
                const rawData = item[columnName]
                return (
                    <td key={`${item.id}-${columnName}`}>{format(rawData)}</td>
                )
            })
        const selected = isSelected(item)

        const checkboxAction = () => handleSelectionChange(item)

        const showDetails = () => handleShowDetails(item)

        const deleteItem = () => handleDeleteItem(item)

        const detailsButton = <button className="details btn" onClick={showDetails}>Show</button>

        const deleteButton = <button className="delete btn" onClick={deleteItem}>Delete</button>

        const selectionCheckbox = <input type="checkbox" checked={selected} onChange={checkboxAction} />

        return (
            <tr key={item.id}>
                <td key={`${item.id}-checkbox`}>{selectionCheckbox}</td>
                {rowCells}
                <td>
                    {detailsButton}
                    |
                    {deleteButton}
                </td>
            </tr>
        )
    })

    const selectionCount = selected.length

    const selectionHeader = selectionCount < 1
        ? `Selection`
        : `${selectionCount} selected`
    
    const table = (
        <table className="table">
            <thead>
                <tr>
                    <th>{selectionHeader}</th>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    )

    return table
}
