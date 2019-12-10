import React from 'react'
import { throwException } from '../../utils/throwException'
import { DataTableHeader } from './DataTableHeader'
import { Table } from './Table'
import { CardGrid } from './CardGrid'

const passthrough = v => `${v}`

export class DataTable extends React.Component {
    state = {
        filter: null,
        selected: []
    }

    isSelected = item => {
        return !!this.state.selected.find(selectedItem => selectedItem === item)
    }

    updateFilter = filter => {
        this.setState({ filter })
    }

    showUserDetailsHandler = item => {
        const missingHandler = () => throwException(new Error('no handle show details provided'))
        const { handleShowDetails = missingHandler } = this.props
        handleShowDetails(item)
    }

    deleteItems = items => {
        const { handleDelete = throwException(new Error('no delete handler was provided')) } = this.props
        handleDelete(items)
    }

    toggleSelection = item => {
        const selected = this.isSelected(item)
        if (selected) {
            const selected = this.state.selected.filter(selectedItem => selectedItem !== item)
            this.setState({ selected })
        } else {
            const selected = [...this.state.selected, item]
            this.setState({ selected })
        }
    }

    render () {
        const {
            data,
            columns,
            showCards = false,
            downloadDataHandler
        } = this.props

        const formatters = columns.reduce((map, column) => {
            const { name, format: formatter = passthrough } = column
            return ({...map, [name]: formatter })
        }, {})

        
        return (
            <div>
                <DataTableHeader
                    filterChangeHandler={this.updateFilter}
                    deleteSelectedHandler={() => this.deleteItems(this.selected)}
                    downloadDataHandler={downloadDataHandler}
                />
                {showCards
                    ? <CardGrid
                        data={data}
                        columns={columns}
                        formatters={formatters}
                        selected={this.selected}
                        handleSelectionChange={this.toggleSelection}
                        handleShowDetails={this.showUserDetailsHandler}
                        handleDeleteItem={item => this.deleteItems([item])}
                    />
                    : <Table
                        data={data}
                        columns={columns}
                        formatters={formatters}
                        selected={this.state.selected}
                        handleSelectionChange={this.toggleSelection}
                        handleShowDetails={this.showUserDetailsHandler}
                        handleDeleteItem={item => this.deleteItems([item])}
                    />
                }
            </div>
        )
    }
}