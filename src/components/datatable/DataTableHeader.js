import React from 'react'
import { throwException } from '../../utils/throwException'
import './DataTableHeader.css'

export const DataTableHeader = props => {
    const {
        filterChangeHandler = throwException(new Error('no filter change handler provided')),
        deleteSelectedHandler = throwException(new Error('no delete selected handler provided')),
        downloadDataHandler
    } = props
    const downloadAction = (
        <div className="download wrapper column">
            <button onClick={downloadDataHandler}>
                Download
            </button>
        </div>
    )
    return (
        <div className="datatable-header">
            <div className="filter wrapper column">
                <input
                    type="text"
                    placeholder="Filter by..."
                    onChange={filterChangeHandler}
                />
            </div>
            <div className="delete wrapper column">
                <button onClick={deleteSelectedHandler}>
                    Delete selected
                </button>
            </div>
            {downloadDataHandler && downloadAction}
        </div>
    )
}
