import React from 'react'

const SortableTableHeader = props => {
    
    const {
        cellKey,
        onClick,
        sortKey,
        sortAsc,
        text
    
    } = props
    
    return(
        <th onClick={ e => { onClick(cellKey) }}>
            {text}
            <span className="sort-symbol">
                {(sortKey !== cellKey) && '◀▶'}
                {(sortKey === cellKey && sortAsc) && '◀'}
                {(sortKey === cellKey && !sortAsc) && '▶'}
            </span>
        </th>
    )
}

export default SortableTableHeader