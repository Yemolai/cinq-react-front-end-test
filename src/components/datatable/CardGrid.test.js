import React from 'react'
import { render } from '@testing-library/react'
import { CardGrid } from './CardGrid'

describe('CardGrid Component', () => {
    it('should render', () => {
        const cols = [
            {
                name: 'id',
                label: 'ID'
            },
            {
                name: 'name',
                label: 'Name'
            }
        ]
        let data = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Doe'}]
        let selected = []
        const onSelectionHandler = selectedItem => {
            if (selected.indexOf(selectedItem) > 0) {
                selected = selected.filter(item => item !== selectedItem)
            } else {
                selected = [...selected, selectedItem]
            }
        }
        const showDetailsHandler = item => alert(`${JSON.stringify(item, v => v, 2)}`)
        const deleteItemsHandler = item => {
            data = data.filter(dataItem => dataItem.id !== item.id)
        }
        const tableComponent = (<CardGrid
            data={data}
            columns={cols}
            selected={selected}
            handleSelectionChange={onSelectionHandler}
            handleShowDetails={showDetailsHandler}
            handleDeleteItem={deleteItemsHandler}
        />)
        const { getByText } = render(tableComponent)
        const cellElement = getByText(/John Doe/i)
        expect(cellElement).toBeInTheDocument()
    })
})