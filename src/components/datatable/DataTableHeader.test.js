import React from 'react'
import { render } from'@testing-library/react'
import { DataTableHeader } from './DataTableHeader'

describe('DataTableHeader Component', () => {
    let filter = ''

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
        const { getByText } = render(headerComponent)
        const deleteButtonElement = getByText(/Delete/i)
        const downloadButtonElement = getByText(/Download/i)
        expect(deleteButtonElement).toBeInTheDocument()
        expect(downloadButtonElement).toBeInTheDocument()
    })
})