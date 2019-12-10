import React from 'react'
import { throwException } from '../../utils/throwException'
import './CardGrid.css'

export const CardGrid = (props) => {
    const {
        data = [],
        columns = [],
        formatters = {},
        selected = [],
        handleSelectionChange = throwException(new Error('no toggle selection handler provided')),
        handleShowDetails = throwException(new Error('no show details handler provided')),
        handleDeleteItem = throwException(new Error('no delete item handler provided'))
    } = props

    const isSelected = item => !!selected.find(selectedItem => selectedItem === item)

    const cards = data.map(item => {
        const contents = Object.keys(item)
            .map(columnName => {
                const column = columns.find(col => col.name === columnName)
                if (column.hideOnCards) {
                    return false
                }
                const label = column.label || columnName
                const format = formatters[columnName] || (v => v)
                const rawData = item[columnName]
                const value = format(rawData)
                const cssClassName = columnName.split(' ').join('-').toLocaleLowerCase()
                const key = `${cssClassName}-${item.id}`
                return (
                    <p className={cssClassName} key={key}>
                        {!column.hideLabel && `${label}:`}
                        {value}
                    </p>
                )
            })
        
        const selected = isSelected(item)

        const checkboxAction = () => handleSelectionChange(item)

        const showDetails = () => handleShowDetails(item)

        const deleteItem = () => handleDeleteItem(item)

        const detailsButton = <button className="details btn" onClick={showDetails}>Show</button>

        const deleteButton = <button className="delete btn" onClick={deleteItem}>Delete</button>

        const selectionCheckbox = <input type="checkbox" checked={selected} onChange={checkboxAction} />

        const actions = (
            <div className="actions">
                {selectionCheckbox} |
                {detailsButton} |
                {deleteButton}
            </div>
        )
        const randomId = Math.random().toString(36).slice(2)
        return (
            <div className="card" key={`card-${item.id}-${randomId}`}>
                {contents}
                {actions}
            </div>
        )
    })

    const grid = (
        <div className="card-grid">
            {cards}
        </div>
    )

    return grid
}