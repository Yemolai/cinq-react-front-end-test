import React from 'react'
import { render, getByPlaceholderText } from'@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import { DataTableHeader } from './DataTableHeader'
import { Simulate } from 'react-dom/test-utils'

let container = null

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

describe('DataTableHeader Component', () => {
    const onFilterChangeHandler = q => {
        filter = q
    }

    const onDeleteSelectedHandler = () => alert('delete all selected stuff please')

    const onDownloadDataHandler = () => alert('Downloading...')

    it('should render', () => {
        const headerComponent = (
            <DataTableHeader
                filterChangeHandler={onFilterChangeHandler}
                deleteSelectedHandler={onDeleteSelectedHandler}
                downloadDataHandler={onDownloadDataHandler}
            />
        )
        const { getByText, getByPlaceholderText } = render(headerComponent, container)
        const deleteButtonElement = getByText(/Delete/i)
        const downloadButtonElement = getByText(/Download/i)
        const filterField = getByPlaceholderText(/Filter/i)
        expect(deleteButtonElement).toBeInTheDocument()
        expect(downloadButtonElement).toBeInTheDocument()
        expect(filterField).toBeInTheDocument()
    })

    it('should call attached callbacks', () => {
        const deleteHandler = jest.fn()
        const downloadHandler = jest.fn()
        const filterHandler = jest.fn()
        const container = document.createElement("div")
        document.body.appendChild(container)
        const headerComponent = (
            <DataTableHeader
                filterChangeHandler={filterHandler}
                deleteSelectedHandler={deleteHandler}
                downloadDataHandler={downloadHandler}
            />
        )
        const { getByText, getByPlaceholderText } = render(headerComponent, container)
        
        const deleteButton = getByText(/Delete/i)
        const downloadButton = getByText(/Download/i)
        const filterField = getByPlaceholderText(/Filter/i)

        Simulate.click(deleteButton)
        expect(deleteHandler).toHaveBeenCalled()

        Simulate.click(downloadButton)
        expect(downloadHandler).toHaveBeenCalled()

        filterField.value = 'banana'
        Simulate.change(filterField)
        expect(filterHandler).toHaveBeenCalled()
    })
})