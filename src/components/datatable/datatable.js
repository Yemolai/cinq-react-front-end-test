import React from 'react'

const passthrough = v => `${v}`

export class DataTable extends React.Component {
    state = {
        selected: []
    }

    isSelected (item) {
        return !!this.state.selected.find(selectedItem => selectedItem === item)
    }

    toggleSelection (item) {
        if (this.isSelected(item)) {
            const selected = this.state.selected.filter(selectedItem => selectedItem !== item)
            this.setState({ selected })
        } else {
            const selected = [...this.state.selected, item]
            this.setState({ selected })
        }
    }

    render () {
        const { data, columns } = this.props

        const formatters = columns.reduce((map, column) => {
            const { name, format: formatter = passthrough } = column
            return ({...map, [name]: formatter })
        }, {})

        const tableHeaders = columns.map(column => (<th>{`${column.label}`.toUpperCase()}</th>))

        const tableBody = data.map(item => {
            const row = Object.keys(item)
                .map(columnName => {
                    const format = formatters[columnName]
                    const rawData = item[columnName]
                    return (<td>{format(rawData)}</td>)
                })
            const isSelected = this.isSelected(item)
            const checkboxAction = () => this.toggleSelection(item)
            const selectionCheckbox = <input type="checkbox" checked={isSelected} onClick={checkboxAction} />
            return (
                <tr>
                    {selectionCheckbox}
                    {row}
                </tr>
            )
        })
        const selectionCount = this.state.selected.length
        const selectionHeader = selectionCount < 1
            ? `Selection`
            : `${selectionCount} selected`
        const table = (
            <table>
                <thead>
                    <th>{selectionHeader}</th>
                    {tableHeaders}
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        )
        return table
    }
}