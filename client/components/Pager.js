import React from 'react'

const Pager = props => {
    
    const { 
        currentPage, 
        navLead, 
        numPages, 
        onClick 
        
    } = props
        
    let pageNav = []
    
    for(let pageNum = currentPage - navLead; pageNum <= currentPage + navLead; pageNum++){
        
        if(pageNum > 0 && pageNum <= numPages){
            
            let pageClass = "page-link" 
            
            pageClass += pageNum === currentPage ? ' selected' : ''
            
            pageNav.push(
                <span className={pageClass} onClick={ e => { onClick(pageNum) }}>
                    {pageNum}
                </span>
            )
        }
    }
        
    if(currentPage !== 1){
        pageNav.unshift(<span className="page-link" onClick={e => { onClick(currentPage - 1) }}>&#8249;</span>)
        pageNav.unshift(<span className="page-link" onClick={e => { onClick(1) }}>&#171;</span>)
        
    }
    
    if(currentPage !== numPages){
        pageNav.push(<span className="page-link" onClick={e => { onClick(currentPage + 1) }}>&#8250;</span>)
        pageNav.push(<span className="page-link" onClick={e => { onClick(numPages) }}>&#187;</span>)
    }

    return ( 
        <div className="pager">{pageNav}</div> 
    )
    
}

export default Pager