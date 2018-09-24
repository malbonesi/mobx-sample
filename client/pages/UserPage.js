import React from 'react'
import {observer, inject} from 'mobx-react'
import Pager from '../components/Pager'
import SortableTableHeader from '../components/SortableTableHeader'

@inject("store") 
@observer 
class UserPage extends React.Component {
    constructor(props){
        super(props)
        
        this.handleHeaderClick = this.handleHeaderClick.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
    }
    
    componentDidMount(){
        this.props.store.fetchData()
    }
    
    handleHeaderClick(header){
        this.props.store.sortResults(header)
    }
    
    handlePageClick(page){
        this.props.store.currentPage = page
    }
    
    render(){
        
        const { 
            currentPage,
            currentResults,
            headers, 
            numPages,
            sortKey, 
            sortAsc,
            users, 
            visibleMin, 
            visibleMax 
            
        } = this.props.store

        if(this.props.store.isFetching){
            return(<div>Loading...</div>)
        }
        
        if(users.length === 0){
            return(<div></div>)
        }
        
        let headerRow = headers.map(header => (
                
                <SortableTableHeader 
                    cellKey={header}
                    onClick={this.handleHeaderClick}
                    sortKey={sortKey}
                    sortAsc={sortAsc}
                    text={header.charAt(0).toUpperCase() + header.slice(1)}
                /> 
            ))
        
        let rows = currentResults.map(user => (
                <tr>
                    <td>{user.first}</td>
                    <td>{user.last}</td>
                    <td><a href={'mailto:' + user.email}>{user.email}</a></td>
                </tr>
            )
        )
        
        return(
            <div className="table-container">
                <table>
                    <thead>
                        <tr>{headerRow}</tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="display-count">
                    Displaying: {visibleMin + 1} - {visibleMax} of {users.length}
                </div>
                <Pager 
                    currentPage={currentPage} 
                    numPages={numPages} 
                    navLead={2} 
                    onClick={this.handlePageClick} 
                />
            </div>
        )
    }
}

export default UserPage

